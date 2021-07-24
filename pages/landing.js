import NextLink from 'next/link';
// prettier-ignore
import { Flex, Button, Stack, Heading, Box, Text, Center, VStack, Link, HStack, SimpleGrid, Skeleton } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Landing = () => (
  <>
    <AuthBar />
    <Hero />
    <Catalog />
    <Lessons />
    <Reviews />
    <CTA />
  </>
);

const AuthBar = () => (
  <Stack spacing={4} isInline justify="flex-end" p={4}>
    <NextLink href="/login" passHref>
      <Button as="a" variant="ghost">
        Log In
      </Button>
    </NextLink>
    <NextLink href="/signup" passHref>
      <Button as="a">Sign Up</Button>
    </NextLink>
  </Stack>
);

const Hero = () => (
  <VStack spacing={6} py={20}>
    <Heading color="gray.700" size="4xl" textAlign="center" my={8}>
      Learn{' '}
      <Box
        as="span"
        bgGradient="linear(to-r, blue.600, purple.400, red.500)"
        bgClip="text"
      >
        Korean
      </Box>{' '}
      with <br /> the content you love
    </Heading>
    <Text color="gray.500" fontSize="2xl" textAlign="center">
      Built for people who love Korean entertainment, <br />
      Hwalgi makes SRS decks from your favorite Korean shows.
    </Text>
    <Link
      textAlign="center"
      href="#catalog-section"
      _hover="textDecoration: none"
      _focus="boxShadow: none"
    >
      <Text
        casing="uppercase"
        fontSize="sm"
        letterSpacing="widest"
        fontWeight="bold"
        pt={10}
        color="gray.700"
      >
        Learn More
      </Text>
      <ChevronDownIcon boxSize="24px" color="gray.700" />
    </Link>
  </VStack>
);

const Catalog = () => (
  <Box px={16}>
    <NumberMarker
      num={1}
      startColor="blue.500"
      endColor="cyan.400"
      id="catalog-section"
    >
      Catalog
    </NumberMarker>
    <HStack h="80vh">
      <CatalogMockup />
      <Flex direction="column" w="50%" h="full" justify="space-evenly" px={8}>
        <Box>
          <Heading size="md" color="gray.700">
            All Your Favorites
          </Heading>
          <Text color="gray.600">
            Learn from a wide variety of K-Dramas, K-Pop songs, and movies.
          </Text>
        </Box>
        <Box>
          <Heading size="md" color="gray.700">
            Hand Picked Words
          </Heading>
          <Text color="gray.600">
            We&#39;ve thoroughly checked each wordlist to make sure they&#39;re
            up to the mark.
          </Text>
        </Box>
        <Box>
          <Heading size="md" color="gray.700">
            Catered to You
          </Heading>
          <Text color="gray.600">
            Already started learning Korean? You can import known words from
            Duolingo, TTMIK, and Anki.
          </Text>
        </Box>
      </Flex>
    </HStack>
  </Box>
);

const Lessons = () => (
  <Box px={16}>
    <NumberMarker num={2} startColor="purple.500" endColor="pink.400">
      Lessons
    </NumberMarker>
    <HStack h="60vh">
      <Flex direction="column" w="50%" h="full" justify="space-evenly" px={8}>
        <Box>
          <Heading size="md" color="gray.700">
            Learn with Context
          </Heading>
          <Text color="gray.600">
            See how words are actually used by learning with contextual
            sentences instead of isolated words.
          </Text>
        </Box>
        <Box>
          <Heading size="md" color="gray.700">
            Go at Your Pace
          </Heading>
          <Text color="gray.600">
            Had a busy week? Just do 5 lessons. Got extra time? Go for 20
            lessons.
          </Text>
        </Box>
      </Flex>
      <Box w="50%" h="full" bg="gray.200" p={8}></Box>
    </HStack>
  </Box>
);

const Reviews = () => (
  <Box px={16}>
    <NumberMarker num={3} startColor="red.500" endColor="orange.400">
      Reviews
    </NumberMarker>
    <HStack h="60vh">
      <Box w="50%" h="full" bg="gray.200" p={8}></Box>
      <Flex direction="column" w="50%" h="full" justify="space-evenly" px={8}>
        <Box>
          <Heading size="md" color="gray.700">
            Spaced Repetition System
          </Heading>
          <Text color="gray.600">
            Reviews for each word are automatically scheduled at the optimal
            time, so you can spend less time with flashcards and more time
            engaging with native content.
          </Text>
        </Box>
        <Box>
          <Heading size="md" color="gray.700">
            Instant Feedback
          </Heading>
          <Text color="gray.600">
            Type in your answers and they&#39;ll be automatically graded.
          </Text>
        </Box>
      </Flex>
    </HStack>
  </Box>
);

const CTA = () => (
  <VStack py={32} spacing={4} bg="gray.50">
    <Text fontSize="2xl" fontWeight="medium" color="gray.700">
      We&#39;re building a community of Korean learners
    </Text>
    <Button size="lg" variant="solid" colorScheme="blue">
      Sign Up
    </Button>
  </VStack>
);

// ? is ...rest a bad practice
const NumberMarker = ({ children, num, startColor, endColor, ...rest }) => {
  // pass
  return (
    <VStack spacing={0} {...rest}>
      <Box
        h="100px"
        w="1px"
        bgGradient={`linear(to-b, transparent, ${endColor})`}
      />
      <Flex
        justify="center"
        align="center"
        h={10}
        w={10}
        borderRadius="100%"
        bgGradient={`linear(to-r, ${startColor}, ${endColor})`}
        color="white"
        fontWeight="bold"
      >
        {num}
      </Flex>
      <Box
        as="span"
        bgGradient={`linear(to-r, ${startColor}, ${endColor})`}
        bgClip="text"
        fontSize={32}
        fontWeight="bold"
      >
        {children}
      </Box>
    </VStack>
  );
};

const CatalogMockup = () => (
  <Box w="50%" h="full" pos="relative">
    <MockupShell pos="absolute" left={0} top={4}>
      <Skeleton h="15px" speed={2} startColor="gray.300" mb={4} />
      <SimpleGrid flexGrow={1} columns={6} rows={2} spacing={4}>
        {[...Array(12)].map((_, i) => (
          <Skeleton key={i} h="full" speed={2} startColor="gray.300" />
        ))}
      </SimpleGrid>
    </MockupShell>
    <MockupShell pos="absolute" right={1} bottom={8}></MockupShell>
  </Box>
);

// ? ...props bad practice
const MockupShell = ({ children, ...props }) => (
  <Flex
    {...props}
    direction="column"
    w="475px"
    h="300px"
    bgColor="white"
    borderRadius="md"
    boxShadow="0 30px 60px 0 rgba(0, 0, 0, 0.12)"
  >
    <Flex h="36px" borderBottom="1px" borderColor="gray.200">
      <HStack ml="12px">
        <Box as="span" boxSize="12px" borderRadius="100%" bgColor="#ff5f56" />
        <Box as="span" boxSize="12px" borderRadius="100%" bgColor="#ffbd2e" />
        <Box as="span" boxSize="12px" borderRadius="100%" bgColor="#27c93f" />
      </HStack>
    </Flex>
    <Flex grow={1} direction="column" px="10%" py="8%">
      {children}
    </Flex>
  </Flex>
);

export default Landing;
