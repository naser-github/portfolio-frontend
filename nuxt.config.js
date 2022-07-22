export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'product-development', htmlAttrs: {
      lang: 'en'
    },
    meta: [{
      charset: 'utf-8'
    },
      {
        name: 'viewport', content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description', name: 'description', content: ''
      },
      {
        name: 'format-detection', content: 'telephone=no'
      }],
    link: [
      {
        rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'
      }
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {}, autoprefixer: {}
      }
    }
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxt/postcss8', // 'bootstrap-vue/nuxt'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/layouts/global.css',
    '@/assets/css/main.css',
    '@/assets/css/laravel-vue-pagination.css'
  ],

  env: {
    backendUrl: 'http://team-portfolio.dev/image/' // localhost
    // backendUrl: 'http://127.0.0.1:8000/image/' // localhost
    // backendUrl: 'http://192.168.31.232:80/image/' // home-ip
    // backendUrl: 'http://30.216.141.146:80/image/' // office-ip
  },

  // customize progress bar
  loading: {
    color: '#f85604', height: '2px', duration: 5000
  },


  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', ['nuxt-tailvue', {toast: true}]],

  // <--module components start

  axios: {
    baseURL: 'http://team-portfolio.dev/api/' // localhost
    // baseURL: 'http://127.0.0.1:8000/api/' // localhost
  },

  // module components end -->

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{src: '~/plugins/persistedState.client.js'}, {src: "~/plugins/laravel-vue-pagination.js"}, {src: '~/plugins/flowbite.client.ts'}],

  router: {
    linkActiveClass: 'active'
  },

  // creates public server
  // server: {
  //   host: '0' // default: localhost
  // }
}
