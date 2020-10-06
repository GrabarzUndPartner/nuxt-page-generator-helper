<% if (options.hasDynamicContent) { %>
import { getLayout } from '<%= options.adapterPath %>';
<% } %>

export default (ctx) => {

  <% if (!options.hasDynamicContent) { %>
    ctx.$getGeneratorLayoutData = () => {
      const path = 'layout';
      return import(/* webpackMode: "lazy" */'nuxt-page-generator-helper/locales/' + path + '.json').catch(err => {
        throw new Error(`local json file not found\n${err.message}`)
      });
    };
  <% } else { %>
    ctx.$getGeneratorLayoutData = () => {
      const options = ctx.$getGeneratorOptions();
      return getLayout(options).then(data => {
        if (!data) {
          throw new Error(`layout not found`)
        }
        return data
      });
    };
  <% } %>
}
