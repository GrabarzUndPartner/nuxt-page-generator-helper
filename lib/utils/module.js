import path from 'upath'
import esm from 'esm'
import VirtualLocales from '../VirtualLocales'
import { logWarn } from './index'

export function isDynamicMode (options) {
  return options.dynamicContent
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

export function resolveAdapter (adapter) {
  const requiredAdapterFunctions = ['PATH', 'getLayout', 'getRoute', 'getRoutes']

  if (!adapter) {
    throw new Error('no adapter defined!')
  }

  if (typeof adapter === 'string') {
    adapter = esm(module)(adapter)
  }

  if (requiredAdapterFunctions.filter(name => name in adapter).length !== requiredAdapterFunctions.length) {
    throw new Error('adapter need vars and functions ' + requiredAdapterFunctions.join(', '))
  }

  return adapter
}

/**
 * @param Array plugins
 * @param ModuleContainer moduleScope
 */
export function addPlugins (moduleScope, options, plugins) {
  const pluginOptions = {
    adapterPath: path.toUnix(options.adapter.PATH),
    hasDynamicContent: isDynamicMode(options),
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

export function getSitemapModule (options) {
  return [
    '@nuxtjs/sitemap', options.sitemap
  ]
}

export function extendBuild (options, routes) {
  return (config) => {
    config.plugins.push(new VirtualLocales(options, routes))
  }
}

export function extendRoutes (options, routes) {
  return (nuxtRoutes) => {
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
      let routePath = path.toUnix(route.path).replace(/^\//, '')
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
          component: path.toUnix(route.component),
          chunkName: `pages/${routePath}`
        })
      }
    })
  }
}
