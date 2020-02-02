
<template>
  <div>
    <component
      :is="item.component"
      v-for="(item, index) in components"
      :key="index"
      v-bind="item.data"
    />
  </div>
</template>

<script>

export default {

  asyncData ({ $getGeneratorRouteData }) {
    return $getGeneratorRouteData()
  },

  data () {
    return {
      title: null,
      meta: null,
      components: []
    }
  },

  created () {
    this.components = this.components.map((component, index) => {
      component.data.options = component.data.options || {}
      if (index < 2) {
        component.data.options = Object.assign(component.data.options, {
          visible: true
        })
      }
      return component
    })
  },

  head () {
    return {
      title: this.title,
      meta: this.meta || []
    }
  }

}

</script>
