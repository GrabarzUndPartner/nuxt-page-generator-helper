
const utils = require('./utils')

export const PATH = __dirname

/**
 * @async
 */
export function getRoutes () {
  return utils.getPages()
    .catch((err) => { throw err })
}

/**
 * @async
 */
export function getRoute ({ path, locale }) {
  return utils.getPages().then((pages) => {
    return pages.find(page => page.matches.find(match => match.locale === locale && match.url === path))
  })
}

/**
 * @async
 */
export function getLayout () {
  return utils.getLayoutData()
}
