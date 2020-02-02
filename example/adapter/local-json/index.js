const { getPageLocales, getLayoutLocale } = require('./utils')

export const PATH = __dirname

/**
 * @async
 */
export function getRoutes () {
  return getPageLocales()
    .catch((err) => { throw err })
}

/**
 * @async
 */
export function getRoute ({ path, locale }) {
  return getPageLocales().then((pages) => {
    return pages.find(page => page.matches.find(match => match.locale === locale && match.url === path))
  })
}

/**
 * @async
 */
export function getLayout () {
  return getLayoutLocale()
}
