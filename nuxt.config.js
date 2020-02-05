const webpack = require('webpack')
const { join } = require('path')

const environment = require('./environments.js')

console.log("ENVIRONEMENT", environment)


module.exports = {
  mode: 'spa',
  dev: (process.env.NODE_ENV !== 'production'),
  env: {
    APIbaseUrl: environment.config.api,
    STAGE: environment.env
  },
  head: {
    title: 'Silver Mirror - Booking',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      /*
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      */
    ]
  },
  css: [
    { src: '@/assets/scss/base.scss', lang: 'scss' },
  ],
  loading: '~/components/Loading.vue',

  router: {
    base: '/booking/',
    middleware: ['router-auth']
  },
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    
    // Doc: https://bootstrap-vue.js.org/docs/
    'bootstrap-vue/nuxt',
    ['@nuxtjs/google-analytics', {
      id: 'UA-71401735-1', 
      link_attribution: true,
      anonymize_ip: true  
    }],

    // https://www.npmjs.com/package/@netsells/nuxt-hotjar
    ['@netsells/nuxt-hotjar', { 
        id: '1399399', 
        sv: '6',
    }]
  ],
  axios: {
    baseURL: environment.config.api,
    browserBaseURL: environment.config.api
  },
  plugins: [
    { src: '~/plugins/font-awesome' },
    { src: '~/plugins/fullcalendar.js', ssr: false },
    { src: '~/plugins/vue-js-modal', ssr: true },
    { src: '~/plugins/nuxt-client-init.js', ssr: false },
    { src: '~/plugins/vuex-persist', ssr: false },
    { src: `~/plugins/vee-validate`, ssr: true },
    { src: `~/plugins/vue-spinners`, ssr: true },
    { src: `~/plugins/filters`, ssr: true },
    { src: '~/plugins/axios', ssr: false }
  ],

  build: {
    /*
    ** You can extend webpack config here
    */
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.ProvidePlugin({
        '_': 'lodash',
        'moment': 'moment'
      })
    ],
    extend(config, ctx) {
      config.mode = 'development'
    }
  }
}
