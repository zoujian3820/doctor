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

```
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

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
