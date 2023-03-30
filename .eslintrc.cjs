module.exports = {
  root: true,
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
      extends: [
        "eslint:recommended", // TURN ON ESLint recommended rules.
        "airbnb-base", // TURN ON airbnb-base rules.
        "plugin:@typescript-eslint/eslint-recommended", // Disables rules from eslint:recommended which are already handled by TypeScript.
        "plugin:@typescript-eslint/recommended", // TURN ON TypeScript rules by using `typescript-eslint/typescript-eslint`.
        "plugin:import/recommended", // import/export syntax, and prevent issues with misspelling of file paths and import names.
        "plugin:import/typescript", // TypeScript support for plugin:import/recommended. Used `eslint-plugin-i` package instead of `eslint-plugin-import` using syntax `npm:eslint-plugin-i@^2.26.0-2` in package.json.
        "plugin:prettier/recommended", // RUN Prettier as ESLint rule by using `prettier/eslint-plugin-prettier` and TURN OFF ESLint rules which conflict with Prettier by using `prettier/eslint-config-prettier`.
      ],
      plugins: ["@typescript-eslint", "import"],
      settings: {
        //"import/resolver": { typescript: {} },
        "import/resolver": { typescript: true, node: true },
      },
      rules: {
        "import/extensions": ["error", "ignorePackages", { js: "never", jsx: "never", ts: "never", tsx: "never" }],
        "no-useless-constructor": "off",
        "@typescript-eslint/no-useless-constructor": "error",
        "lines-between-class-members": ["warn", "always", { exceptAfterSingleLine: true }],
        "class-methods-use-this": "off",
        "import/prefer-default-export": "off",
      },

      // JEST: Run rules only on test-related files.
      overrides: [
        {
          parserOptions: { project: ["tsconfig.test.json"] },
          files: ["*.spec.ts", "*.test.ts"],
          env: { "jest/globals": true },
          plugins: ["jest"],
          extends: ["plugin:jest/all"],
          rules: {
            "import/extensions": ["error", "ignorePackages", { js: "never", jsx: "never", ts: "never", tsx: "never" }],
            "jest/prefer-expect-assertions": [
              "error",
              { onlyFunctionsWithAsyncKeyword: true, onlyFunctionsWithExpectInLoop: true, onlyFunctionsWithExpectInCallback: true },
            ],
          },
        },
      ],
    },
    {
      files: ["*.js"],
      extends: [
        "eslint:recommended", // TURN ON ESLint recommended rules.
        "plugin:jest/recommended", // TURN ON Jest rules by using "jest-community/eslint-plugin-jest".
        "airbnb-base", // TURN ON airbnb-base rules.
        "plugin:prettier/recommended", // RUN Prettier as ESLint rule by using `prettier/eslint-plugin-prettier` and TURN OFF ESLint rules which conflict with Prettier by using `prettier/eslint-config-prettier`.
      ],
      rules: {
        "import/extensions": ["error", "ignorePackages", { js: "never", jsx: "never", ts: "never", tsx: "never" }],
      },
    },
  ],
};
