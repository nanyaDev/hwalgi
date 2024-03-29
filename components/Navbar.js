import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// prettier-ignore
import { Avatar, Box, Button, Flex, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Stack, } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

// todo - investigate lazy mounting the menu button (cf. chakra docs)
// todo - fix logo width and height not setting correctly
// ? why does the image have to be in a <Box as="a">
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

// ? the boxShadow approach to reduce border length might be bad on older browsers
// ? is path.includes(href) robust and/or efficient
// cf. https://stackoverflow.com/questions/8572952/border-length-smaller-than-div-width
const ButtonLink = ({ href, children }) => {
  const router = useRouter();

  return (
    <NextLink href={href} passHref>
      <Button
        as="a"
        variant="ghost"
        color="gray.700"
        boxShadow={
          router.pathname.includes(href) ? '0 15px 0 -13px #3182CE' : null
        }
        _active={{
          bg: 'none',
        }}
        _hover={{
          boxShadow: '0 15px 0 -13px #3182CE',
        }}
      >
        {children}
      </Button>
    </NextLink>
  );
};

export default Navbar;
