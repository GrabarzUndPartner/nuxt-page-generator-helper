<template>
  <div>{{ $data }}</div>
</template>
<script>

export default {

  asyncData ({ $getGeneratorRouteData }) {
    return $getGeneratorRouteData()
  }

}

</script>
