import { Flex, Button, Stack, Heading } from '@chakra-ui/react';
import NextLink from 'next/link';

const Landing = () => (
  <Flex direction="column" h="100vh">
    <Stack spacing={4} isInline justify="flex-end" p={4}>
      <NextLink href="/login" passHref>
        <Button as="a">Log In</Button>
      </NextLink>
      <NextLink href="/signup" passHref>
        <Button as="a">Sign Up</Button>
      </NextLink>
    </Stack>
    <Flex h="full" justify="center" align="center">
      <Heading>Welcome to Hwalgi</Heading>
    </Flex>
  </Flex>
);

export default Landing;
