module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
    'jest': true,
    'webextensions': true,
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'next/core-web-vitals',
  ],
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    },
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'plugins': [
    'react',
    'jest',
    'cypress',
  ],
  'rules': {
    'react/display-name': 'off',
    'max-len': ['error', { 'code': 150 }],
    'object-curly-spacing': ['error', 'always'],
    'quote-props': 'off',
    'require-jsdoc': 'off',
    'arrow-parens': 'off',
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'import/no-unresolved': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/no-unstable-nested-components': 'off',
    'no-new': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react/jsx-no-bind': 'off',
    'no-nested-ternary': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
  },
  'overrides': [
    {
      'files': ['*.cy.js'],
      'extends': [
        'plugin:cypress/recommended',
      ],
      'rules': {
        'no-unused-expressions': 0,
      },
    },
    {
      'files': ['*.test.js', '__tests__/*', '__mocks__/*'],
      'extends': [
        'plugin:jest/recommended',
      ],
      'rules': {
        'jest/no-mocks-import': 'off',
      },
    },
  ],
};
