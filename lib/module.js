
import path from 'upath'
import { cacheRoutes, createStaticComponents, logInfo, logWarn, MODULE_NAME, cleanCacheDir, cacheLayout } from './utils'
import { generateRouteTemplates } from './utils/template'
import { isDynamicMode, isNuxtBuild, isNuxtGenerate, isNuxtTest, addPlugins, getNuxtI18nModule, getSitemapModule, extendBuild, extendRoutes, resolveAdapter } from './utils/module'

const DEFAULT_PAGE_TEMPLATE = path.normalize(path.resolve(__dirname, 'Page.tmpl.vue'))
const DEFAULT_PAGE_EXTEND = path.normalize(path.resolve(__dirname, 'PageExtend.vue'))

function getDefaultOptions (options, isDev) {
  return Object.assign({ isDev }, {
    /**
     * Debug-Mode
     */
    debug: false,
    /**
     * If set, the content is reloaded dynamically, no pages are generated.
     */
    dynamicContent: isDev,
    /**
     * File path or import with functions for querying the page structure with content.
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
     * Component src Path. Is required for embedding specified components in a page.
     */
    componentPath: '@/components',
    /**
     * prefix for component imports in generated pages.
     * Example: Component "Text" -> Component "prefixText"
     * @type String
     */
    componentPrefix: 'prefix',
    /**
     * When set, components of a page are loaded asynchronously.
     */
    asyncComponentLoad: true,
    /**
     * Components that can be reloaded can be controlled with LazyHydration.
     * Example:
     * With the setting 'maxEagerComponents=1'
     * the first component is initialized at 'whenIdle'. All others at whenVisible.
     *
     * [vue-lazy-hydration](https://github.com/maoberlehner/vue-lazy-hydration)
     */
    lazyHydrateEnable: true,
    /**
     * Specifies when the whenVisible event is triggered.
     * Example:
     * Component initialization occurs,
     * Component is less than 80px away from the visible area.
     */
    lazyHydrateRootMargin: '80px',
    /**
     * Specifies the number of components that are initialized by LazyHydrate `whenIdle`.
     * Important: Only active if `asyncComponentLoad` is set.
     */
    lazyHydrateMaxIdle: 1,
    /**
     * If active, the adapter result is stored local.
     * @type Boolean
     */
    layoutCache: false,
    /**
     * If active, the adapter result is stored local.
     * @type Boolean
     */
    routesCache: false,
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

let ready = false
module.exports = function (moduleOptions) {
  // ignore last server generate
  if (ready) {
    return
  }
  ready = true

  const options = getDefaultOptions({
    name: MODULE_NAME,
    ...moduleOptions,
    ...this.options[MODULE_NAME]
  }, this.nuxt.options.dev)

  options.adapter = resolveAdapter(options.adapter)

  let setup = Promise.resolve()

  /**
   * add context plugin
   */

  const plugins = [
    { name: 'options' },
    { name: 'layout' },
    { name: 'content' }
  ]

  addPlugins(this, options, plugins)

  if (
    !isDynamicMode(options) &&
    (isNuxtBuild(this.nuxt) || isNuxtGenerate(this.nuxt) || isNuxtTest(this.nuxt))
  ) {
    setup = moduleSetup(this, options)
  } else {
    logWarn('enabled only for build or generate, ignored by development mode')
  }

  if (isDynamicMode(options)) {
    logInfo('"dynamicContent" is set or development mode, content is loaded on page request.')
  }

  return setup.then((routes) => {
    // IMPORTANT: hinzufügen von nuxt-i18n module muss nach registrieren des hook "extendRoutes" geschehen.
    this.addModule(getNuxtI18nModule(options))
    logInfo('add module "nuxt-18n" to nuxt')

    if ('sitemap' in options && typeof options.sitemap === 'object') {
      this.addModule(getSitemapModule(options))
      logInfo('add module "@nuxtjs/sitemap" to nuxt')
    }

    return routes
  })
}

/**
 * @param Object options
 * @param ModuleContainer moduleScope
 */
async function moduleSetup (moduleScope, options) {
  options.pageExtend = options.pageExtend || DEFAULT_PAGE_EXTEND

  registerHooks(moduleScope.nuxt)

  const layout = await cacheLayout(moduleScope, options)
  let routes = await cacheRoutes(moduleScope, options)

  // register extends build (webpack) & routes (nuxt)
  moduleScope.extendBuild(extendBuild(options, layout, routes, moduleScope))
  // execute hook before nuxt-i18n
  moduleScope.extendRoutes(extendRoutes(options, routes))

  routes = await generateRouteTemplates(DEFAULT_PAGE_TEMPLATE, options, routes)

  options.nuxtI18n.parsePages = true
  return createStaticComponents(moduleScope, options, routes)
}

function registerHooks (nuxt, options) {
  if (!nuxt.options.dev) {
    nuxt.hook('generate:done', () => cleanCacheDir(nuxt))
  }
}
