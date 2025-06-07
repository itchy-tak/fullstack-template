import baseConfig from '@takuya-ichikawa/eslint-config-base';

export default [
  { ignores: ['dist/', 'src/__generated__/'] },
  ...baseConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
