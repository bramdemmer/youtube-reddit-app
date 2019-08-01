const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const WebpackNotifierPlugin = require('webpack-notifier');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = require('./webpack.config');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, config.dev.contentBase),
    publicPath: config.dev.publicPath,
    open: config.dev.openBrowser,
    port: config.dev.port,
    stats: config.dev.debugMode ? 'normal' : 'minimal',
    useLocalIp: true,
    host: config.dev.host,
    overlay: config.dev.errorsInBrowserOverlay,
    watchContentBase: true,
    clientLogLevel: 'warning',
    hot: config.dev.hmr.enabled,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new CopyWebpackPlugin([{
      from: config.images.filesLocation,
      to: config.images.outputPath,
      flatten: true,
    }]),
  ],
});

if (config.dev.desktopNotifications) {
  module.exports.plugins.push(
    new WebpackNotifierPlugin({
      title: 'Webpack',
      excludeWarnings: true,
      alwaysNotify: false,
      skipFirstNotification: true,
    }),
  );
}
