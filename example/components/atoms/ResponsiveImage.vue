<template>
  <picture class="atom-responsive-image">
    <source
      v-for="(source, index) in items"
      :key="index"
      v-bind="source"
    >
    <img
      :src="placeholder"
      :alt="alt"
      :title="title"
      :loading="loading"
      :width="width"
      :height="height"
      @load="onLoad"
    >
  </picture>
</template>

<script>
const PLACEHOLDER = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='

const mimeTypes = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp'
}

export default {
  props: {
    loading: {
      type: String,
      required: false,
      default () {
        return 'auto' // auto, lazy
      }
    },
    sourceClientOnly: {
      type: Boolean,
      required: false,
      default () {
        return true
      }
    },
    placeholder: {
      type: String,
      required: false,
      default () {
        return PLACEHOLDER
      }
    },
    sources: {
      type: [
        Array, Object
      ],
      default () {
        return [
          { media: 'default', srcset: 'img/sample-a-16-9/412x232.jpg' },
          { media: 'xs', srcset: 'img/sample-a-16-9/768x432.jpg' },
          { media: 'sm', srcset: 'img/sample-a-16-9/992x558.jpg' },
          { media: 'md', srcset: 'img/sample-a-16-9/1200x675.jpg' },
          { media: 'lg', srcset: 'img/sample-a-16-9/1600x900.jpg' },
          { media: 'xl', srcset: 'img/sample-a-16-9/1920x1080.jpg' }
        ]
      }
    },
    width: {
      type: Number,
      required: false,
      default () {
        return null
      }
    },
    height: {
      type: Number,
      required: false,
      default () {
        return null
      }
    },
    title: {
      type: String,
      required: false,
      default () {
        return 'image title'
      }
    },
    alt: {
      type: String,
      required: false,
      default () {
        return 'image description'
      }
    }
  },

  computed: {
    sorted () {
      const list = [].concat(this.sources)
      return sortBy(list, Object.keys(breakpoints)).reverse()
    },
    items () {
      const test = this.sorted.map((source) => {
        source = Object.assign({}, source)
        source.type = ''

        if (this.sourceClientOnly && !process.client) {
          source.srcset = ''
        } else {
          source.type = mimeTypes[getMimeType(source.srcset.replace(/.*\.(\w{3,4}).*$/, '$1'))]
        }
        source.media = breakpoints[source.media]
        return source
      })
      return test
    }
  },

  methods: {
    onLoad () {
      if ('objectFitImages' in global) {
        global.objectFitImages(this.$el.querySelector('img'))
      }
    }
  }
}

function sortBy (list, pattern) {
  return list.sort(function (a, b) {
    if (pattern.indexOf(a.media) === pattern.indexOf(b.media)) {
      return 0
    } else {
      return pattern.indexOf(a.media) > pattern.indexOf(b.media) ? 1 : -1
    }
  })
}

function getMimeType (url) {
  const mime = /\w+$/.exec(url)
  return mime[0]
}

const breakpoints = {
  default: 'all',
  'default-max': '(max-width: 575px)',
  xs: '(min-width: 576px)',
  'xs-max': '(max-width: 767px)',
  sm: '(min-width: 768px)',
  'sm-max': '(max-width: 991px)',
  md: '(min-width: 992px)',
  'md-max': '(max-width: 1199px)',
  lg: '(min-width: 1200px)',
  'lg-max': '(max-width: 1599px)',
  xl: '(min-width: 1600px)',
  'xl-max': '(max-width: 1919px)',
  xxl: '(min-width: 1920px)'
}

</script>

<style lang="postcss">
picture {
  display: block;

  & img {
    display: block;
    width: 100%;
    max-width: 100%;
  }
}
</style>
