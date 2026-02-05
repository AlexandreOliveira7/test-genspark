module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    "vuetify",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2021,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "vue"],
  rules: {
    quotes: ["error", "single"],
    semi: ["error", "always"],
    "vue/multi-word-component-names": "off",
  },
};
