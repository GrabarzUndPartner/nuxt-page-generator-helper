const { resolve, join } = require('upath')

export const LOCALES_PAGES_PATH = resolve(join(process.cwd(), 'example/locales/pages'))

export function getLayoutLocaleFile () {
  return require('../../locales/layout.json')
}

export function getLocalesContext () {
  return require.context('../../locales/pages', true, /\.json$/)
}
