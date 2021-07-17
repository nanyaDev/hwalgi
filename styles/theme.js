import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
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
  fonts: {
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`,
  },
  components: {
    Button: {
      baseStyle: {
        _focus: {
          boxShadow: 'none',
        },
        _focusVisible: {
          boxShadow: 'outline',
        },
      },
    },
  },
});

export default theme;
