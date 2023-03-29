import { extendTheme } from '@chakra-ui/react';
import { accordionAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(accordionAnatomy.keys);

const baseStyle = definePartsStyle({
  button: {
    background: '#EDF2F7',
    color: '#1A202C',
    borderRadius: '0.375rem',
    _hover: {
      background: '#E2E8F0',
      color: '#1A202C',
    },
    _dark: {
      background: 'rgba(255, 255, 255, 0.16)',
      color: '#EDF2F7',
    },
  },
});
const accordionTheme = defineMultiStyleConfig({ baseStyle });

const config = {
  initialColorMode: 'system',
  useSystemColorMode: true,
};

export const theme = extendTheme(
  { config },
  { components: { Accordion: accordionTheme } }
);
