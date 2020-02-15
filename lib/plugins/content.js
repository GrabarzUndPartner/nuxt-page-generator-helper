<% if (options.isDev || !options.dev && options.isDev) { %>
import { getRoute, getLayout } from '<%= options.adapterPath %>';
<% } %>

export default (ctx) => {
  <% if (!options.isDev || options.dev && options.isDev) { %>
    ctx.$getGeneratorRouteData = () => {
      const app = ctx.app;
      const path = getRoutePath(app)
        .replace(RegExp(`^/${app.i18n.locale}`), '')
        .replace(/^\/([^?.#]*)[\\/?#]{0,1}[^\\/]*$/, '$1')
        .replace(/\/index|\/$/, '') || 'index'
      return import(/* webpackMode: "lazy" */'nuxt-page-generator-helper/locales/' + app.i18n.locale + '/' + path + '.json').catch(err => {
        throw new Error(`local json file not found\n${err.message}`)
      });
    };
  <% } else { %>
    ctx.$getGeneratorRouteData = () => {
      const options = ctx.$getGeneratorOptions();
      return getRoute(options).then(route => {
        if (!route) {
          throw new Error(`route not found "${options.route.path}"`)
        }
        if ('routeParams' in route) {
          // set other locale slugs for languageSwitch
          ctx.store.dispatch('i18n/setRouteParams', route.routeParams)
        }
        return route.data[String(options.locale)]
      });
    };
  <% } %>
}

function getRoutePath (app) {
  return app.router.matcher.match(app.localePath(app.getRouteBaseName())).path;
}

