const path = require('path')
const ENV = require('./env')
// const isDev = ENV.env !== 'production'
const resolve = (dir) => path.join(__dirname, dir)

module.exports = {
  mode: 'universal',
  server: {
    host: ENV.host,
    port: ENV.port
  },
  env: {
    baseURL: ENV.baseURL,
    API_URL: ENV.baseURL, // 环境变量 API_URL 可以覆盖 override baseURL设置
    prefix: ENV.prefix
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
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no'
      },
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
  css: ['~/assets/styles/app.scss'],
  styleResources: {
    scss: ['~/assets/styles/init.scss']
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@plugins',
    '@plugins/axios',
    {
      src: '@/plugins/sdk',
      ssr: false
    },
    {
      src: '@/plugins/router',
      ssr: false
    }
  ],
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
  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources'],
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    prefix: ENV.prefix,
    debug: false,
    proxy: true,
    progress: false,
    timeout: 5000,
    responseType: 'json',
    credentials: true
  },
  proxy: {
    [ENV.prefix]: { target: ENV.proxy, pathRewrite: { [`^${ENV.prefix}`]: '' } }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // 添加这个是关键，添加后babel才会处理依赖包vant里面的代码
    transpile: [/vant.*?less/],
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'vant',
            style: (name) => {
              return `${name}/style/less.js`
            }
          },
          'vant'
        ]
      ]
    },
    loaders: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: `true; @import "${resolve('./assets/styles/vantVar.less')}";`
        }
      }
    },
    postcss: [
      require('postcss-px2rem-exclude')({
        remUnit: 37.5,
        exclude: '/node_modules/'
      }),
      require('autoprefixer')
    ],
    extend(config, ctx) {
      config.resolve.extensions.unshift('.ts')
      config.module.rules.push({
        test: /\.(tsx|ts)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      })

      if (ctx.isClient) {
        // 添加 alias 配置
        // Object.assign(config.resolve.alias, {
        //   transformers: path.resolve(__dirname, 'transformers')
        // })
      }
    }
  }
}
