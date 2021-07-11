import NextLink from 'next/link';
// prettier-ignore
import { Flex, Button  } from '@chakra-ui/react';

import AuthCheck from '@/components/AuthCheck';
import Navbar from '@/components/Navbar';

const Dashboard = () => {
  return (
    <AuthCheck>
      <Flex direction="column" h="100vh">
        <Navbar />
        <Flex justify="center" h="full" align="center">
          <NextLink href="/lessons" passHref>
            <Button as="a" m={3} p={10} colorScheme="red">
              Lessons
            </Button>
          </NextLink>
          <NextLink href="/reviews" passHref>
            <Button as="a" p={10} m={3} colorScheme="blue">
              Reviews
            </Button>
          </NextLink>
        </Flex>
      </Flex>
    </AuthCheck>
  );
};

export default Dashboard;
