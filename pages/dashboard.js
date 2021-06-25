import NextLink from 'next/link';
// prettier-ignore
import { Flex, Stack, Button, Avatar, Heading, Spinner } from '@chakra-ui/react';

import useRequireAuth from '@/lib/useRequireAuth';

// todo - extract <NextLink> + <Button> into custom component
const Dashboard = () => {
  const auth = useRequireAuth();

  // ? - why does if(!auth) work in flytrap and usehooks.com
  // ? - is conditional chaining required
  if (!auth?.user) {
    return <Spinner />;
  }

  return (
    <Flex direction="column" h="100vh">
      <Flex justify="space-between" p={4}>
        <Heading>Hwalgi</Heading>
        <Stack spacing={4} isInline align="center">
          <NextLink href="#" passHref>
            <Button as="a" variant="ghost">
              Stats
            </Button>
          </NextLink>
          <NextLink href="#" passHref>
            <Button as="a" variant="ghost">
              Reference
            </Button>
          </NextLink>
          <NextLink href="#" passHref>
            <Button as="a" variant="ghost">
              Search
            </Button>
          </NextLink>
          <NextLink href="#" passHref>
            <Button as="a" variant="ghost">
              Settings
            </Button>
          </NextLink>
          <Button variant="ghost" onClick={() => auth.signout()}>
            Sign Out
          </Button>
          <Avatar size="sm" />
        </Stack>
      </Flex>
      <Flex justify="center" h="full" align="center">
        <NextLink href="/lessons" passHref>
          <Button as="a" m={3} p={10}>
            Lessons
          </Button>
        </NextLink>
        <NextLink href="/reviews" passHref>
          <Button as="a" p={10} m={3}>
            Reviews
          </Button>
        </NextLink>
      </Flex>
    </Flex>
  );
};

export default Dashboard;
