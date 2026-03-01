import baseConfig from '@takuya-ichikawa/eslint-config-base';

export default [
  { ignores: ['dist/', 'scripts/', 'src/__generated__/'] },
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
