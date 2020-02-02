
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
    this.components = getAsyncComponents(this.components)
  },

  head () {
    return {
      title: this.title,
      meta: this.meta || []
    }
  }

}

function getAsyncComponents (componentsData) {
  return componentsData.map((item) => {
    const asyncLoad = () => import('@/components/organisms/' + item.component)
    item.data.options = Object.assign(item.data.options || {}, {
      visible: true
    })
    return {
      component: asyncLoad,
      data: item.data
    }
  })
}

</script>
