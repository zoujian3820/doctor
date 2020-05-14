const isDev = !(process.env.NODE_ENV === 'production')
module.exports = {
  mode: 'universal',
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  router: {
    base: '/kwdoctor/'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@plugins'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios'],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    prefix: isDev ? '/api/' : '/',
    debug: false,
    proxy: true,
    progress: false,
    timeout: 5000,
    responseType: 'json',
    credentials: true
  },
  proxy: {
    '/api/': { target: 'http://localhost:6484', pathRewrite: { '^/api/': '' } }
    // '/api/': { target: 'http://localhost:3000', pathRewrite: { '^/api/': '' } }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
}
