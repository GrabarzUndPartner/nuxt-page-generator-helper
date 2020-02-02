import Vue from 'vue';

export default (ctx) => {
  Vue.prototype.$getGeneratorOptions = ctx.$getGeneratorOptions = () => {
    const defaultLocale = ctx.app.i18n.defaultLocale;
    const locale = ctx.app.i18n.locale;
    const locales = ctx.app.i18n.locales.map(locale => locale.code);

    return Object.assign({
      route: ctx.route,
      path: ctx.route.path.replace(RegExp(`^\\/${locale}[\/]?`), '/'),
      defaultLocale,
      locale,
      locales
    }, <%= JSON.stringify(options) %>)
  }
}
