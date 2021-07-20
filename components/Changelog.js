import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const Changelog = () => {
  // code
  return (
    <Flex
      direction="column"
      justify="flex-start"
      align="center"
      w="md"
      bg="white"
      boxShadow="base"
      rounded="md"
      p={4}
      ml={6}
    >
      <Heading alignSelf="flex-start" size="sm" color="gray.600">
        Changelog
      </Heading>
    </Flex>
  );
};

export default Changelog;
