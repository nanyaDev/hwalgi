import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    // GitHub system font stack
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`,
  },
});

export default theme;
