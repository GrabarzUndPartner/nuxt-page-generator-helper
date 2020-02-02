<template>
  <ul
    class="molecule-link-list"
    :class="styleClasses"
  >
    <slot>
      <li
        v-for="(item) in list"
        :key="item.title"
      >
        <atom-link-to :url="getUrl(item)">
          {{ item.title }}
        </atom-link-to>
      </li>
    </slot>
  </ul>
</template>

<script>
import AtomLinkTo from '@/components/atoms/LinkTo'

export default {
  components: {
    AtomLinkTo
  },
  props: {
    styleType: {
      type: String,
      default () {
        return null
      }
    },
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  computed: {
    styleClasses () {
      return {
        [`type--${this.styleType}`]: this.styleType
      }
    }
  },
  methods: {
    getUrl (item) {
      if ('$i18n' in this) {
        // use when nuxtI18n exists
        return this.localePath(item.url)
      } else {
        return item.url
      }
    }
  }
}
</script>

<style lang="postcss">
.molecule-link-list {
  &.type--page-header {
    padding: 0;
    margin: 0;
    list-style: none;

    @media (max-width: 767px) {
      text-align: center;
    }

    & li {
      display: inline-block;
      margin-right: calc(10 / 375 * 100vw);
      font-family: sans-serif;
      font-size: calc(16 / 375 * 100vw);
      font-weight: 400;
      line-height: 2em;

      @media (min-width: 576px) {
        font-size: 16px;
      }

      & a {
        color: #000;
        text-decoration: none;
        opacity: 0.6;

        &.nuxt-link-exact-active {
          opacity: 1;
        }
      }
    }
  }
}
</style>
