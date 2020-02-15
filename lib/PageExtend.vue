<template>
  <div>{{ $data }}</div>
</template>
<script>
export default {
  asyncData ({ $getGeneratorRouteData, error }) {
    return $getGeneratorRouteData().then(module => module.default).catch(() => {
      error({ statusCode: 404, message: 'virtual content module not found' })
    })
  }
}
</script>
