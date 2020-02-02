import path from 'upath'
import { getShortName, readFile } from './index'

const LINE_BREAK = '\n'

export async function generateRouteTemplates (options, routes) {
  const template = await readFile(path.resolve(__dirname, '../tmpl/Page.vue'))
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
    template = template.replace('/* PLACEHOLDER_EXTENDS */', `  extends: ${['PageExtend'].join(',')},`)
  }

  if (imports.length) {
    template = template.replace('/* PLACEHOLDER_IMPORTS */', `${imports.join(LINE_BREAK)}`)
  }

  if (componentList.length) {
    template = template.replace('/* PLACEHOLDER_COMPONENTS */', componentList.join(`,${LINE_BREAK}`))
  }

  return template
}

function getNuxtI18nPaths (locales, pageData) {
  const datas = locales.map(({ code }) => {
    let url = pageData[String(code)].url
    if (typeof url === 'object') {
      url = url.path
    }
    return { url, code, exist: pageData[String(code)] }
  }).map(({ code, url, exist }) => `      '${code}': ${exist ? `'${url}'` : false}`)
  return [
    '  nuxtI18n: {',
    '    paths: {',
    datas.join(',' + LINE_BREAK),
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

  const asyncComponentMaxEager = Math.max(options.asyncComponentMaxEager, 0)

  return components.reduce((result, component, i) => {
    const shortName = getShortName(options.componentPrefix, component)
    const componentPath = path.toUnix(path.join(options.componentPath, component))

    if (options.asyncComponentLoad) {
      if (options.lazyHydrateEnable) {
        if (i < asyncComponentMaxEager) {
          result.components[String(shortName)] = `    ${shortName}: hydrateWhenIdle(() => import(/* webpackMode: "eager" */'${componentPath}'))`
        } else {
          result.components[String(shortName)] = `    ${shortName}: hydrateWhenVisible(() => import('${componentPath}'), { observerOptions: { rootMargin: '${options.lazyHydrateRootMargin}' } })`
        }
        return result
      } else {
        if (i < asyncComponentMaxEager) {
          result.components[String(shortName)] = `    ${shortName}: () => import(/* webpackMode: "eager" */'${componentPath}')`
        } else {
          result.components[String(shortName)] = `    ${shortName}: () => import('${componentPath}')`
        }
        return result
      }
    }

    result.imports.push(`import ${shortName} from '${componentPath}';`)
    result.components[String(shortName)] = `    ${shortName}`

    return result
  }, {
    imports: [],
    components: {}
  })
}
