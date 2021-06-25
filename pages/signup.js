import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

const Signup = () => {
  const auth = useAuth();

  const handleSignup = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    auth.signup(email, password);
  };

  return (
    <Flex justify="center" h="100vh">
      <Flex direction="column" grow={1} justify="center" align="center">
        <Heading>Join the Club!</Heading>
      </Flex>
      <Flex direction="column" grow={1} justify="center" align="center">
        <Box as="form" onSubmit={handleSignup}>
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <Button type="submit">Sign Up</Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Signup;
