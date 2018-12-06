const config = require('./webpack.config');

module.exports = () => ({
  plugins: {
    autoprefixer: {
      browsers: config.browsers,
    },
  },
});
