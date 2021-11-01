module.exports = {
  env: {
    es6: true,
  },
  plugins: ['tailwindcss'],
  extends: ['eslint:recommended', 'plugin:tailwindcss/recommended', 'next'],
  rules: {
    'tailwindcss/no-custom-classname': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          // '__tests__/**/*',
          // 'test-utils/index.tsx',
          // '@types/jest-dom.d.ts',
          'next.config.js',
        ],
      },
    ],
  },
}
