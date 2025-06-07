import baseConfig from '@takuya-ichikawa/eslint-config-base';

export default [
  { ignores: ['dist/'] },
  ...baseConfig,
  {
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
    },
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
