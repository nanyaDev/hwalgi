import NextLink from 'next/link';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// prettier-ignore
import { Box, Button, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Text, useToast, } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import schema from '@/utils/schema';
import GradientBar from '@/components/GradientBar';
import AuthCheck from '@/components/AuthCheck';

const Login = () => {
  const auth = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });
  const toast = useToast();

  const onSubmit = async ({ email, password }) => {
    try {
      await auth.signin(email, password);
    } catch (error) {
      console.log(error);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    }
  };

  return (
    <AuthCheck isRequired={false}>
      <GradientBar />
      <Flex grow={1} justify="center">
        <Flex direction="column" w="50%" justify="center" align="center">
          <Image src="/login.svg" width={500} height={500} alt="" />
        </Flex>
        <Flex direction="column" w="50%" justify="center" align="center">
          <Heading color="gray.700" m={4}>
            Welcome Back! 👋
          </Heading>
          <Box
            as="form"
            w="sm"
            border="1px"
            borderColor="gray.50"
            rounded="lg"
            boxShadow="md"
            bg="white"
            p={6}
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormControl isInvalid={errors.email}>
              <FormLabel id="email-label" htmlFor="email">
                Email
              </FormLabel>
              <Input
                mb={2}
                id="email"
                type="text"
                {...register('email')}
                placeholder="example@domain.com"
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
            <Button
              mt={4}
              w="full"
              colorScheme="blue"
              isLoading={isSubmitting}
              type="submit"
            >
              Log In
            </Button>
          </Box>
          <Text mt={4} fontSize="sm" fontWeight="medium" color="gray.600">
            Don&#39;t have an account?{' '}
            <NextLink href="/signup" passHref>
              <Link color="red.600">Sign Up!</Link>
            </NextLink>
          </Text>
        </Flex>
      </Flex>
    </AuthCheck>
  );
};

export default Login;
