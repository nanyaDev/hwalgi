import { Flex, Heading, Text } from '@chakra-ui/react';

import AuthCheck from '@/components/AuthCheck';

const Lessons = () => {
  return (
    <AuthCheck>
      <Flex direction="column" h="100vh" p={12} bg="gray.300">
        <Flex direction="column" justify="center" h="full" p={12} bg="white">
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
      </Flex>
    </AuthCheck>
  );
};

export default Lessons;
