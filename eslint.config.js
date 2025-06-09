// eslint.config.js
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
	{
    extends: ['eslint:recommended', 'plugin:tailwindcss/recommended', 'next'],
    plugins: ['tailwindcss', 'import', 'react'],
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
    ignores: [
      '!.*.js',
      'coverage/**/*',
      '.next/**/*',
    ],
	},
]);
