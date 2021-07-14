import {
  Flex,
  Button,
  Stack,
  Heading,
  Box,
  Text,
  VStack,
} from '@chakra-ui/react';
import NextLink from 'next/link';

const Landing = () => (
  <>
    <Stack spacing={4} isInline justify="flex-end" p={4}>
      <NextLink href="/login" passHref>
        <Button as="a" variant="ghost">
          Log In
        </Button>
      </NextLink>
      <NextLink href="/signup" passHref>
        <Button as="a">Sign Up</Button>
      </NextLink>
    </Stack>
    <Flex grow={1} direction="column" justify="center" align="center">
      <Heading color="gray.700" size="4xl" textAlign="left" m={8}>
        Learn{' '}
        <Box
          as="span"
          bgGradient="linear(to right, blue.600, purple.400, red.500)"
          bgClip="text"
        >
          Korean
        </Box>{' '}
        with <br /> the content you love
      </Heading>
      <Text color="gray.500" fontSize="2xl" textAlign="left">
        An immersion based approach that forgoes the tedious textbooks, <br />
        contrived wordlists, and expensive course fees.
      </Text>
    </Flex>
  </>
);

export default Landing;
