import path from 'upath'
import { LOCALES_PAGES_PATH, getLayoutLocaleFile, getLocalesContext } from './config'

// #########################################################

let glob, fs

if (!process.client) {
  glob = require('glob')
  fs = require('fs')
}

export function getPageLocales () {
  return getFiles().then((pages) => {
    return Promise.all(pages.map(({ path, data }) => {
      return prepareOpenGraph(data).then((data) => {
        return Object.keys(data).reduce((result, locale) => {
          const url = data[String(locale)].url.path.replace(/^\//, '').split('/')
          if (url.length > 1) {
            result.routeParams[String(locale)] = { nested: url[0], page: url[1] }
          } else {
            result.routeParams[String(locale)] = { page: url[0] }
          }
          result.matches.push({ url: data[String(locale)].url.path, locale })
          return result
        }, {
          path,
          data,
          routeParams: {},
          matches: []
        })
      })
    }))
  })
}

export function getLayoutLocale () {
  const data = getLayoutLocaleFile()
  return prepareOpenGraph(data)
}

function getFileContent (filepath, rootPath) {
  return new Promise((resolve) => {
    const shortPath = path.normalize(filepath).replace(rootPath, '').replace('.json', '')
    fs.readFile(filepath, 'utf8', function (err, content) {
      if (err) {
        throw err
      }
      resolve({
        path: shortPath,
        data: JSON.parse(content)
      })
    })
  })
}

function getFiles () {
  if (!process.client) {
    // Production build load content from static files
    return new Promise((resolve) => {
      glob(path.resolve(path.join(LOCALES_PAGES_PATH, '/**/*.json')), (err, files) => {
        if (err) {
          throw err
        }
        resolve(files)
      })
    }).then(files => Promise.all(files.map(filepath => getFileContent(filepath, LOCALES_PAGES_PATH))))
  } else {
    // Dev build load content from require
    const requireContext = getLocalesContext()
    return Promise.all(requireContext.keys().map((path) => {
      return {
        path,
        data: requireContext(path)
      }
    }))
  }
}

function prepareOpenGraph (page) {
  return new Promise((resolve) => {
    Object.keys(page).forEach((locale) => {
      const data = page[String(locale)]
      data.meta = data.meta || []
      if ('openGraph' in data) {
        data.meta.push(...getOpenGraph(data.openGraph))
        delete data.openGraph
      }
    })
    resolve(page)
  })
}

export function getOpenGraph (options) {
  options = Object.assign({
    type: 'website',
    site_name: null,
    title: null,
    description: null,
    image: null,
    image_secure_url: null,
    image_type: null,
    image_width: 1200,
    image_height: 630
  }, options)

  const tags = {
    type: { hid: 'og:site_name', property: 'og:type' },
    site_name: { hid: 'og:site_name', property: 'og:site_name' },
    title: { hid: 'og:title', property: 'og:title' },
    description: { hid: 'og:description', property: 'og:description' },
    image: { hid: 'og:image', property: 'og:image' },
    image_secure_url: { hid: 'og:secure_url', property: 'og:secure_url' },
    image_type: { hid: 'og:image:type', property: 'og:image:type' },
    image_width: { hid: 'og:image:width', property: 'og:image:width' },
    image_height: { hid: 'og:image:height', property: 'og:image:height' }
  };

  [
    'url', 'image', 'image_secure_url'
  ].forEach((name) => {
    let value = options[String(name)]
    if (value && !/^http[s]?:\/\//.test(value)) {
      if (!/^\//.test(value)) {
        value = `/${value}`
      }
      options[String(name)] = `${process.env.baseUrl}${value}`
    }
  })
  return Object.keys(tags).filter(name => options[String(name)]).map(name => Object.assign({ content: options[String(name)] }, tags[String(name)]))
}
