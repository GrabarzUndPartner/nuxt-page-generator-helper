export const actions = {
  async nuxtServerInit ({ dispatch }, { $getVirtualContentLayout }) {
    dispatch('layout/setData', await $getVirtualContentLayout())
  }
}
