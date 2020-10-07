import path from 'upath'
import { getShortName, readFile } from './index'

const LINE_BREAK = '\n'

export async function generateRouteTemplates (templatePath, options, routes) {
  const template = await readFile(templatePath)
  routes.forEach((route) => {
    route.template = getPageTemplate(options, template, route)
  })
  return routes
}

function getPageTemplate (options, template, pageData) {
  // nuxtI18n

  const nuxtI18nPaths = getNuxtI18nPaths(options.nuxtI18n.locales, pageData.data)

  if (nuxtI18nPaths) {
    template = template.replace('/* PLACEHOLDER_NUXT_I18N_PATHS */', `${nuxtI18nPaths},`)
  }

  // page components & imports
  const components = getImportComponents(options, pageData.data)
  const componentList = Object.keys(components.components).map((key) => {
    return components.components[String(key)]
  })

  const imports = [].concat(components.imports)

  if ('pageExtend' in options && options.pageExtend) {
    imports.push(`import PageExtend from '${options.pageExtend}';`)
    template = template.replace('/* PLACEHOLDER_EXTENDS */', 'extends: PageExtend,')
  }

  if (imports.length) {
    template = template.replace('/* PLACEHOLDER_IMPORTS */', `${imports.join(LINE_BREAK)}`)
  }

  if (componentList.length) {
    template = template.replace('/* PLACEHOLDER_COMPONENTS */', '\n' + componentList.join(`,${LINE_BREAK}`) + '\n')
  }

  return template
}

function getNuxtI18nPaths (locales, pageData) {
  const data = locales.map(({ code }) => {
    let url
    if (String(code) in pageData) {
      url = pageData[String(code)].url
      if (typeof url === 'object') {
        url = url.path
      }
    }
    return { url, code, exist: (String(code) in pageData) }
  }).filter(({ exist }) => exist)

  const nuxtI18n = data.reduce((result, { code, url }) => {
    result.locales.push(`      '${code}'`)
    result.paths.push(`      '${code}': '${url}'`)
    return result
  }, {
    locales: [],
    paths: []
  })

  return [
    'nuxtI18n: {',
    '    locales: [',
    nuxtI18n.locales.join(',' + LINE_BREAK),
    '    ],',
    '    paths: {',
    nuxtI18n.paths.join(',' + LINE_BREAK),
    '    }',
    '  }'
  ].join(LINE_BREAK)
}

function getImportComponents (options, pageData) {
  let components = Object.keys(pageData).reduce((result, locale) => {
    if ('components' in pageData[String(locale)] && Array.isArray(pageData[String(locale)].components)) {
      pageData[String(locale)].components.forEach((item) => {
        result.push(item.component)
      })
    }
    return result
  }, [])
  components = Array.from(new Set(components))

  // const lazyHydrateMaxIdle = Math.max(options.lazyHydrateMaxIdle, 0)

  return components.reduce((result, component, i) => {
    const shortName = getShortName(options.componentPrefix, component)
    const componentPath = path.toUnix(path.join(options.componentPath, component))

    if (i < 2) {
      result.components[String(shortName)] = `    ${shortName}: () => import(/* webpackMode: "eager" */'${componentPath}')`
    } else {
      result.components[String(shortName)] = `    ${shortName}: import('${componentPath}')`
    }

    // if (options.asyncComponentLoad) {
    //   if (options.lazyHydrateEnable) {
    //     if (i < lazyHydrateMaxIdle) {
    //       result.components[String(shortName)] = `    ${shortName}: hydrateWhenIdle(() => import('${componentPath}'))`
    //     } else {
    //       result.components[String(shortName)] = `    ${shortName}: hydrateWhenVisible(() => import('${componentPath}'), { observerOptions: { rootMargin: '${options.lazyHydrateRootMargin}' } })`
    //     }
    //     return result
    //   } else {
    //     result.components[String(shortName)] = `    ${shortName}: () => import('${componentPath}')`
    //     return result
    //   }
    // }

    // result.imports.push(`import ${shortName} from '${componentPath}';`)
    // result.components[String(shortName)] = `    ${shortName}`

    return result
  }, {
    imports: [],
    components: {}
  })
}
