import { Box, Button, Flex, Input, Kbd, Switch, Text } from '@chakra-ui/react';

import AuthCheck from '@/components/AuthCheck';
import Navbar from '@/components/Navbar';

// todo: abstract background to shell
const Lessons = () => {
  return (
    <AuthCheck>
      <Navbar />
      <Shell>
        <Card>
          <Box>
            <Text
              fontSize="6xl"
              fontWeight="medium"
              color="gray.600"
              textAlign="center"
              mb={6}
            >
              활기
            </Text>
            <Input
              size="lg"
              variant="flushed"
              textAlign="center"
              mb={12}
              placeholder="Your Response"
            />
          </Box>
          <Buttons />
        </Card>
      </Shell>
    </AuthCheck>
  );
};

const Shell = ({ children }) => (
  <Flex
    grow={1}
    direction="column"
    justify="center"
    align="center"
    bg="gray.50"
  >
    {children}
  </Flex>
);

const Card = ({ children }) => (
  <Flex
    h="450px"
    w="700px"
    direction="column"
    bg="white"
    borderRadius="xl"
    boxShadow="base"
    border="1px"
    borderColor="gray.100"
  >
    <Flex justify="space-between" p={4}>
      <Switch size="sm" />
      <Text fontSize="md" fontWeight="bold" color="gray.500">
        Recall
      </Text>
      <Text fontSize="sm" fontWeight="bold" color="gray.400">
        19/82
      </Text>
    </Flex>
    <Flex grow={1} px={32} pb={8} direction="column" justify="center">
      {children}
    </Flex>
  </Flex>
);

const Buttons = () => (
  <Flex justify="space-between">
    <Button variant="ghost" border="1px" colorScheme="purple">
      Retry <Kbd ml={2}>Esc</Kbd>
    </Button>
    <Button variant="ghost" border="1px" colorScheme="blue">
      Submit <Kbd ml={2}>↵</Kbd>
    </Button>
  </Flex>
);

export default Lessons;
