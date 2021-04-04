
module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "jest"],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier",
      "prettier/@typescript-eslint",
    ],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
    env: {
      "jest/globals": true,
      node: true,
    },
  };