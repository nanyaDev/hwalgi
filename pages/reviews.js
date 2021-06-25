import { Flex, Heading, Input, Spinner } from '@chakra-ui/react';

import useRequireAuth from '@/lib/useRequireAuth';

const Reviews = () => {
  const auth = useRequireAuth();

  if (!auth.user) {
    return <Spinner />;
  }

  return (
    <Flex h="100vh" direction="column" justify="center" align="center">
      <Heading>Hangul</Heading>
      <Input />
    </Flex>
  );
};

export default Reviews;
