module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    "eslint:recommended",
    'plugin:react/recommended',
    'plugin:import/recommended',
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    'eslint-config-prettier',
  ],
  plugins: [ 'simple-import-sort' ],
  settings: {
    react: {
      // Tells eslint-plugin-react to automatically detect the version of React to use.
      version: 'detect',
    },

    // Tells eslint how to resolve imports
    'import/resolver': {
      alias: {
        extensions: [ ".js", ".jsx" ],
        map: [
          [ "@", "./src/" ],
        ],
      },
    },
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
  },
};