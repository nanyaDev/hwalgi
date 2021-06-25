import { Flex, Heading, Spinner, Text } from '@chakra-ui/react';

import useRequireAuth from '@/lib/useRequireAuth';

const Lessons = () => {
  const auth = useRequireAuth();

  if (!auth.user) {
    return <Spinner />;
  }

  return (
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
  );
};

export default Lessons;
