<script>

import {
  // eslint-disable-next-line no-unused-vars
  hydrateWhenIdle,
  // eslint-disable-next-line no-unused-vars
  hydrateWhenVisible
} from 'vue-lazy-hydration'

/* PLACEHOLDER_IMPORTS */

export default {
  scrollToTop: true,

  /* PLACEHOLDER_EXTENDS */

  /* PLACEHOLDER_NUXT_I18N_PATHS */

  components: {
    /* PLACEHOLDER_COMPONENTS */
  },

  asyncData ({ $getGeneratorRouteData, error }) {
    return $getGeneratorRouteData().then(module => module.default).catch(() => {
      error({ statusCode: 404, message: 'virtual content module not found' })
    })
  }

}

</script>
