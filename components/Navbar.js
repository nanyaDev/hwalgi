import NextLink from 'next/link';
// prettier-ignore
import { Avatar, Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Stack, } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

// todo - extract <NextLink> + <Button> into custom component (for dashboard as well)
// todo - investigate lazy mounting the menu button (cf. chakra docs)
const Navbar = () => {
  const auth = useAuth();

  return (
    <Flex justify="space-between" p={4}>
      <Heading>Hwalgi</Heading>
      <Stack spacing={4} isInline align="center">
        <NextLink href="/catalog" passHref>
          <Button as="a" variant="ghost">
            Catalog
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
  );
};

export default Navbar;
