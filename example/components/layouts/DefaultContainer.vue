<template>
  <component
    :is="tag"
    class="layouts-default-container"
    :class="styleClasses"
  >
    <slot name="background" />
    <slot name="container">
      <div
        v-if="$slots.default"
        class="lost-flex-container"
      >
        <slot />
      </div>
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
        return 'div'
      }
    },
    styleType: {
      type: String,
      required: false,
      default () {
        return null
      }
    },

    visible: {
      type: Boolean,
      default () {
        return !!process.browser
      }
    }
  },

  computed: {
    styleClasses () {
      return {
        'js--visible': this.visible,
        ['style-type--' + this.styleType]: this.styleType
      }
    }
  }
}

</script>

<style lang="postcss">
.layouts-default-container {
  margin: 40px 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }

  & .lost-flex-container {
    display: flex;

    @media (min-width: 576px) {
      lost-center: 540px;
    }

    @media (max-width: 575px) {
      padding: 0 $lost-gutter;
    }

    @media (min-width: 768px) {
      lost-center: 720px;
    }

    @media (min-width: 992px) {
      lost-center: 960px;
    }

    @media (min-width: 1200px) {
      lost-center: 1140px;
    }
  }
}
</style>
