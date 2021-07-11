import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`,
  },
  styles: {
    global: {
      html: {
        scrollBehavior: 'smooth',
      },
      '#__next': {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      },
    },
  },
});

export default theme;
