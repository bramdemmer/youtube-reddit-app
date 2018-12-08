require('dotenv').config();

module.exports = {
  browsers: ['last 2 versions', 'not ie <= 10'],
  entry: {
    main: ['@babel/polyfill', './app/assets/js/index.js'],
  },
  output: {
    path: 'app/dist',
    publicPath: 'dist/',
    filename: 'js/[name].js',
  },
  css: {
    filename: 'css/[name].css',
  },
  images: {
    outputPath: 'images/',
  },
  icons: {
    spriteFilename: 'icons/icons.svg',
  },
  fonts: {
    outputPath: 'fonts/',
  },
  alias: {
  },
  dev: {
    publicPath: '/dist/', // Must have a / at the start and the end of the path
    contentBase: 'app', // The server content base location
    proxy: process.env.PROXY || '',
    host: process.env.DEV_HOST || '0.0.0.0',
    port: process.env.DEV_PORT || 8080,
    openBrowser: process.env.OPEN_BROWSER || false,
    errorsInOverlay: process.env.ERRORS_IN_OVERLAY || true,
    useHMR: true,
    debugMode: process.env.DEBUG_MODE || false,
    desktopNotifications: process.env.DESKTOP_NOTIFICATIONS || false,
    aem: {
      enabled: false,
      targets: process.env.AEM_TARGETS || ['http://admin:admin@localhost:4502', 'http://admin:admin@localhost:4503'],
      watchDir: './app',
      exclude: '**/node_modules/**',
    },
  },
};
