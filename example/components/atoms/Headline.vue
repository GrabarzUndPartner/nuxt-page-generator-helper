<template>
  <component
    :is="tag"
    class="atom-headline"
    :class="styleClasses"
  >
    <slot>
      <span
        v-if="$slots.overline || overline"
        class="overline"
      >
        <slot name="overline">
          {{ overline }}
        </slot>
      </span>
      <span
        v-if="$slots.headline || headline"
        class="headline"
      >
        <slot name="headline">
          {{ headline }}
        </slot>
      </span>
      <span
        v-if="$slots.subline || subline"
        class="subline"
      >
        <slot name="subline">
          {{ subline }}
        </slot>
      </span>
    </slot>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      required: false,
      default () {
        return 'h1'
      }
    },
    overline: {
      type: String,
      required: false,
      default () {
        return 'Lorem Overline'
      }
    },
    headline: {
      type: String,
      required: false,
      default () {
        return 'Lorem Headline'
      }
    },
    subline: {
      type: String,
      required: false,
      default () {
        return 'Lorem Subline'
      }
    }
  },
  computed: {
    styleClasses () {
      return {
        [`headline--${this.tag}`]: true
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.atom-headline {
  font-family: sans-serif;
  font-style: normal;
  font-weight: 400;
  line-height: 1.5;

  & > * {
    display: block;
  }

  /* ########## */

  &.headline--h1 {
    /* empty */
  }

  &.headline--h2 {
    & .overline,
    & .subline {
      font-size: calc(12 / 375 * 100vw);
      font-weight: normal;

      @media (min-width: 576px) {
        font-size: 12px;
      }
    }

    & .subline {
      font-weight: 500;
    }

    & .headline {
      font-size: calc(36 / 375 * 100vw);
      font-weight: 700;

      @media (min-width: 576px) {
        font-size: 36px;
      }
    }
  }

  &.headline--h3 {
    /* empty */
  }

  &.headline--h4 {
    /* empty */
  }

  &.headline--h5 {
    /* empty */
  }

  &.headline--h6 {
    /* empty */
  }
}
</style>
