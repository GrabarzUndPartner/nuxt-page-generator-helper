import path from 'upath'
import { getShortName, readFile } from './index'

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
    template = template.replace('/* PLACEHOLDER_EXTENDS */', `extends: ${['PageExtend'].join(',')},`)
  }

  if (imports.length) {
    template = template.replace('/* PLACEHOLDER_IMPORTS */', `${imports.join('\n')}`)
  }

  if (componentList.length) {
    template = template.replace('/* PLACEHOLDER_COMPONENTS */', `\n${componentList.join(',\n')}\n`)
  }

  return template
}

function getNuxtI18nPaths (locales, pageData) {
  return 'nuxtI18n: { \n    paths: {\n' + locales.map(({ code }) => {
    let url = pageData[String(code)].url
    if (typeof url === 'object') {
      url = url.path
    }
    return `      '${code}': ${pageData[String(code)] ? `'${url}'` : false}`
  }).join(',\n') + '\n    }\n  }'
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

  return components.reduce((result, component, i) => {
    const shortName = getShortName(options.componentPrefix, component)
    const componentPath = path.toUnix(path.join(options.componentPath, component))

    if (i < 1) {
      result.components[String(shortName)] = `    ${shortName}: hydrateWhenIdle(() => import(/* webpackMode: "eager" */'${componentPath}'))`
      // result.imports.push(`import ${shortName} from '${componentPath}';`);
      // result.components[String(shortName)] = shortName;
    } else {
      // result.components[String(shortName)] = `${shortName}:()=>import('${componentPath}')`;
      result.components[String(shortName)] = `    ${shortName}: hydrateWhenVisible(() => import('${componentPath}'), { observerOptions: { rootMargin: '100px' } })`
    }

    return result
  }, {
    imports: [],
    components: {}
  })
}
