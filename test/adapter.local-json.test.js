import { getLayout, getRoute, getRoutes } from '../example/adapter/local-json'

describe('adapter local-json', () => {
  test('getRoute', async () => {
    const routesParsed = await Promise.all([
      {
        path: '/',
        locale: 'en'
      },
      {
        path: '/page-1',
        locale: 'en'
      },
      {
        path: '/top-page/sub-page',
        locale: 'en'
      },
      {
        path: '/',
        locale: 'de'
      },
      {
        path: '/seite-1',
        locale: 'de'
      },
      {
        path: '/oberseite/unterseite',
        locale: 'de'
      }

    ].map((options) => {
      return getRoute(options).then(route => checkRouteObject(route))
    })).then(
      (values) => {
        return values.filter(value => !value).length === 0
      }
    )
    expect(routesParsed).toBe(true)
  })

  test('getRoutes', async () => {
    const routesParsed = await getRoutes().then(routes => Promise.all(routes.map(route => checkRouteObject(route)))).then(
      values => values.filter(value => !value).length === 0
    )
    expect(routesParsed).toBe(true)
  })
  test('getLayout', async () => {
    const layoutParsed = await getLayout().then(layout => checkLayoutObject(layout))
    expect(layoutParsed).toBe(true)
  })
})

function checkRouteObject (object) {
  const keys = {
    path: value => typeof value === 'string',
    data: value => value instanceof Object,
    routeParams: value => value instanceof Object,
    matches: value => Array.isArray(value)
  }

  if (Object.keys(keys).filter((key) => {
    if (key in object && keys[key](object[key])) {
      return true
    }
  }).length !== Object.keys(keys).length
  ) { return false }

  const { data, routeParams, matches } = object
  if (Object.keys(data).length !== Object.keys(routeParams).length || Object.keys(routeParams).length !== matches.length) {
    return false
  }

  return true
}

function checkLayoutObject (object) {
  const keys = {
    meta: value => Array.isArray(value),
    components: value => value instanceof Object
  }
  return Promise.all(Object.keys(object).map((locale) => {
    const layout = object[locale]
    if (Object.keys(keys).filter((key) => {
      if (key in layout && keys[key](layout[key])) {
        return true
      }
    }).length !== Object.keys(keys).length
    ) {
      return false
    }
    return true
  })).then((values) => {
    return values.filter(value => !value).length === 0
  })
}
