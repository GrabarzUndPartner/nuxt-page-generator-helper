const path = require('upath')

export const LOCALES_PATH = path.resolve(process.cwd(), 'example/locales/')
export const LOCALES_PAGES_PATH = path.resolve(LOCALES_PATH, 'pages')

export function getPageLocalesContext () {
  return require.context('../../locales/pages', true, /\.json$/)
}

export function getLayoutLocale () {
  return require('../../locales/layout')
}
