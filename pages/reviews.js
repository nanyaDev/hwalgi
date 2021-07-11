import { Flex, Heading, Input } from '@chakra-ui/react';

import AuthCheck from '@/components/AuthCheck';
import Navbar from '@/components/Navbar';

const Reviews = () => {
  return (
    <AuthCheck>
      <Navbar />
      <Heading>Hangul</Heading>
      <Input />
    </AuthCheck>
  );
};

export default Reviews;
