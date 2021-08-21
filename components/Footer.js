import NextLink from 'next/link';
import { Center, HStack, Icon, Link, Text, VStack } from '@chakra-ui/react';

import { LogoBlack } from '@/styles/icons';

// ? is pos="absolute" the right way lay this out
const Footer = () => (
  <Center py={24}>
    <VStack spacing={4} pos="absolute" left={24}>
      <Icon as={LogoBlack} w="120px" h="30px" />
      <Text fontWeight="light">&copy; Hwalgi {new Date().getFullYear()}</Text>
    </VStack>
    <HStack spacing={8}>
      <FooterLink to="privacy" />
      <FooterLink to="terms" />
      <FooterLink to="about" />
      <FooterLink to="contact" />
    </HStack>
  </Center>
);

const FooterLink = ({ to }) => (
  <NextLink href={`/${to}`} passHref>
    <Link fontWeight="medium" textTransform="capitalize">
      {to}
    </Link>
  </NextLink>
);

export default Footer;
