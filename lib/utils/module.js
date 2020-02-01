import path from 'upath'
import VirtualLocales from '../VirtualLocales'
import { logWarn } from './index'

export function isDevMode (options) {
  return !options.dev && options.isDev
}

export function isNuxtBuild (nuxt) {
  return '_build' in nuxt.options
}

export function isNuxtTest (nuxt) {
  return 'test' in nuxt.options
}

export function isNuxtGenerate (nuxt) {
  return '_generate' in nuxt.options
}

/**
 * @param Array plugins
 * @param ModuleContainer moduleScope
 */
export function addPlugins (moduleScope, options, plugins) {
  const pluginOptions = {
    adapterPath: path.normalize(options.adapter.PATH),
    dev: options.dev,
    isDev: options.isDev,
    adapterOptions: options.adapterOptions
  }
  plugins.forEach(({ name, mode }) => {
    moduleScope.addPlugin({
      src: path.resolve(__dirname, `../plugins/${name}.js`),
      mode,
      options: pluginOptions
    })
  })
}

export function getNuxtI18nModule (options) {
  return [
    'nuxt-i18n', options.nuxtI18n
  ]
}

export function extendBuild (options, routes) {
  return (config) => {
    config.resolve.alias[options.name + '-locales'] = path.join(process.cwd(), 'locales')
    config.plugins.push(new VirtualLocales(options, routes))
  }
}

export function extendRoutes (options, routes) {
  return (nuxtRoutes, resolve) => {
    if (options.cleanRoutes) {
      // remove all routes from nuxt
      nuxtRoutes.splice(0, nuxtRoutes.length)
    } else {
      // remove ignored routes from nuxt
      options.ignoreRoutes.forEach((name) => {
        const route = nuxtRoutes.find(route => route.name === name)
        if (route) {
          nuxtRoutes.splice(nuxtRoutes.indexOf(route), 1)
        }
      })
    }

    routes.forEach((route) => {
      let routePath = route.path.replace(/^\//, '')
      const name = routePath.split('/').map(name => name.replace(/_(.*)/, '$1')).join('-')

      if (nuxtRoutes.find(route => name === route.name)) {
        logWarn(`Route "${name}" already defined in project, virtual-content route are ignored.`)
      } else {
        routePath = routePath.split('/').map((name) => {
          return name.replace(/_(.*)/, ':$1?')
        }).join('/')

        nuxtRoutes.push({
          name,
          path: routePath,
          component: resolve(route.component),
          chunkName: path.join('pages', route.path.replace(/^\//, ''))
        })
      }
    })
  }
}
