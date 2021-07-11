import { Flex, Heading, Input } from '@chakra-ui/react';

import AuthCheck from '@/components/AuthCheck';

const Reviews = () => {
  return (
    <AuthCheck>
      <Heading>Hangul</Heading>
      <Input />
    </AuthCheck>
  );
};

export default Reviews;
