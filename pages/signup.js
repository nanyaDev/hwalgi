import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// prettier-ignore
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import schema from '@/utils/schema';

const Signup = () => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async ({ email, password }) => {
    // ? why do these logs say isSubmitting is false
    // console.log(isSubmitting);
    // setTimeout(() => console.log('here', isSubmitting), 2500);

    // return await new Promise((resolve) => {
    //   setTimeout(() => resolve(), 5000);
    // });

    // note - either of these prevent on submit from immediately returning
    // return auth.signup(email, password);
    await auth.signup(email, password);
  };

  // todo - review form and client side validation
  // ? is the htmlFor label required
  // ? is type="text" > type="email" to prevent double vaidation
  // ? is client side validation even necessary
  return (
    <Flex justify="center" h="100vh">
      <Flex direction="column" grow={1} justify="center" align="center">
        <Heading>Join the Club!</Heading>
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
              mb={2}
              id="password"
              type="password"
              {...register('password')}
              placeholder="•••••••"
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <Button mt={4} isLoading={isSubmitting} type="submit">
            Sign Up
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Signup;
