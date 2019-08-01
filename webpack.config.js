require('dotenv').config();
// import "core-js/stable";
// import "regenerator-runtime/runtime";
module.exports = {
  entry: {
    main: ['core-js/stable', 'regenerator-runtime/runtime', './app/assets/js/index.js'],
  },
  output: {
    path: 'app/dist',
    publicPath: 'dist/',
    filename: 'js/[name].js',
  },
  css: {
    filename: 'css/main.css',
  },
  images: {
    filesLocation: './app/assets/images/',
    outputPath: 'images/',
  },
  icons: {
    filesLocation: './app/assets/**/icons/*.svg',
    spriteFilename: 'icons/icons.svg',
  },
  fonts: {
    outputPath: 'fonts/',
  },
  alias: {
    vue$: 'vue/dist/vue.esm.js',
  },
  dev: {
    publicPath: '/dist/', // Make sure devServer.publicPath always starts and ends with a forward slash.
    contentBase: 'app', // The server content base location. It is recommended to use an absolute path.
    proxy: process.env.PROXY || '',
    host: process.env.DEV_HOST || '0.0.0.0',
    port: process.env.DEV_PORT || 8081,
    openBrowser: process.env.OPEN_BROWSER || false,
    errorsInBrowserOverlay: process.env.ERRORS_IN_BROWSER_OVERLAY || true,
    hmr: {
      enabled: true,
      clientLogLevel: 'info',
    },
    debugMode: process.env.DEBUG_MODE || false,
    desktopNotifications: process.env.DESKTOP_NOTIFICATIONS || true,
  },
};
