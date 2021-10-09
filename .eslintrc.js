module.exports = {
  "settings": {
    version: "17.0.1"
  },
  'env': {
    'browser': true,
    'es6': true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    '@typescript-eslint',
  ],
  'rules': {
    'require-jsdoc' : 0
  }
};
