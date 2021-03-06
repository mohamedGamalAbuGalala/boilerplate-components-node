module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    semi: 'error',
    'no-param-reassign': 'warn',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'error',
    'prefer-destructuring': 'off',
    'max-len': 'off',
    'no-this-before-super': 'off',
    'class-methods-use-this': 'off',
    'no-unused-expressions': 'off',
    'comma-dangle': 'off',
    'arrow-parens': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
    'nonblock-statement-body-position': 'off',
    curly: 'off',
    'no-use-before-define': 'off',
    'linebreak-style': 'off',
  },
};
