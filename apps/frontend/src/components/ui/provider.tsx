'use client';

import { ChakraProvider, createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';

const config = defineConfig({
  globalCss: {
    'html, body': {
      backgroundColor: 'gray.50',
    },
  },
});

const system = createSystem(defaultConfig, config);

export function Provider(props: ColorModeProviderProps): ReactNode {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
