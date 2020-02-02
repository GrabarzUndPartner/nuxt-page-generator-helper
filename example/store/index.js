export const actions = {
  async nuxtServerInit ({ dispatch }, { $getGeneratorLayoutData }) {
    dispatch('layout/setData', await $getGeneratorLayoutData())
  }
}
