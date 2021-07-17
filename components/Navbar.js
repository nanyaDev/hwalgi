import Image from 'next/image';
import NextLink from 'next/link';
// prettier-ignore
import { Avatar, Box, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

// todo - investigate lazy mounting the menu button (cf. chakra docs)
// todo - fix logo width and height not setting correctly
const Navbar = () => {
  const auth = useAuth();

  return (
    <Flex
      justify="space-between"
      align="center"
      px={8}
      py={2}
      borderBottom="1px"
      borderColor="gray.200"
    >
      <NextLink href="/" passHref>
        <Box as="a" pos="relative">
          <Image src="/logo.png" width={40} height={40} alt="logo" />
        </Box>
      </NextLink>
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
    <Button as="a" variant="ghost" color="gray.700">
      {children}
    </Button>
  </NextLink>
);

export default Navbar;
