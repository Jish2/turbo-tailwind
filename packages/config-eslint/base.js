const { resolve } = require("node:path");
const { JAVASCRIPT_FILES, TYPESCRIPT_FILES } = require("./constants");

const project = resolve(process.cwd(), "tsconfig.json");

/*
 * This is a custom ESLint configuration for use a library
 * that utilizes React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

/** @type {import("eslint").Linter.Config} */
module.exports = {
  // extends: ["eslint:recommended", "prettier", "eslint-config-turbo"],
  // Use extends in each config individually, as several of te vercel/style-guide configs already contain prettier etc.
  plugins: ["only-warn"],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  parserOptions: {
    project,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".js", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        project,
      },
      // exports: {
      // Accepts the same options as the `resolve.exports` package
      // See: https://github.com/lukeed/resolve.exports#optionsunsafe
      // },
      node: {
        // Not needed, default: ".ts", ".tsx", ".d.ts", ".js", ".jsx", ".json", ".node"
        // `.mts`, `.cts`, `.d.mts`, `.d.cts`, `.mjs`, `.cjs` are not included because `.cjs` and `.mjs` must be used explicitl
        extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx"],
      },
    },
    // By default, all packages from node_modules are treated as external,
    // including monorepo packages. For example, if for whatever reason you import these
    // external modules without adding them as a dependency, you get an error.
    // That is one of the rules controlled by the import plugin: import/no-extraneous-dependencies
    // Plugin info and rule list: https://github.com/import-js/eslint-plugin-import/blob/main/README.md
    // It is generally ok to not accept importing externals not listed as dependency (e.g. packages/ui).
    // However, that causes issues in monorepo package where we have components that are meant for importing into main app.
    // E.g. packages/ui, where we import modules that are not listed as dependencies at all.
    // To fix that, we mark all packages in monorepo as internal with below regex.
    // This does not solve the issue of next and styled-component modules in packages/ui throwing errors,
    // but it will avoid issues if we try to import other monorepo packages there without adding them to packages/ui dependendies.
    // Downside: We might forget to add it as a dependency, and by default pnpm will not make it accessible.
    // So, it SHOULD throw an error, and we SHOULD NOT use the setting below.
    // "import/internal-regex": "^@nfront/",

    // We use import/ignore setting in ackages/ui eslintrc.js, to ignore packages installed in the main app.

    // enable Next (and other custom) components to be checked
    // see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y?tab=readme-ov-file#configurations
    "jsx-a11y": {
      polymorphicPropName: "component",
      components: {
        Button: "button",
        Icon: "svg",
        IconButton: "button",
        Image: "img",
        Input: "input",
        Link: "a",
        List: "ul",
        ListItem: "li",
        ListItemButton: "button",
        ListDivider: "li",
        NextImage: "img",
        NextLink: "a",
        SvgIcon: "svg",
        Textarea: "textarea",
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    ".*.js",
    "node_modules/",
    "dist/",
  ],
  // add rules configurations here
  rules: {
    // Most components should not use default exports. See overrides for exceptions.
    // "import/no-default-export": "off",

    // Such that @/* imports will not be considered as external dependencies
    "import/no-extraneous-dependencies": ["error", { includeTypes: true }],
    "react/function-component-definition": [
      "warn",
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    // sort import statements
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc" },
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "styled-components",
            group: "builtin",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react", "styled-components"],
      },
    ],
    // sort named imports within an import statement
    "sort-imports": ["warn", { ignoreDeclarationSort: true }],
  },
  overrides: [
    {
      // Force ESLint to detect .tsx files
      files: ["*.js?(x)", "*.ts?(x)"],
    },
    /**
     * JS files are using @babel/eslint-parser, so typed linting doesn't work there.
     * @see {@link https://typescript-eslint.io/linting/typed-linting#how-can-i-disable-type-aware-linting-for-a-subset-of-files}
     */
    {
      files: JAVASCRIPT_FILES,
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
    },
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: [require.resolve("@vercel/style-guide/eslint/jest")],
    },
    {
      files: TYPESCRIPT_FILES, // TypeScript files only
      rules: {
        "@typescript-eslint/consistent-type-imports": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-confusing-void-expression": [
          "error",
          { ignoreArrowShorthand: true },
        ],
        "@typescript-eslint/no-shadow": "off",
        "@typescript-eslint/no-misused-promises": [
          "error",
          { checksVoidReturn: false },
        ],
      },
    },
    // Varies file convention from libraries, e.g. Next.js App Router and Prettier
    // Must use default export
    {
      files: [
        ".prettierrc.@(ts|tsx|js|jsx|mjs|cjs)",
        "lint-staged.config.@(ts|tsx|js|jsx|mjs|cjs)",
        "next.config.?(m|c)[jt]s?(x)",
        "**/app/page.[jt]s?(x)",
        "**/app/**/layout.@(ts|tsx|js|jsx|mjs|cjs)",
        "**/app/**/not-found.@(ts|tsx|js|jsx|mjs|cjs)",
        "**/app/**/*error.@(ts|tsx|js|jsx|mjs|cjs)",
        "**/app/**/opengraph-image.@(ts|tsx|js|jsx|mjs|cjs)",
        "**/app/sitemap.@(ts|tsx|js|jsx|mjs|cjs)",
        "**/app/robots.@(ts|tsx|js|jsx|mjs|cjs)",
        "*.stories.@(ts|tsx|js|jsx|mjs|cjs)",
        "*.storybook/*.@(ts|tsx|js|jsx|mjs|cjs)",
      ],
      rules: {
        "import/no-default-export": "off",
        "import/prefer-default-export": ["error", { target: "any" }],
      },
    },
    // module declarations
    {
      files: ["**/*.d.ts"],
      rules: { "import/no-default-export": "off" },
    },
    {
      // or whatever matches stories specified in .storybook/main.js
      files: ["*.stories.@(ts|tsx|js|jsx|mjs|cjs)"],
      rules: {
        // example of overriding a rule
        // 'storybook/hierarchy-separator': 'error',
        // example of disabling a rule
        // 'storybook/default-exports': 'off',
      },
    },
  ],
};
