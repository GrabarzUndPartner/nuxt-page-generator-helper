import fs from 'fs'
import path from 'upath'
import { pascalCase } from 'change-case'
import consola from 'consola'
import rimraf from 'rimraf'

export const MODULE_NAME = 'nuxt-page-generator-helper'
export const PATH_CACHE_DIR = path.join('.tmp', MODULE_NAME)
export const PATH_CACHE_ROUTES = path.join(PATH_CACHE_DIR, 'routes.json')
export const PATH_CACHE_LAYOUT = path.join(PATH_CACHE_DIR, 'layout.json')
export const PATH_CACHE_PAGES_DIR = path.join(PATH_CACHE_DIR, 'pages')

/**
 * Get module option from nuxt config
 */
export function getModuleOptions (modules, name) {
  const module = modules.find(module => module[0] === name)
  if (module) {
    if (typeof module[1] === 'object') {
      return module[1]
    }
    return {}
  }
  return null
}

export function getNuxtI18nOptions (nuxtConfig) {
  return getModuleOptions(nuxtConfig.modules, 'nuxt-i18n')
}

export function addRoutesToI18nPages (options, routes) {
  options.parsePages = false
  options.pages = options.pages || {}
  const pages = options.pages
  routes.forEach((route) => {
    pages[route.path.replace(/^\//, '')] = options.nuxtI18n.locales.reduce((result, { code }) => {
      result[String(code)] = route.data[String(code)] ? route.data[String(code)].url : false
      return result
    }, {})
  }, {})
}

/**
 * article/HeadlineText -> prefixArticleHeadlineText
 */
export function getShortName (prefix, component) {
  return pascalCase(prefix + component.split('/').map((name) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }).join(''))
}

export function getLocaleRoutesCachePath (nuxt) {
  return path.join(nuxt.options.srcDir, PATH_CACHE_ROUTES)
}

export function getLocaleLayoutCachePath (nuxt) {
  return path.join(nuxt.options.srcDir, PATH_CACHE_LAYOUT)
}

export function getPageCachePath (nuxt) {
  return path.join(nuxt.options.srcDir, PATH_CACHE_PAGES_DIR)
}
export function getCachePath (nuxt) {
  return path.join(nuxt.options.srcDir, PATH_CACHE_DIR)
}

export function createStaticComponents (moduleScope, options, routes) {
  const nuxt = moduleScope.nuxt
  return Promise.all(routes.map((route) => {
    const filepath = path.join(getPageCachePath(nuxt), route.path + '.vue')
    return writeDir(filepath).then(() => writeFile(filepath, route.template)).then(() => {
      if (options.debug) {
        logSuccess(`write page: ${path.relative(getPageCachePath(nuxt), filepath)}`)
      }
      route.component = filepath
      return route
    })
  })).then((routes) => {
    logSuccess(`write ${routes.length} page templates`)
    return routes
  })
}

// Files

export function writeDir (filepath) {
  return new Promise((resolve) => {
    if (fs.existsSync(filepath)) {
      resolve()
      return
    }
    fs.mkdir(path.dirname(filepath), {
      recursive: true
    }, (err) => {
      if (err) {
        throw err
      }
      resolve()
    })
  })
}

export function writeFile (filepath, content) {
  return new Promise((resolve) => {
    fs.writeFile(filepath, content, 'utf-8', (err) => {
      if (err) {
        throw err
      }
      resolve()
    })
  })
}

export function readFile (filepath) {
  return new Promise((resolve) => {
    fs.readFile(filepath, 'utf8', function (err, data) {
      if (err) {
        throw err
      }
      resolve(data)
    })
  })
}

export function cleanCacheDir (nuxt, name) {
  return new Promise((resolve) => {
    rimraf(getPageCachePath(nuxt), {}, resolve)
  })
}

// Logs

export function logSuccess (...message) {
  consola.success(...[
    'Virtual-Content:'
  ].concat(message))
}
export function logInfo (...message) {
  consola.info(...[
    'Virtual-Content:'
  ].concat(message))
}
export function logWarn (...message) {
  consola.warn(...[
    'Virtual-Content:'
  ].concat(message))
}
export function log (...message) {
  consola.log(...[
    '                  '
  ].concat(message))
}

// Cache

// Routes

// eslint-disable-next-line complexity
export async function cacheRoutes (moduleScope, options) {
  const nuxt = moduleScope.nuxt
  let cacheEmpty = false
  let routes = await getCachedRoutes(nuxt)
  cacheEmpty = !options.routesCache || !routes || (options.isDev && options.routesCache && !routes) || 'npm_config_virtual_content_clear_cache' in process.env

  if (!routes || routes.length < 1 || cacheEmpty) {
    logWarn('Virtual-Content: request all routes, cache routes for fast startup. options.routesCache', true)
    routes = await options.adapter.getRoutes(Object.assign({
      defaultLocale: options.nuxtI18n.defaultLocale,
      locales: options.nuxtI18n.locales.map(locale => locale.code)
    }, options.adapterOptions))
  } else {
    logInfo(`route cache active, read ${routes.length} exists routes`)
  }

  if (options.routesCache && cacheEmpty) {
    logSuccess(`route cache active, ${routes.length} routes saved`, '\n')
    routes = await createRoutesCache(nuxt, routes)
  }

  if (options.debug) {
    routes.forEach((route) => {
      const locales = Object.keys(route.data)
      const logs = [
        `route: ${route.path.replace(/^\//, '').replace(/\//g, '-')}`
      ]
      locales.forEach((locale) => {
        let url = route.data[String(locale)].url
        if (typeof url === 'object') {
          url = route.data[String(locale)].url.path
        }

        logs.push(`\n\t\t      ${locale}: ${route.data[String(locale)].url.path}`)
      })
      logs.push('\n')
      log(...logs)
    })
  }
  return routes
}

export function createRoutesCache (nuxt, routes) {
  const filepath = getLocaleRoutesCachePath(nuxt)
  return writeDir(filepath).then(() => writeFile(filepath, JSON.stringify(routes))).then(() => routes)
}

export function getCachedRoutes (nuxt) {
  const filepath = getLocaleRoutesCachePath(nuxt)
  if (fs.existsSync(filepath)) {
    return readFile(filepath).then(content => JSON.parse(content))
  }
  return Promise.resolve(null)
}

// Layout

export async function cacheLayout (moduleScope, options) {
  const nuxt = moduleScope.nuxt
  let cacheEmpty = false
  let layout = await getCachedLayout(nuxt)
  cacheEmpty = !options.layoutCache || !layout || (options.isDev && options.layoutCache && !layout) || 'npm_config_virtual_content_clear_cache' in process.env

  if (!layout || cacheEmpty) {
    logWarn('Virtual-Content: request layout, cache layout for fast startup. options.layoutCache', true)
    layout = await options.adapter.getLayout(Object.assign({
      defaultLocale: options.nuxtI18n.defaultLocale,
      locales: options.nuxtI18n.locales.map(locale => locale.code)
    }, options.adapterOptions))
  } else {
    logInfo('layout cache active')
  }

  if (options.layoutCache && cacheEmpty) {
    logSuccess('layout cache active', '\n')
    layout = await createLayoutCache(nuxt, layout)
  }

  return layout
}

export function createLayoutCache (nuxt, layout) {
  const filepath = getLocaleLayoutCachePath(nuxt)
  return writeDir(filepath).then(() => writeFile(filepath, JSON.stringify(layout))).then(() => layout)
}

export function getCachedLayout (nuxt) {
  const filepath = getLocaleLayoutCachePath(nuxt)
  if (fs.existsSync(filepath)) {
    return readFile(filepath).then(content => JSON.parse(content))
  }
  return Promise.resolve(null)
}
