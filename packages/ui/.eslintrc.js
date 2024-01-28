const { EXTERNALS } = require('./constants.js');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/react.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.lint.json",
  },
  settings: {
    // Ignore packages installed in main app.
    "import/ignore": [...EXTERNALS]
  },
  rules: {
    // import/no-unresolved has its own ignore rule, so this is also needed:
    "import/no-unresolved": ["error", { ignore: [...EXTERNALS] }],
  }
};
