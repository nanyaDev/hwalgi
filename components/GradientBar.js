import { Box } from '@chakra-ui/react';

const GradientBar = () => {
  return (
    <Box
      bgGradient="linear(to-r, blue.600, purple.400, red.500)"
      w="full"
      h="15px"
    />
  );
};

export default GradientBar;
