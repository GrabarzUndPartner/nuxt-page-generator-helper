<template>
  <div>
    <page-header v-bind="layoutComponents.pageHeader" />
    <main>
      <nuxt />
    </main>
    <atom-github-corner />
  </div>
</template>

<script>

import {
  hydrateWhenIdle
} from 'vue-lazy-hydration'

export default {

  components: {
    PageHeader: hydrateWhenIdle(() => import(/* webpackMode: "eager" */'@/components/page/Header')),
    AtomGithubCorner: hydrateWhenIdle(() => import(/* webpackMode: "eager" */'@/components/atoms/GithubCorner'))
  },

  computed: {
    preventScrolling () {
      return this.$store.getters['layout/preventScrolling']
    },
    layoutMeta () {
      return this.$store.getters['layout/data'][this.$i18n.locale].meta
    },
    layoutComponents () {
      return this.$store.getters['layout/data'][this.$i18n.locale].components
    }
  },

  head () {
    const head = this.$nuxtI18nSeo()
    head.meta = [].concat(head.meta, this.layoutMeta)
    return head
  }
}

</script>

<style lang="postcss">
body {
  margin: 0;
}
</style>
