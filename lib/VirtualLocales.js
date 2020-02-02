import path from 'upath'
import VirtualModule from 'webpack-virtual-modules'
import { getShortName } from './utils'

const PLUGIN_NAME = 'VirtualLocales'

export default class VirtualLocales extends VirtualModule {
  constructor (options, routes = []) {
    super()

    this.routes = routes
    this.options = Object.assign({ componentPrefix: 'virtual' }, options)
  }

  apply (compiler) {
    super.apply(compiler)
    compiler.hooks.compilation.tap(PLUGIN_NAME, onCompilation(this))
  }
}

function onCompilation (virtualModule) {
  return () => {
    const { routes, options } = virtualModule

    routes.forEach((route) => {
      Object.keys(route.data).forEach((locale) => {
        let data = route.data[String(locale)]

        /**
         * Componenten Namen brauchen alle einen Prefix Example: TextImage -> virtualTextImage
         */
        data = JSON.parse(JSON.stringify(data)) // clone
        data = prefixComponentNames(options.componentPrefix, data)

        let url = data.url
        if (typeof url === 'object') {
          url = url.path
        }
        if (/\/$/.test(url)) {
          url += 'index'
        }
        data.url = url

        const name = data.url
          // remove dynamic param
          .replace(/(.*)\/:.*?$/, '$1')

        virtualModule.writeModule(
          path.join('node_modules', options.name, 'locales', locale, `${name}.json`),
          JSON.stringify(data)
        )
      })
    })
  }
}

function prefixComponentNames (prefix, pageData) {
  const components = pageData.components
  for (let i = 0; i < components.length; i++) {
    const component = components[Number(i)]
    component.component = getShortName(prefix, component.component)
  }
  return pageData
}
