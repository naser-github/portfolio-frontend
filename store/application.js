export const state = () => ({
  applications: [], app: {},
})

export const actions = {

  // index(vuexContext) {
  //   return (
  //     this.app.$axios
  //       .$get('/applications')
  //       .then((data) => {
  //         vuexContext.commit('storeApp', data.application)
  //       })
  //       // eslint-disable-next-line no-console
  //       .catch((err) => console.error(err))
  //   )
  // },

  // create new application
  createApp(vuexContext, payload) {
    const formData = new FormData();
    formData.append('title', payload.title)
    formData.append('website', payload.website)
    formData.append('summary', payload.summary)
    formData.append('app_body', payload.app_body)
    formData.append('thumbnail', payload.thumbnail)
    formData.append('status', payload.status)

    return this.$axios
      .$post('/application', formData, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
          'Content-Type': 'multipart/form-data',
          'Content-type': 'application/json',
        },
      })
      .catch(function (err) {
        console.log('Application Not Created:', err)

        this.$toast.error('something went wrong!!', {
          theme: 'bubble', position: 'top-right', duration: 5000,
        })
      })
  },

  // shows application data on page reload in application view & edit
  onReload(vuexContext, payload) {
    return (this.app.$axios
      .$get(`applications/${payload.param}`)
      .then((res) => {
        vuexContext.commit('onReload', res.application)
      })
      // eslint-disable-next-line no-console
      .catch((err) => console.error(err)))
  },

  // update application data
  updateApp(vuexContext, payload) {

    const formData = new FormData();
    formData.append("_method", "put");
    formData.append('title', payload.title)
    formData.append('website', payload.website)
    formData.append('summary', payload.summary)
    formData.append('app_body', payload.app_body)
    formData.append('thumbnail', payload.thumbnail)
    formData.append('status', payload.status)

    return this.$axios
      .$post(`application/${payload.param}`, formData, {
        headers: {
          Authorization: `Bearer ${payload.token}`,
          'Content-Type': 'multipart/form-data',
          'Content-type': 'application/json',
        },
      })
      .catch(function (err) {
        console.log('Application Not Created:', err)

        this.$toast.error('something went wrong!!', {
          theme: 'bubble', position: 'top-right', duration: 5000,
        })
      })
  },
}

export const getters = {
  // onReload(state){
  //   return state.app;
  // }
}

export const mutations = {
  storeApp(state, payload) {
    state.applications = payload
  }, onReload(state, payload) {
    state.app = payload
  }
}
