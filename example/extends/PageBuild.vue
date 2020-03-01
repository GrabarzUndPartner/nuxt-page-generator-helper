
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

  async asyncData ({ $getGeneratorRouteData }) {
    const data = Object.assign({}, await $getGeneratorRouteData())
    if ('components' in data) {
      data.components = data.components.map((component, index) => {
        component.data.options = component.data.options || {}
        if (index < 2) {
          component.data.options = Object.assign(component.data.options, {
            visible: true
          })
        }
        return component
      })
    }
    return data
  },

  data () {
    return {
      title: null,
      meta: null,
      components: []
    }
  },

  head () {
    return {
      title: this.title,
      meta: this.meta || []
    }
  }

}

</script>
