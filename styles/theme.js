import { extendTheme } from '@chakra-ui/react';

const Button = {
  baseStyle: {
    _focus: {
      boxShadow: 'none',
    },
    _focusVisible: {
      boxShadow: 'outline',
    },
  },
};

// removing the focus highlight is really finnicky
// cf. https://github.com/chakra-ui/chakra-ui/issues/2347
const Input = {
  baseStyle: {
    field: {
      _focus: {
        boxShadow: 'none',
        borderColor: 'gray.200',
      },
      _focusVisible: {
        boxShadow: 'none',
        borderColor: 'gray.200',
      },
    },
  },
};

// todo: this removes the focus ring for keyboard users
const Switch = {
  baseStyle: {
    track: {
      _focus: {
        boxShadow: 'none',
      },
      _focusVisible: {
        boxShadow: 'none',
      },
    },
  },
};

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
    Button,
    Input,
    Switch,
  },
});

export default theme;
