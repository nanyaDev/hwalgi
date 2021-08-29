import { useState } from 'react';
// todo: import as just firestore
import { firestore as db } from '@/utils/firebase';
// prettier-ignore
import { Box, Center, Flex, Heading, HStack, Icon, IconButton, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FaHeart, FaBookmark } from 'react-icons/fa';
import { NextSeo } from 'next-seo';

import AuthCheck from '@/components/AuthCheck';
import GradientBar from '@/components/GradientBar';
import Navbar from '@/components/Navbar';
import Thumbnail from '@/components/Thumbnail';
import VideoModal from '@/components/VideoModal';
import ItemFilter from '@/components/ItemFilter';
import { cardData } from '@/utils/mockData';

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
  const [filters, setFilters] = useState({
    sort: 'chronology',
    filter: 'known',
  });
  const [words, setWords] = useState(cardData);

  const updateFilter = (filter, value) => {
    setFilters({ ...filters, [filter]: value });
  };

  // todo: this all seems very inefficient, with the grid rerendered every time
  const selectWord = (word) => {
    const copy = words.map((obj) => ({ ...obj })); // deep copy hack

    // this seems suboptimal
    const update = copy.map((wordObj) => {
      if (wordObj.word === word) {
        wordObj.selected =
          wordObj.selected === undefined ? true : !wordObj.selected;
      }

      return wordObj;
    });

    setWords(update);
  };

  // ? is it okay to use onMouseDown instead of onClick
  return (
    <>
      <NextSeo title={item.title} />
      <AuthCheck>
        <GradientBar />
        <Navbar />
        <Flex direction="column" grow={1} bg="gray.50">
          <HStack align="flex-start" spacing={8} px={36} pt={8}>
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
                {trailer && (
                  <VideoModal trailer={trailer}>Play Trailer</VideoModal>
                )}
              </HStack>
              <Box>
                <Text
                  casing="uppercase"
                  letterSpacing="wider"
                  fontSize="sm"
                  mb={4}
                >
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
          <Box px={16}>
            <Flex align="center" my={12}>
              <Box flexGrow={1} borderBottom="1px" borderColor="gray.600" />
              <Text color="gray.600" fontWeight="medium" mx={6}>
                Select some words to start learning
              </Text>
              <Box flexGrow={1} borderBottom="1px" borderColor="gray.600" />
            </Flex>
            <ItemFilter updateFilter={updateFilter} />
            <SimpleGrid my={12} columns={6} spacing={10}>
              {words.map(({ word, definitions, selected }) => (
                <Flex
                  key={word}
                  direction="column"
                  justify="center"
                  align="center"
                  w="180px"
                  h="100px"
                  bg="white"
                  border={selected ? '2px' : '1px'}
                  borderColor={selected ? 'blue.500' : 'gray.300'}
                  borderRadius="6px"
                  onMouseDown={() => selectWord(word)}
                >
                  <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    color="gray.700"
                    mb={1}
                  >
                    {word}
                  </Text>
                  <Text fontWeight="light" align="center">
                    {definitions[0]}
                  </Text>
                </Flex>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>
      </AuthCheck>
    </>
  );
};

export default CatalogItem;
