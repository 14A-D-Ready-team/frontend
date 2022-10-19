module.exports = {
  root: true,
  ignorePatterns: ["projects/**/*", ".eslintrc.json"],
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: ["tsconfig.json", "e2e/tsconfig.json"],
        createDefaultProgram: true,
      },
      extends: [
        "plugin:@angular-eslint/ng-cli-compat",
        "plugin:@angular-eslint/ng-cli-compat--formatting-add-on",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      plugins: ["@typescript-eslint/eslint-plugin", "prettier"],
      rules: {
        "@angular-eslint/component-class-suffix": [
          "error",
          {
            suffixes: ["Page", "Component"],
          },
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            type: "element",
            prefix: "app",
            style: "kebab-case",
          },
        ],
        "@angular-eslint/directive-selector": [
          "error",
          {
            type: "attribute",
            prefix: "app",
            style: "camelCase",
          },
        ],
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-empty-function": ["warn"],
        "prettier/prettier": "off",
        "prefer-arrow/prefer-arrow-functions": "off",
      },
    },
    {
      files: ["*.html"],
      extends: ["plugin:@angular-eslint/template/recommended"],
      rules: {},
    },
  ],
};
