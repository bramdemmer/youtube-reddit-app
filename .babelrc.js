const config = require('./webpack.config');

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        debug: config.dev.debugMode,
        useBuiltIns: "usage",
        corejs: 3,
      }
    ]
  ]
};
