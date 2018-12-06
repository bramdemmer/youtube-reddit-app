const config = require('./webpack.config');

module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {
          browsers: config.browsers
        },
        debug: config.dev.debugMode,
        useBuiltIns: "usage",
      }
    ]
  ]
};
