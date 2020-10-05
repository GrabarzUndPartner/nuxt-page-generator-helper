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

import PageHeader from '@/components/page/Header'
import AtomGithubCorner from '@/components/atoms/GithubCorner'

export default {

  components: {
    PageHeader,
    AtomGithubCorner
  },

  computed: {
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
