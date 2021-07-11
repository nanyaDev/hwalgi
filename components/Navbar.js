import NextLink from 'next/link';
// prettier-ignore
import { Avatar, Button, Flex, Heading, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

// todo - investigate lazy mounting the menu button (cf. chakra docs)
const Navbar = () => {
  const auth = useAuth();

  return (
    <Flex justify="space-between" px={8} py={4}>
      <Heading>H</Heading>
      <Stack spacing={4} isInline align="center">
        <ButtonLink href="/catalog">Catalog</ButtonLink>
        <ButtonLink href="/lessons">Lessons</ButtonLink>
        <ButtonLink href="/reviews">Reviews</ButtonLink>
      </Stack>
      <Menu>
        <MenuButton as={Avatar} size="sm" />
        <MenuList>
          <MenuItem>Stats</MenuItem>
          <MenuItem>Community</MenuItem>
          <MenuDivider />
          <MenuItem onClick={() => auth.signout()}>Sign Out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

const ButtonLink = ({ href, children }) => (
  <NextLink href={href} passHref>
    <Button as="a" variant="ghost">
      {children}
    </Button>
  </NextLink>
);

export default Navbar;
