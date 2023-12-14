module.exports = {
  extends: ["@repo/eslint-config/react.js"],
  rules: {
    "import/no-unresolved": [
      2,
      {
        ignore: ["styled-components"],
      },
    ],
  },
};
