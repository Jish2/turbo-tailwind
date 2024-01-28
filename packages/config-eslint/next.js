const base = require("./base");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "plugin:eslint-plugin-storybook/recommended",
    "plugin:eslint-plugin-mdx/recommended",
    // a11y, import, and many other plugins are already included by the below
    // Need to use require.resolve because files names do not start with eslint-config-*
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/next"),
    require.resolve("eslint-config-turbo"),
  ],
  ...base,
};
