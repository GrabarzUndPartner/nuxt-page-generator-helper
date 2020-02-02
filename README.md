# nuxt-page-generator-helper

[![Build Status][travis-build-status-src]][travis-build-status-href]
[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> A helper for the generated static pages and target oriented integration of components.

Generate your static pages without using payload-extractor. Integrate your components on the page with targeted embedding and to enable the best chunk splitting.

Every not loaded resource is a good resource 🎉

[📖 **Release Notes**](./CHANGELOG.md)

## Setup

> ⚠️ **Important:** [nuxt-i18n](https://github.com/nuxt-community/nuxt-i18n) must not be included separately.  
> `nuxt-page-generator-helper` automatically includes [nuxt-i18n](https://github.com/nuxt-community/nuxt-i18n) and offers full configurability
> via the module options.
>  
> **_[nuxt-i18n](https://github.com/nuxt-community/nuxt-i18n) is a core component, if not used limit it to a default language._**

1. Add `.tmp` entry to gitignore.

2. Add `nuxt-page-generator-helper` dependency to your project

```bash
yarn add nuxt-page-generator-helper # or npm install nuxt-page-generator-helper
```

3. Add `nuxt-page-generator-helper` to the `modules` section of `nuxt.config.js`

```js
{
  modules: [

    ['nuxt-page-generator-helper', {
      debug: true,
      dev: false,
      adapter: require('./adapter/local-json'),
      adapterOptions: {},
      componentPath: '@/components/organisms',
      pageExtend: '@/extends/PageBuild',
      routesCache: false,
      ignoreRoutes: [
        'index',
        'page',
        'nested-page'
      ],
      nuxtI18n: {
        locales: [
          {
            code: 'en',
            iso: 'en'
          },
          {
            code: 'de',
            iso: 'de'
          }
        ],
        parsePages: true,
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        seo: false,
        vueI18nLoader: false,
        vueI18n: {
          fallbackLocale: 'en',
          messages: {
            en: require('./globals/locales/en.json'),
            de: require('./globals/locales/de.json')
          }
        }
      }
    }]

  ]
}
```

## Options

| Name                     | Type      | Description                                                                                                                                                                                                                                                                                   | Default Value  | Required |
| ------------------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | -------- |
| `debug`                  | `Boolean` | Debug-Mode                                                                                                                                                                                                                                                                                    | `false`        | `false`  |
| `dev`                    | `Boolean` | If set, modul is also active in development mode.                                                                                                                                                                                                                                             | `false`        | `false`  |
| `adapter`                | `Object`  | Function for querying the page structure with Content.                                                                                                                                                                                                                                        | `null`         | `true`   |
| `adapterOptions`         | `Object`  | Adapter to retrieve the payloads. Contains the calls `getRoute`, `getRoutes`, `getLayout` and path specification (`PATH`).                                                                                                                                                                    | `null`         | `true`   |
| `pageExtend`             | `Object`  | Path to the page extension that is used during generation.                                                                                                                                                                                                                                    | `null`         | `true`   |
| `componentPath`          | `String`  | Component src Path. Is required for embedding specified components in a page.                                                                                                                                                                                                                 | `@/components` | `false`  |
| `componentPrefix`        | `String`  | Prefix for component imports in generated pages.<br>Example: Component `Text` -> Component `PrefixText`                                                                                                                                                                                       | `prefix`       | `false`  |
| `asyncComponentLoad`     | `Boolean` | When set, components of a page are loaded asynchronously.                                                                                                                                                                                                                                     | `true`         | `false`  |
| `asyncComponentMaxEager` | `Number`  | Specifies the number of components assigned to the page chunk.<br>Important: Only active if `asyncComponentLoad` is set.                                                                                                                                                                      | `1`            | `false`  |
| `lazyHydrateEnable`      | `Boolean` | Components that can be reloaded can be controlled with LazyHydration.<br>Example:<br>With the setting `maxEagerComponents: 1,`<br> the first component is initialized at `whenIdle`. All others at `whenVisible`.<br>[vue-lazy-hydration](https://github.com/maoberlehner/vue-lazy-hydration) | `true`         | `false`  |
| `lazyHydrateRootMargin`  | `String`  | Specifies when the `whenVisible` event is triggered.<br>Example:<br>Component initialization occurs,<br>Component is less than `80px` away from the visible area.                                                                                                                             | `80px`         | `false`  |
| `routesCache`            | `Boolean` | If active, the adapter result is stored locally.                                                                                                                                                                                                                                              | `false`        | `false`  |
| `ignoreRoutes`           | `Array`   | List of route names, to be ignore by routes extend.<br>Example: `['index', 'page', 'nested-page']`                                                                                                                                                                                            | `null`         | `true`   |
| `cleanRoutes`            | `Boolean` | If set, all already registered routes will be removed from the list.                                                                                                                                                                                                                          | `false`        | `false`  |
| `nuxtI18n`               | `Object`  | Configuration for nuxt-i18n                                                                                                                                                                                                                                                                   | `null`         | `true`   |

## Build matrix of the page components generation

| Command       | Generate Vue-Pages | isDev   | generate | build   |
| ------------- | ------------------ | ------- | -------- | ------- |
| nuxt          | `false`            | `true`  | `false`  | `true`  |
| nuxt build    | `true`             | `false` | `false`  | `true`  |
| nuxt start    | `false`            | `false` | `false`  | `false` |
| nuxt generate | `true`             | `false` | `true`   | `true`  |

## Adapters

[📖 Adapter **Docs**](./README-ADAPTER.md)  

### Adapter `local-json`

Adapter `local-json` is used to work with local `JSON` files.

[📖 Sources](./example/adapter/local-json)

## Plugins

> 👁 All plugins available in context `client` and `server`.

### _`async`_ `$getGeneratorRouteData`

Retrieves the data for the current route using the adapter method `getRoute`.

```javascript
this.$getGeneratorRouteData()
```

### _`async`_ `$getGeneratorLayoutData`

Retrieves the data for the layout using the adapter method `getLayout`.

```javascript
this.$getGeneratorLayoutData()
```

### `$getGeneratorOptions`

Gets the adapter settings.

```javascript
this.$getGeneratorOptions()
```

## Usage

_**Coming Soon...**_

> But you can have a look at the module example. [Example Directory](./example)

## Preview

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Build and start with express `npm run start:generate`
4. Open [http://127.0.0.1:3000](http://127.0.0.1:3000) in Browser.

or look here

- [Preview](https://grabarzundpartner.github.io/nuxt-page-generator-helper/)
- [Report Client](https://grabarzundpartner.github.io/nuxt-page-generator-helper/reports/webpack/client.html)
- [Report Modern](https://grabarzundpartner.github.io/nuxt-page-generator-helper/reports/webpack/modern.html)
- [Report Server](https://grabarzundpartner.github.io/nuxt-page-generator-helper/reports/webpack/server.html)

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## License

[MIT License](./LICENSE)

<!-- Badges -->

[travis-build-status-src]: <https://travis-ci.org/GrabarzUndPartner/nuxt-page-generator-helper.svg?branch=master>
[travis-build-status-href]: <https://travis-ci.org/GrabarzUndPartner/nuxt-page-generator-helper>

[npm-version-src]: https://img.shields.io/npm/v/nuxt-page-generator-helper/latest.svg?style=flat-square
[npm-version-href]: https://npmjs.com/package/nuxt-page-generator-helper

[npm-downloads-src]: https://img.shields.io/npm/dt/nuxt-page-generator-helper.svg?style=flat-square
[npm-downloads-href]: https://npmjs.com/package/nuxt-page-generator-helper

[codecov-src]: https://img.shields.io/codecov/c/github/GrabarzUndPartner/nuxt-page-generator-helper/branch/master/graph/badge.svg?style=flat-square
[codecov-href]: https://codecov.io/gh/GrabarzUndPartner/nuxt-page-generator-helper

[license-src]: https://img.shields.io/npm/l/nuxt-page-generator-helper.svg?style=flat-square
[license-href]: https://npmjs.com/package/nuxt-page-generator-helper
