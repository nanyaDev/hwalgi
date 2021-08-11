// todo: import as just firestore
import { firestore as db } from '@/utils/firebase';
// prettier-ignore
import { Box, Flex, Heading, HStack, Icon, IconButton, Text, VStack } from '@chakra-ui/react';
import { FaHeart, FaBookmark } from 'react-icons/fa';

import AuthCheck from '@/components/AuthCheck';
import Navbar from '@/components/Navbar';
import Thumbnail from '@/components/Thumbnail';
import VideoModal from '@/components/VideoModal';

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
      .filter((person) => person.order <= 3)
      .map((p) => ({ name: p.name, id: p.id, char: p.character })),
    director: creditsData.crew
      .filter((person) => person.job === 'Director')
      .map((p) => p.name),
  };

  const videosRequest = `https://api.themoviedb.org/3/${item.type}/${item.tmdbID}/videos?api_key=${process.env.TMDB_API_KEY}&language=en`;
  const videosResponse = await fetch(videosRequest);
  const videosData = await videosResponse.json();

  const video = videosData.results.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );
  // todo: make sure everything has a trailer
  const trailer = video?.key || null;

  return {
    props: { item, credits, trailer },
  };
};

// ? why does credits.director work even though it's an array
const CatalogItem = ({ item, credits, trailer }) => {
  return (
    <AuthCheck>
      <Navbar />
      <HStack
        flexGrow={1}
        align="flex-start"
        spacing={8}
        px={36}
        pt={8}
        bg="gray.50"
      >
        <Thumbnail item={item} w="250px" h="375px" />
        <Flex h="375px" px={6} direction="column" justify="space-evenly">
          <VStack align="flex-start" spacing={1}>
            <HStack align="flex-end" spacing={2}>
              <Heading size="lg" color="gray.700">
                {item.title}
              </Heading>
              <Heading size="md" color="gray.500">
                {item.koreanTitle}
              </Heading>
            </HStack>
            <Text fontWeight="medium" casing="capitalize">
              {item.type}, {item.year.slice(0, 4)}
            </Text>
          </VStack>
          <HStack spacing={4}>
            <IconButton
              icon={<FaHeart />}
              variant="outline"
              borderRadius="full"
              color="gray.200"
              aria-label="favorite"
            />
            <IconButton
              icon={<FaBookmark />}
              variant="outline"
              borderRadius="full"
              color="gray.200"
              aria-label="bookmark"
            />
            {trailer && <VideoModal trailer={trailer}>Play Trailer</VideoModal>}
          </HStack>
          <Box>
            <Text casing="uppercase" letterSpacing="wider" fontSize="sm" mb={4}>
              {item.tagline}
            </Text>
            <Text>{item.overview}</Text>
          </Box>
          <HStack spacing={6}>
            <Box>
              <Text fontWeight="semibold" color="gray.500">
                Director
              </Text>
              <Text fontWeight="semibold" color="gray.500">
                Cast
              </Text>
            </Box>
            <Box>
              <Text color="gray.500">{credits.director}</Text>
              {credits.cast.map((actor) => (
                <Text as="span" key={actor.id} color="gray.500">
                  {actor.name},{' '}
                </Text>
              ))}
            </Box>
          </HStack>
        </Flex>
      </HStack>
    </AuthCheck>
  );
};

export default CatalogItem;
