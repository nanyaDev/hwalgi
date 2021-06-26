import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// prettier-ignore
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import schema from '@/utils/schema';

const Login = () => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ email, password }) => {
    await auth.signin(email, password);
  };

  return (
    <Flex justify="center" h="100vh">
      <Flex direction="column" grow={1} justify="center" align="center">
        <Heading>Welcome Back!</Heading>
      </Flex>
      <Flex direction="column" grow={1} justify="center" align="center">
        <Box as="form" w="sm" onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email}>
            <FormLabel id="email-label" htmlFor="email">
              Email
            </FormLabel>
            <Input
              mb={2}
              id="email"
              type="text"
              {...register('email')}
              placeholder="your.email@myspace.com"
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormLabel id="password-label" htmlFor="password">
              Password
            </FormLabel>
            <Input
              id="password"
              mb={2}
              type="password"
              {...register('password')}
              placeholder="•••••••"
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button mt={4} isLoading={isSubmitting} type="submit">
            Log In
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Login;
