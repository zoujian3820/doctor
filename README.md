# kwdoctor

> My wicked Nuxt.js project

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

**添加 sass**

```
yarn add css-loader node-sass postcss-loader sass-loader style-loader -D
```

**添加 husky + commitlint**

```bash
yarn add --save-dev @commitlint/config-conventional @commitlint/cli
yarn add --dev husky
echo > commitlint.config.js
  module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
       'type-enum': [2, 'always', [
                'feat','fix','style','docs','test','refactor', 'chore', 'revert'
              ]]
    }
  };
创建 .huskyrc
"hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
}
```

**添加 vant**

```bash
yarn add vant
yarn add babel-plugin-import less less-loader -D

// webpack
build: {
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
  }
}

// 主题定制, 在build下插入loaders
less-loader不能用6.0，刚升级的有兼容问题，改用5.0
https://github.com/ant-design/ant-design-landing/issues/235

$ yarn remove less-loader
$ yarn add less-loader@5.0.0 -D
$ yarn dev

loaders: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          hack: `true; @import "${resolve(
            './assets/styles/vant_theme_var.less'
          )}";`
        }
      }
    }
```

**添加 rem 支持**

```bash
yarn add postcss-px2rem-exclude lib-flexible -D
```

```
// webpack
build: {
  postcss: [
     require('postcss-px2rem-exclude')({
        remUnit: 37.5,
        exclude: '/node_modules|mint-ui/'
     }),
     require('autoprefixer')
  ]
}

if (process.client) {
  require('lib-flexible/flexible')
}
```

**添加 Ts**

```bash
yarn add @nuxt/typescript-build ts-loader typescript -D
// 新建 tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "node",
    "lib": ["dom","es2016"],
    "target": "es5",
    "allowJs": true
  },
  "exclude": ["node_modules", ".nuxt", "dist"]
}

// webpack
build: {
  extend (config, ctx) {
     config.resolve.extensions.unshift('.ts')
     config.module.rules.push({
        test: /\.(tsx|ts)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
           appendTsSuffixTo: [/\.vue$/]
       }
     })
  }
}

新建 /types/vue-shims.d.ts

import Vue from 'vue'
import VueRouter from 'vue-router'
import { Route } from 'vue-router'
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
// 扩充
declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
    $route: Route
  }
}
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
