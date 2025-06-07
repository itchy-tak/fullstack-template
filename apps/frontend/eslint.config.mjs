import baseConfig from '@takuya-ichikawa/eslint-config-base';
import nextConfig from 'eslint-config-next/core-web-vitals';

const config = [
  { ignores: ['.next/'] },
  ...baseConfig,
  ...nextConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];

export default config;
