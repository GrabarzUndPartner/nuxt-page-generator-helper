
import path from 'upath'
import { cacheRoutes, createStaticComponents, logInfo, logWarn, MODULE_NAME, cleanCacheDir } from './utils'
import { generateRouteTemplates } from './utils/template'
import { isDevMode, isNuxtBuild, isNuxtGenerate, isNuxtTest, addPlugins, getNuxtI18nModule, extendBuild, extendRoutes } from './utils/module'

const DEFAULT_TEMPLATE = path.normalize(path.join(__dirname, '/tmpl/Page.vue'))

function getDefaultOptions (options, isDev) {
  return Object.assign({ isDev }, {
    /**
     * Debug-Mode
     */
    debug: false,
    /**
     * If set, modul is also active in development mode.
     */
    dev: false,
    /**
     * Function for querying the page structure with Content.
     * @type Function
     */
    adapter: null,
    adapterOptions: {},
    /**
     * Path for the page extend
     * @type String
     */
    pageExtend: null,
    /**
     * prefix for component imports in generated pages.
     * Example: Component "Text" -> Component "virtualText"
     * @type String
     */
    componentPrefix: 'virtual',
    /**
     * If active, the adapter result is stored locally.
     * @type Boolean
     */
    routesCache: true,
    /**
     * list of route names, to be ignore by routes extend.
     * Example: ['index', 'page', 'nested-page']
     * @type Array
     **/
    ignoreRoutes: [],
    /**
     * If set, all already registered routes will be removed from the list.
     */
    cleanRoutes: false,
    /**
     * Configuration for nuxt-i18n
     */
    nuxtI18n: {}
  }, options)
}

module.exports = function (moduleOptions) {
  const options = getDefaultOptions({
    name: MODULE_NAME,
    ...moduleOptions,
    ...this.options[MODULE_NAME]
  }, this.nuxt.options.dev)

  if (!options.adapter || !options.adapter.getRoutes) {
    throw new Error('no adapter defined!')
  }

  let setup = Promise.resolve()

  /**
   * add context plugin
   */

  const plugins = [
    { name: 'options' },
    { name: 'layout', mode: 'server' },
    { name: 'content' }
  ]

  addPlugins(this, options, plugins)

  if (
    !isDevMode(options) &&
    (isNuxtBuild(this.nuxt) || isNuxtGenerate(this.nuxt) || isNuxtTest(this.nuxt))
  ) {
    setup = moduleSetup(this, options)
  } else {
    logWarn('enabled only for build or generate, ignored by development mode')
  }

  return setup.then((routes) => {
    // IMPORTANT: hinzufügen von nuxt-i18n module muss nach registrieren des hook "extendRoutes" geschehen.
    this.addModule(getNuxtI18nModule(options))
    logInfo('add module "nuxt-18n" to nuxt')
    return routes
  })
}

/**
 * @param Object options
 * @param ModuleContainer moduleScope
 */
function moduleSetup (moduleScope, options) {
  options.pageExtend = options.pageExtend || DEFAULT_TEMPLATE

  registerHooks(moduleScope.nuxt)

  return cacheRoutes(moduleScope, options)
    .then((routes) => {
      // register extends build (webpack) & routes (nuxt)
      moduleScope.extendBuild(extendBuild(options, routes, moduleScope))
      moduleScope.extendRoutes(extendRoutes(options, routes))
      return routes
    })
    .then(routes => generateRouteTemplates(options, routes))
    .then((routes) => {
      options.nuxtI18n.parsePages = true
      return createStaticComponents(moduleScope, options, routes)
    })
}

function registerHooks (nuxt, options) {
  if (!nuxt.options.dev) {
    nuxt.hook('generate:done', () => cleanCacheDir(nuxt))
  }
}
