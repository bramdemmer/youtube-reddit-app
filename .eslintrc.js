module.exports = {
  extends: [
    "airbnb-base",
    "plugin:vue/recommended",
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: [
    'vue'
  ],
  rules: {
    "no-console": "off",
    "import/no-extraneous-dependencies": "off",
  }
}
