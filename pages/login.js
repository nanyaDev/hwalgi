import { Box, Button, Flex, Heading, Input } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

const Login = () => {
  const auth = useAuth();

  const handleLogin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    auth.signin(email, password);
  };

  return (
    <Flex justify="center" h="100vh">
      <Flex direction="column" grow={1} justify="center" align="center">
        <Heading>Welcome Back!</Heading>
      </Flex>
      <Flex direction="column" grow={1} justify="center" align="center">
        <Box as="form" onSubmit={handleLogin}>
          <Input type="email" name="email" placeholder="Email" />
          <Input type="password" name="password" placeholder="Password" />
          <Button type="submit">Log In</Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
