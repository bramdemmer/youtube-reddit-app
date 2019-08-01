
Todo General:
- compare eslint and babel versions/setup with the vue-cli version
- deal with relative paths and aliases. check: https://github.com/storybooks/storybook/issues/3339
- replace sass with post-css only with postcss env presets
see this design system https://medium.com/codyhouse/create-your-design-system-part-1-typography-7c630d9092bd
- more about code splitting: https://hackernoon.com/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
- check if the global public path still works with different folder structure. Otherwise disable it.
- remove unused packages in package.json
- check if     // new webpack.optimize.ModuleConcatenationPlugin(), helps create smaller bundle size with lots of JS.


`npm install -g npm-check`

`npm-check --skip-unused -u` to update packages

To check VueJS Specific:
- vue integration
- `eslint-plugin-vue` for vue linting
- `vue-hot-reload-api` hot module reloading for vuejs.

- use the html webpack plugin (when working headless...)
  const HtmlWebpackPlugin = require('html-webpack-plugin');
    // new HtmlWebpackPlugin({
    //   template: './app/vue/vue-index.html',
    //   filename: './vue-index.html',
    //   inject: true,
    // }),

Todo multibrand:
- create multibrand version

To check/test:
- prettier : https://prettier.io/docs/en/eslint.html
- add url-loader for small images
- Test the difference between `babel-minify-webpack-plugin` and `uglifyjs-webpack-plugin`
- Eventually add hashes `-[hash:8]` to files.
- go through [all webpack loaders](https://webpack.js.org/loaders/)
- go through [all webpack plugins](https://webpack.js.org/plugins/)
- const HtmlCriticalPlugin = require('html-critical-webpack-plugin');
- critical CSS

favicons:
````javascript

      {
        test: /\.(svg|png|ico|xml|json|webmanifest)$/,
        loader: 'file-loader',
        include: /favicons/,
        options: {
          name: '[name].[ext]',
          outputPath: './../favicons',
        },
      },
````
