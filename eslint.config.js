// eslint.config.js
const { FlatCompat } = require('@eslint/eslintrc')
const js = require("@eslint/js");

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
})

module.exports = [
  ...compat.config({
    env: {
      es6: true,
      jest: true,
    },
    extends: ['eslint:recommended', 'plugin:tailwindcss/recommended', 'next'],
    rules: {
      'tailwindcss/no-custom-classname': 0,
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            'tests/**/*',
            // 'test-utils/index.tsx',
            // '@types/jest-dom.d.ts',
            'next.config.js',
          ],
        },
      ],
      'react/no-unknown-property': [
        'error',
        {
          ignore: ['jsx', 'global'],
        },
      ],
    },
    ignorePatterns: [
      '!.*.js',
      'coverage/**/*',
      '.next/**/*',
    ],
  }),
];
