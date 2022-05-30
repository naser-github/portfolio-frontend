import Cookie from 'js-cookie'

export const state = () => ({
  authToken: null,
  userId: null,
  userName: null,
  userEmail: null,
  expiredAt: 0,
})

export const actions = {
  // login function
  login(vuexContext, payload) {
    return this.$axios
      .$post('/login', {
        email: payload.email,
        password: payload.password,
      })
      .then((response) => {
        let expirationTime = 0

        if (payload.rememberMe) expirationTime = new Date().getTime() + 24 * 3600 * 1000
        else expirationTime = new Date().getTime() + 2 * 3600 * 1000

        vuexContext.commit('login', {
          authToken: response.token,
          userId: response.user.id,
          userName: response.user.name,
          userEmail: response.user.email,
          expiredAt: expirationTime,
        })

        // saving token & token expiration time in cookies
        Cookie.set('token', response.token)
        Cookie.set('expirationTime', expirationTime)

        // vuexContext.dispatch('setLogoutTimer', expirationTime)
      })
      .catch(function (err) {
        // eslint-disable-next-line no-console
        console.log('log error:', err.response.data.message)

        this.$toast.show({
          type: 'danger',
          title: 'Error',
          message: 'wrong email or password !!',
        })
      })
  },

  // checks middleware
  initAuth(vuexContext, req) {
    let token = null
    let expiredAt = 0

    if (req) {
      if (!req.headers.cookie) {
        return
      }

      const tokenCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith('token='))
      if (!tokenCookie) {
        return
      }
      token = tokenCookie.split('=')[1]

      expiredAt = req.headers.cookie
        .split(';')
        .find((c) => c.trim().startsWith('expirationTime='))
        .split('=')[1]
    } else if (localStorage.key(0)) {
      const auth = JSON.parse(localStorage.getItem('vuex')).auth
      token = auth.authToken
      expiredAt = auth.expiredAt
    }

    if (token && expiredAt > new Date().getTime()) {
      if (!req) {
        // this.$toast.show({
        //   type: 'danger',
        //   title: 'Error',
        //   message: 'already logged in!!',
        // })
      } else {
        console.log('already logged in!!!')
      }
      return 1
    } else {
      vuexContext.commit('logout', expiredAt)
    }
  },

  // logout
  logout(vuexContext) {
    Cookie.remove('token')
    Cookie.remove('expirationTime')

    vuexContext.commit('logout')
    this.$router.replace('/');

    this.$toast.show({
      type: 'success',
      title: 'Success',
      message: 'logged out!!',
    })
  },
}

export const mutations = {
  // save login data
  login(state, payload) {
    state.authToken = payload.authToken
    state.userId = payload.userId
    state.userName = payload.userName
    state.userEmail = payload.userEmail
    state.expiredAt = payload.expiredAt
  },

  // delete login data after certain time || logout
  logout(state) {
    state.authToken = null
    state.userId = null
    state.userName = null
    state.userEmail = null
    state.expiredAt = 0
  },
}

export const getters = {
  isLoggedIn(state) {
    return state.authToken
  },
}
