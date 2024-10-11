module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  plugins: [],
  globals: {
    wp: true,
    window: true,
    document: true,
  },
  env: {
    node: true,
    es6: true,
    browser: true,
    amd: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  settings: {

  },
  plugins: ['jsdoc'],
  rules: {
    strict: 0,
    'no-console': 0,

    'no-extra-semi': 0,
    quotes: [
      'error',
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'ignore',
      },
    ],
  },
};
