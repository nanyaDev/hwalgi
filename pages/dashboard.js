import NextLink from 'next/link';
// prettier-ignore
import { Flex, Button, Spinner } from '@chakra-ui/react';

import useRequireAuth from '@/lib/useRequireAuth';
import Navbar from '@/components/Navbar';

const Dashboard = () => {
  const auth = useRequireAuth('/landing');

  // ? - why does if(!auth) work in flytrap and usehooks.com
  // ? - is conditional chaining required
  if (!auth?.user) {
    return <Spinner />;
  }

  return (
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
  );
};

export default Dashboard;
