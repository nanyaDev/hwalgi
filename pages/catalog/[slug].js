// todo: import as just firestore
import { firestore as db } from '@/utils/firebase';

import AuthCheck from '@/components/AuthCheck';
import Navbar from '@/components/Navbar';
import Thumbnail from '@/components/Thumbnail';
import LessonGenerator from '@/components/LessonGenerator';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';

export const getStaticPaths = async () => {
  const catalogRef = db.collection('catalog');
  const catalog = (await catalogRef.get()).docs.map((doc) => doc.data());

  const paths = catalog.map((item) => ({ params: { slug: item.slug } }));

  // ? why does fallback: true break build
  // ? cf: https://nextjs.org/docs/basic-features/data-fetching#the-fallback-key-required
  return { paths, fallback: false };
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;

  const catalogRef = db.collection('catalog');
  const snapshot = await catalogRef.where('slug', '==', slug).limit(1).get();
  let item = snapshot.docs[0].data();

  // todo: repeated from index.js => abstract helper function
  const infoRequest = `https://api.themoviedb.org/3/${item.type}/${item.tmdbID}?api_key=${process.env.TMDB_API_KEY}&language=en`;
  const infoResponse = await fetch(infoRequest);
  const infoData = await infoResponse.json();

  // ? is this a bad way to pass data
  // todo: fix overpassing info to <Thumbnail />
  // todo: make this resilient to badly formatted api responses
  item = {
    ...item,
    koreanTitle: infoData.original_title || infoData.original_name,
    overview: infoData.overview,
    tagline: infoData.tagline,
    episodeCount: infoData.number_of_episodes || null,
    year: infoData.first_air_date || infoData.release_date,
    posterURL: `https://image.tmdb.org/t/p/w500${infoData.poster_path}`,
  };

  const creditsRequest = `https://api.themoviedb.org/3/${item.type}/${item.tmdbID}/credits?api_key=${process.env.TMDB_API_KEY}&language=en`;
  const creditsResponse = await fetch(creditsRequest);
  const creditsData = await creditsResponse.json();

  // todo: make this less obscure
  const credits = {
    cast: creditsData.cast
      .filter((person) => person.order <= 4)
      .map((p) => ({ name: p.name, id: p.id, char: p.character })),
    director: creditsData.crew
      .filter((person) => person.job === 'Director')
      .map((p) => p.name),
  };

  return {
    props: { item, credits },
  };
};

// ? why does credits.director work even though it's an array
const CatalogItem = ({ item, credits }) => {
  return (
    <AuthCheck>
      <Navbar />
      <Flex grow={1} justify="space-between" px={12} py={8} bg="gray.50">
        <VStack spacing={5}>
          <Thumbnail item={item} w="250px" h="375px" />
          <Button w="full" colorScheme="blackAlpha">
            Watch Trailer
          </Button>
          <Button w="full" colorScheme="red">
            Watch on Netflix
          </Button>
        </VStack>
        <VStack px={6} py={2} align="flex-start" spacing={4}>
          <VStack align="flex-start" spacing={1}>
            <HStack align="flex-end" spacing={2}>
              <Heading size="lg" color="gray.700">
                {item.title}
              </Heading>
              <Heading size="md" color="gray.500">
                {item.koreanTitle}
              </Heading>
            </HStack>
            <HStack spacing={4}>
              <Text fontWeight="medium">{item.year.slice(0, 4)}</Text>
              <Box>
                <Text as="span" color="gray.500" fontSize="sm">
                  Directed by{' '}
                </Text>
                <Text as="span" fontWeight="medium">
                  {credits.director}
                </Text>
              </Box>
            </HStack>
          </VStack>
          <Text casing="uppercase" letterSpacing="wider" fontSize="sm">
            {item.tagline}
          </Text>
          <Text>{item.overview}</Text>
          <Box>
            {credits.cast.map((actor) => (
              <Flex key={actor.id} justify="space-between">
                <Text fontWeight="medium" color="gray.700" pr={8}>
                  {actor.name}
                </Text>
                <Text color="gray.500">{actor.char}</Text>
              </Flex>
            ))}
          </Box>
        </VStack>
        <LessonGenerator />
      </Flex>
    </AuthCheck>
  );
};

export default CatalogItem;
