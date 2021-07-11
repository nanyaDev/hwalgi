import { Flex, Heading, Input } from '@chakra-ui/react';

import AuthCheck from '@/components/AuthCheck';

const Reviews = () => {
  return (
    <AuthCheck>
      <Flex h="100vh" direction="column" justify="center" align="center">
        <Heading>Hangul</Heading>
        <Input />
      </Flex>
    </AuthCheck>
  );
};

export default Reviews;
