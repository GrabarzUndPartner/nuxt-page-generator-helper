<template>
  <molecule-link-list class="molecule-language-switch" :style-type="styleType">
    <li
      v-for="language in languages"
      :key="language.code"
    >
      <atom-link-to
        v-if="getRouteBaseName() === 'index' || getRouteBaseName() !== 'index' && localePath('index') !== localePath(getRouteBaseName(), language.code)"
        :url="localePath(getRouteBaseName(), language.code)"
        class="language-switch"
        :title="language.code"
      />
    </li>
  </molecule-link-list>
</template>

<script>

import MoleculeLinkList from '@/components/molecules/LinkList'
import AtomLinkTo from '@/components/atoms/LinkTo'

export default {
  components: {
    MoleculeLinkList,
    AtomLinkTo
  },
  props: {
    styleType: {
      type: String,
      default () {
        return null
      }
    },
    filterCurrentLang: {
      type: Boolean,
      required: false,
      default () { return false }
    }
  },

  computed: {
    languages () {
      return this.$i18n.locales.filter((locale) => {
        return !this.filterCurrentLang || (this.filterCurrentLang && locale.code !== this.$i18n.locale)
      })
    }
  }
}
</script>

<style lang="postcss" scoped>
.molecule-language-switch {
  padding: 0;
  margin: 0;
  font-family: sans-serif;
  list-style: none;

  & li {
    display: inline-block;
    margin: 0 5px;
    font-size: calc(16 / 375 * 100vw);

    @media (min-width: 576px) {
      font-size: 16px;
    }
  }

  & a {
    color: #000;
    text-decoration: none;
    text-transform: uppercase;
    opacity: 0.6;

    &.nuxt-link-exact-active {
      opacity: 1;
    }
  }

  &.type--page-header {
    @media (min-width: 768px) {
      text-align: right;
    }
  }
}
</style>
