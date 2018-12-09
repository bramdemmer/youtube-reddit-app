const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CssUrlRelativePlugin = require('css-url-relative-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
            loader: 'vue-style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
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
        test: /\.svg$/i,
        include: /icons/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: config.icons.spriteFilename,
            },
          },
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { convertPathData: false },
              ],
            },
          },
        ],
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
            // options: {
            //   publicPath: './',
            // },
          },
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './app/index.html',
    //   filename: './app/index.html',
    //   inject: false,
    // }),
    new VueLoaderPlugin(),
    new SpriteLoaderPlugin({
      plainSprite: true,
    }),
    new StyleLintPlugin({
      fix: true,
    }),
    new CssUrlRelativePlugin(),
    new CleanWebpackPlugin(path.resolve(__dirname, config.output.path), {
      verbose: config.dev.debugMode,
    }),
    new MiniCssExtractPlugin({
      filename: config.css.filename,
    }),
    new CopyWebpackPlugin([{
      from: config.data.filesLocation,
      to: config.data.outputPath,
      flatten: true,
    }]),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
  },
};
