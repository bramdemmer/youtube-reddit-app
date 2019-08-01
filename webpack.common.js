const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');


const config = require('./webpack.config');

module.exports = {
  entry: config.entry,
  output: {
    filename: config.output.filename,
    path: path.resolve(__dirname, config.output.path),
    publicPath: config.output.publicPath,
  },
  resolve: {
    alias: config.alias,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          emitError: true,
          emitWarning: true,
          fix: true,
        },
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: (process.env.NODE_ENV === 'development' && config.dev.hmr.enabled) ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: process.env.NODE_ENV === 'development',
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: process.env.NODE_ENV === 'development' ? 'inline' : false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: process.env.NODE_ENV === 'development',
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        exclude: /icons/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: config.images.outputPath,
          },
        }],
      },
      {
        test: /\.(ttf|eot|woff2?)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: config.fonts.outputPath,
          },
        }],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
          {
            loader: 'extract-loader',
          },
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new SVGSpritemapPlugin(config.icons.filesLocation, {
      sprite: {
        prefix: false,
      },
      output: {
        filename: config.icons.spriteFilename,
      },
    }),
    new StyleLintPlugin({
      fix: true,
    }),
    new CssUrlRelativePlugin(),
    new CleanWebpackPlugin({
      verbose: config.dev.debugMode,
    }),
    new MiniCssExtractPlugin({
      filename: config.css.filename,
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
  },
};

if (config.dev.debugMode) {
  console.info('DEBUG MODE: ✔️');
  module.exports.plugins.push(new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    reportFilename: 'webpack-bundle-report.html',
  }));
}
