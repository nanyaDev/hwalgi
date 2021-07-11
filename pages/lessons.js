import { Flex, Heading, Text } from '@chakra-ui/react';

import AuthCheck from '@/components/AuthCheck';

const Lessons = () => {
  return (
    <AuthCheck>
      <Flex direction="column" grow={1} h="full" p={12} m={12} bg="gray.200">
        <Flex grow={1} direction="column" justify="center" align="center">
          <Heading>Hangul</Heading>
          <Text>English</Text>
        </Flex>
        <Flex grow={2}>
          <Flex grow={2}>
            <Text>Mnemonic</Text>
          </Flex>
          <Flex grow={1}>
            <Text>Mouth Shape</Text>
          </Flex>
        </Flex>
      </Flex>
    </AuthCheck>
  );
};

export default Lessons;
