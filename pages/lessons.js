import { Flex, Heading, Input } from '@chakra-ui/react';

import AuthCheck from '@/components/AuthCheck';
import Navbar from '@/components/Navbar';

const Lessons = () => {
  return (
    <AuthCheck>
      <Navbar />
    </AuthCheck>
  );
};

export default Lessons;
