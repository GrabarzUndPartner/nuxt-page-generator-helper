const { resolve } = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isDev = process.env.NODE_ENV === 'development'
const DEFAULT_LANG = 'en'

module.exports = {
  dev: isDev,

  modern: 'client',

  rootDir: resolve(__dirname, '..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  render: {
    resourceHints: false
  },

  build: {

    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : '[name].[chunkhash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : '[name].[chunkhash].js'
    },

    postcss: {
      plugins: {
        'postcss-nesting': {},
        lost: {
          gutter: '15px',
          flexbox: 'flex',
          cycle: 'auto'
        }
      }
    },

    extend (config) {
      if (!isDev) {
        config.plugins.push(new BundleAnalyzerPlugin({
          reportFilename: resolve(`reports/webpack/${config.name}.html`),
          statsFilename: resolve(`reports/webpack/stats/${config.name}.json`),
          analyzerMode: 'static',
          generateStatsFile: true,
          openAnalyzer: false,
          logLevel: 'info',
          defaultSizes: 'gzip',
          statsOptions: 'normal'
        }))
      }
    }

  },

  generate: {
    dir: getDistPath()
  },

  router: {
    base: getBasePath(),
    prefetchLinks: true
  },

  modules: [
    [
      resolve(__dirname, '..'), {
        debug: true,
        componentPath: '@/components/organisms',
        pageExtend: '@/extends/PageBuild',
        adapter: require('./adapter/local-json'),
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
          defaultLocale: DEFAULT_LANG,
          strategy: 'prefix_except_default',
          seo: false,
          vueI18nLoader: false,
          vueI18n: {
            fallbackLocale: DEFAULT_LANG,
            messages: {
              en: require('./globals/locales/en.json'),
              de: require('./globals/locales/de.json')
            }
          }
        },
        sitemap: {
          path: 'sitemap.xml',
          hostname: getWebsiteHost(),
          cacheTime: 1000 * 60 * 15,
          gzip: false,
          exclude: [],
          routes: [],
          defaults: {
            changefreq: 'daily',
            priority: 1,
            lastmod: new Date(),
            lastmodrealtime: true
          }
        }
      }
    ]
  ]
}

function getBasePath () {
  return process.env.npm_config_base || process.env.BASE_PATH || '/'
}

function getDistPath () {
  return process.env.npm_config_dist || process.env.DIST_PATH || 'dist'
}

function getWebsiteHost () {
  return process.env.npm_config_website_host || process.env.WEBSITE_HOST || 'http://localhost:3000'
}
