import NextLink from 'next/link';
// prettier-ignore
import { Flex, Stack, Button, Avatar, Heading, Spinner, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

import useRequireAuth from '@/lib/useRequireAuth';

// todo - extract <NextLink> + <Button> into custom component
// todo - investigate lazy mounting the menu button (cf. chakra docs)
const Dashboard = () => {
  const auth = useRequireAuth('/landing');

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
          <NextLink href="/catalogue" passHref>
            <Button as="a" variant="ghost">
              Catalogue
            </Button>
          </NextLink>
          <NextLink href="/stats" passHref>
            <Button as="a" variant="ghost">
              Stats
            </Button>
          </NextLink>
          <NextLink href="/community" passHref>
            <Button as="a" variant="ghost">
              Community
            </Button>
          </NextLink>
          <NextLink href="/search" passHref>
            <Button as="a" variant="ghost">
              Search
            </Button>
          </NextLink>
          <Menu>
            <MenuButton as={Avatar} size="sm" />
            <MenuList>
              <MenuItem onClick={() => auth.signout()}>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Flex>
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
