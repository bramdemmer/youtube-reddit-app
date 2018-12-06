const webpack = require('webpack');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common');
const config = require('./webpack.config');


module.exports = merge(common, {
  mode: 'production',
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.(png|svg|jp(e*)g|gif)$/,
        exclude: /icons/,
        loader: 'image-webpack-loader',
        // Specify enforce: 'pre' to apply the loader
        // before url-loader/svg-url-loader
        // and not duplicate it in rules with them
        enforce: 'pre',
      },
    ],
  },
  plugins: [
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        discardComments: { removeAll: true },
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        output: {
          comments: false,
        },
        compress: {
          drop_console: true,
        },
      },
    }),
  ],
});


if (config.dev.debugMode) {
  console.log('DEBUG MODE: Enabled.');
  module.exports.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'webpack-bundle-report.html',
  }));
}
