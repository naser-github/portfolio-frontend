export const state = () => ({})

export const actions = {
  // use nuxt init
  // nuxtServerInit(vuexContext, context) {
  //   return context.app.$axios
  //     .$get('/applications')
  //     .then((data) => {
  //       vuexContext.commit('storeApp', data.application)
  //     })
  //     .catch((err) => context.error(err))
  // },

  carousalIndex(vuexContext, payload) {
    return (
      this.app.$axios
        .$get(`applications/partial-index/${payload.carousalStat}`)
        .then((res) => {
          vuexContext.commit('storeApp', res.application)
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err))
    )
  },
}

export const getters = {}

export const mutations = {
  storeApp(state, payload) {
    state.carousalApplications = payload
  },


}
