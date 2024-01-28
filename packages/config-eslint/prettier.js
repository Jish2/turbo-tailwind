const vercelPrettierOptions = require("@vercel/style-guide/prettier");

/** @type {import('prettier').Options} */
module.exports = {
  ...vercelPrettierOptions,
  plugins: [...vercelPrettierOptions.plugins, "prettier-plugin-prisma"],
  // Override Vercel's options
  singleQuote: false,
};
