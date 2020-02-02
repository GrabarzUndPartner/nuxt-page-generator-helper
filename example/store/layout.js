
export const state = () => ({
  data: {}
})

export const mutations = {
  data (state, value) {
    state.data = value
  }
}

export const getters = {
  data (state) {
    return state.data
  }
}

export const actions = {
  setData (context, value) {
    context.commit('data', value)
  }
}
