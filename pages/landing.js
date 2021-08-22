import NextLink from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
// prettier-ignore
import { Flex, Button, Stack, Heading, Box, Text, Center, VStack, Link, HStack, SimpleGrid, Skeleton, Input, SkeletonCircle, GridItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import Typed from 'typed.js';

import { firestore as db } from '@/utils/firebase';
import GradientBar from '@/components/GradientBar';
import Footer from '@/components/Footer';
import Thumbnail from '@/components/Thumbnail';
import { mockWords } from '@/utils/mockData';

// ? mostly copied from /catalog, is there a way to DRY up code
export const getStaticProps = async () => {
  const catalogRef = db.collection('catalog');
  const catalog = (await catalogRef.limit(5).get()).docs.map((doc) =>
    doc.data()
  );

  const posters = [];

  await Promise.all(
    catalog.map(async (item) => {
      const request = `https://api.themoviedb.org/3/${item.type}/${item.tmdbID}?api_key=${process.env.TMDB_API_KEY}&language=en`;
      const response = await fetch(request);
      const data = await response.json();

      posters.push(`https://image.tmdb.org/t/p/w500${data.poster_path}`);
    })
  );

  return {
    props: { posters },
  };
};

const Landing = ({ posters }) => (
  <>
    <GradientBar />
    <AuthBar />
    <Hero />
    <Catalog />
    <Lessons />
    <Reviews />
    <CTA posters={posters} />
    <Footer />
  </>
);

const AuthBar = () => (
  <Flex justify="space-between" align="center" px={8} py={4}>
    <Image src="/logo.png" width={40} height={40} alt="logo" />
    <Stack spacing={4} isInline justify="flex-end">
      <NextLink href="/login" passHref>
        <Button as="a" variant="ghost">
          Log In
        </Button>
      </NextLink>
      <NextLink href="/signup" passHref>
        <Button as="a">Sign Up</Button>
      </NextLink>
    </Stack>
  </Flex>
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
      sx={{ scrollMargin: '-80px' }}
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
      <Center w="50%" h="full">
        <LessonMockup />
      </Center>
    </HStack>
  </Box>
);

const Reviews = () => (
  <Box px={16}>
    <NumberMarker num={3} startColor="red.500" endColor="orange.400">
      Reviews
    </NumberMarker>
    <HStack h="60vh">
      <Center w="50%" h="full">
        <ReviewMockup />
      </Center>
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

// ? rotation stuff seems janky
// ? why is w="full" needed
// ? not 100% sure why pos="absolute" works for centering and overlap
const CTA = ({ posters }) => (
  <Center h="100vh" overflow="hidden">
    <Flex shrink={0} opacity="0.15" w="120vw" h="36vw">
      {posters.map((posterURL, i) => (
        <Box key={`poster-${i}`} w="full" pos="relative" userSelect="none">
          <Image
            src={posterURL}
            layout="fill"
            objectFit="cover"
            alt="poster"
            draggable="false"
          />
        </Box>
      ))}
    </Flex>
    <VStack spacing={12} pos="absolute">
      <Box>
        <Heading align="center" color="blue.800" mb={4}>
          Ready to immerse in Korean?
        </Heading>
        <Text fontSize="18px" align="center" color="blue.700">
          Create an account in seconds and learn <br />
          vocabulary from your favorite Korean shows.
        </Text>
      </Box>
      <NextLink href="/signup" passHref>
        <Button
          as="a"
          w="200px"
          h="75px"
          fontWeight="semibold"
          fontSize={24}
          letterSpacing="widest"
          bgGradient="linear(to-r, blue.600, purple.600)"
          _hover={{
            bgGradient: 'linear(to-r, blue.700, purple.700)',
          }}
          _active={{
            bgGradient: 'linear(to-r, blue.700, purple.700)',
            transform: 'scale(0.97)',
          }}
          color="white"
          borderRadius="lg"
        >
          SIGN UP
        </Button>
      </NextLink>
    </VStack>
  </Center>
);

// ? is ...rest a bad practice
const NumberMarker = ({ children, num, startColor, endColor, ...rest }) => (
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

const CatalogMockup = () => {
  const item = {
    koreanTitle: '사랑의 불시착',
    posterURL:
      'https://image.tmdb.org/t/p/w500/bXo9sDqMmo4dEOPSPLR7sdYPTvz.jpg',
    slug: 'crash-landing-on-you',
    title: 'Crash Landing on You',
    tmdbID: '94796',
  };

  // todo: override default skeleton speed and startColor
  return (
    <Box w="50%" h="full" pos="relative">
      <MockupShell pos="absolute" left={0} top={4}>
        <Skeleton w="80%" mt="5%" h="15px" speed={2} startColor="gray.300" />
        <SimpleGrid w="80%" my="5%" flexGrow={1} columns={6} rows={2}>
          {[...Array(12)].map((_, i) => (
            <Skeleton
              key={i}
              w="50px"
              h="75px"
              speed={2}
              startColor="gray.300"
            />
          ))}
        </SimpleGrid>
      </MockupShell>
      <MockupShell pos="absolute" right={1} bottom={8}>
        <HStack spacing={8}>
          <Thumbnail item={item} w="128px" h="192px" />
          <Flex grow={1} h="192px" direction="column" justify="space-evenly">
            <Box>
              <Heading size="sm" color="gray.700" mb={2}>
                {item.title}
              </Heading>
              <Heading size="xs" color="gray.500">
                {item.koreanTitle}
              </Heading>
            </Box>
            <HStack spacing={2}>
              <SkeletonCircle size="4" speed={2} startColor="gray.300" />
              <SkeletonCircle size="4" speed={2} startColor="gray.300" />
              <Skeleton w="40px" h="15px" speed={2} startColor="gray.300" />
            </HStack>
            <Skeleton h="15px" speed={2} startColor="gray.300" />
            <Skeleton h="15px" speed={2} startColor="gray.300" />
            <Skeleton h="15px" speed={2} startColor="gray.300" />
          </Flex>
        </HStack>
      </MockupShell>
    </Box>
  );
};

const LessonMockup = () => (
  // pass
  <MockupShell>
    <SimpleGrid columns={3} spacing={4}>
      {mockWords.slice(0, 9).map(({ term, definition }) => (
        <Flex
          key={term}
          direction="column"
          justify="center"
          align="center"
          w="115px"
          h="65px"
          bg="white"
          border="1px"
          borderColor="gray.300"
          borderRadius="6px"
        >
          <Text fontSize="md" fontWeight="medium" color="gray.700" mb={2}>
            {term}
          </Text>
          <Skeleton w="75px" h="10px" speed={2} startColor="gray.300" />
        </Flex>
      ))}
    </SimpleGrid>
  </MockupShell>
);

const ReviewMockup = () => (
  <FlashcardShell>
    <Text fontSize="3xl" fontWeight="normal" color="gray.600" mb={2}>
      네,{' '}
      <Text as="span" color="blue.500">
        성격
      </Text>{' '}
      자체가 너무 온화하셔서
    </Text>
    <Typewriter />
  </FlashcardShell>
);

const Typewriter = () => {
  const el = useRef(null);
  const typed = useRef(null);

  useEffect(() => {
    const options = {
      strings: ['exciting^1000', 'personality^2000'],
      typeSpeed: 50,
      backSpeed: 50,
      loop: true,
      onTypingPaused: (arrayPos, self) => {
        if (arrayPos === 0) self.el.style.color = '#E53E3E';
        if (arrayPos === 1) self.el.style.color = '#38A169';
      },
      preStringTyped: (arrayPos, self) => {
        self.el.style.color = 'black';
      },
    };

    typed.current = new Typed(el.current, options);

    return () => typed.current.destroy();
  }, []);

  return (
    <div className="wrap">
      <div className="type-wrap">
        <Box
          w="240px"
          p={2}
          borderBottom="1px"
          borderColor="gray.200"
          textAlign="center"
        >
          <span style={{ whiteSpace: 'pre' }} ref={el} />
        </Box>
      </div>
    </div>
  );
};

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
    <Flex grow={1} direction="column" justify="center" align="center">
      {children}
    </Flex>
  </Flex>
);

const FlashcardShell = ({ children }) => (
  <Flex
    direction="column"
    justify="center"
    align="center"
    w="467px"
    h="300px"
    bgColor="white"
    borderRadius="md"
    boxShadow="0 30px 60px 0 rgba(0, 0, 0, 0.12)"
  >
    <Text fontSize="sm" fontWeight="semibold" color="gray.400" mt={4} mb="auto">
      Parasite
    </Text>
    {children}
    <HStack spacing={24} mb={8} mt="auto">
      <Button
        w="75px"
        h="30px"
        variant="ghost"
        border="1px"
        colorScheme="purple"
        fontSize="xs"
      >
        Retry
      </Button>
      <Button
        w="75px"
        h="30px"
        variant="ghost"
        border="1px"
        colorScheme="blue"
        fontSize="xs"
      >
        Submit
      </Button>
    </HStack>
  </Flex>
);

export default Landing;
