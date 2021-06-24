import Head from 'next/head';
import { Button, Heading, Input, Text, VStack } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

export default function Home() {
  const auth = useAuth();

  // testing code: start
  const handleSignup = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    auth.signup(email, password);
  };

  const handleSignin = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    auth.signin(email, password);
  };
  // testing code: end

  return (
    <div>
      <Head>
        <title>Hwalgi // Development</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* testing code: start */}
      <VStack spacing="24px">
        <Heading>Auth Skeleton</Heading>
        <Text>Signed in as: {auth.user?.email}</Text>
        <form onSubmit={handleSignup}>
          <Input type="email" name="email" />
          <Input type="password" name="password" />
          <Button type="submit">Sign Up</Button>
        </form>
        <form onSubmit={handleSignin}>
          <Input type="email" name="email" />
          <Input type="password" name="password" />
          <Button type="submit">Sign In</Button>
        </form>
        <Button type="button" onClick={() => auth.signout()}>
          Sign Out
        </Button>
      </VStack>
      {/* testing code: end */}
    </div>
  );
}
