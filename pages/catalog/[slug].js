import { useState, useEffect } from 'react';
// todo: import as just firestore
import { firestore as db } from '@/utils/firebase';
// prettier-ignore
import { Box, Flex, Heading, HStack, IconButton, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { FaHeart, FaBookmark } from 'react-icons/fa';
import { NextSeo } from 'next-seo';

import AuthCheck from '@/components/AuthCheck';
import GradientBar from '@/components/GradientBar';
import Navbar from '@/components/Navbar';
import Thumbnail from '@/components/Thumbnail';
import VideoModal from '@/components/VideoModal';
import ItemFilter from '@/components/ItemFilter';
import ActionBar from '@/components/ActionBar';
import { useAuth } from '@/lib/auth';

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
  const catalogSnapshot = await catalogRef
    .where('slug', '==', slug)
    .limit(1)
    .get();
  let item = catalogSnapshot.docs[0].data();

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

  // ? is this good practice
  // ? how to do a named dynamic import
  let cards;
  if (process.env.NODE_ENV === 'development') {
    const mockData = await import('@/utils/mockData');
    cards = mockData.cardData;
  } else {
    const cardsRef = db.collection('catalog').doc(slug).collection('cards');
    const cardsSnapshot = await cardsRef.get();
    cards = cardsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  return {
    props: { item, credits, trailer, cards },
  };
};

// ? why does credits.director work even though it's an array
const CatalogItem = ({ item, credits, trailer, cards }) => {
  const { user } = useAuth();
  // todo: probably better to use SWR
  // cf. https://github.com/leerob/fastfeedback/blob/master/pages/sites.js
  const [wordStats, setWordStats] = useState({});

  const [words, setWords] = useState(cards);
  const [filters, setFilters] = useState({
    sort: 'chronology',
    filter: 'new',
  });
  const [cursor, setCursor] = useState(0);
  const [checkbox, setCheckbox] = useState(false);

  const updateFilter = (filter, value) => {
    setFilters({ ...filters, [filter]: value });
  };

  const updateCursor = (change) => {
    setCursor((p) => p + change);
    setCheckbox(false);
  };

  // todo: make checkbox functionality more logical
  const handleCheckbox = () => {
    // todo: DRY up this code taken from selectWord
    const copy = words.map((obj) => ({ ...obj })); // deep copy hack
    // ? how does using wordsToDisplay here affect rerendering
    const pageWords = wordsToDisplay
      .slice(cursor, cursor + 30)
      .map((wObj) => wObj.word);

    const update = copy.map((wordObj) => {
      if (pageWords.includes(wordObj.word)) {
        wordObj.selected = !checkbox;
      }

      return wordObj;
    });

    setWords(update);
    setCheckbox((p) => !p);
  };

  // todo: this all seems very inefficient, with the grid rerendered every time
  // todo: switch to dict for words so that it's not iterating over entire array each time
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

  const addToKnown = async () => {
    const data = words.filter((w) => w.selected === true);

    const response = await fetch('/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: user.token },
      credentials: 'same-origin',
      body: JSON.stringify({ destination: 'known', data }),
    });

    // todo: is there a better way to catch errors (axios?)
    if (response.ok) {
      setWordStats((p) => ({
        ...p,
        known: [...p.known, ...data.map((d) => d.word)],
      }));
      setWords(cards);
    }
  };

  // todo: does this handle duplicate adding to lessons
  const addToLessons = async () => {
    const data = words.filter((w) => w.selected === true);

    const response = await fetch('/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: user.token },
      credentials: 'same-origin',
      body: JSON.stringify({ destination: 'lessons', data }),
    });

    // todo: is there a better way to catch errors (axios?)
    if (response.ok) {
      setWordStats((p) => ({
        ...p,
        learning: [...p.learning, ...data.map((d) => d.word)],
      }));
      setWords(cards);
    }
  };

  const applyItemFilters = (words) => {
    let arr = words;

    if (filters.filter === 'known') {
      arr = words.filter((wObj) => wordStats.known?.includes(wObj.word));
    } else if (filters.filter === 'learning') {
      arr = words.filter((wObj) => wordStats.learning?.includes(wObj.word));
    } else if (filters.filter === 'new') {
      arr = words.filter(
        (wObj) =>
          !wordStats.known?.includes(wObj.word) &&
          !wordStats.learning?.includes(wObj.word)
      );
    }

    if (filters.sort === 'chronology') {
      arr = arr.sort(
        (a, b) => a.minOrder - b.minOrder || a.minStart - b.minStart
      );
    } else if (filters.sort === 'frequency') {
      arr = arr.sort((a, b) => a.frequency - b.frequency);
    } else if (filters.sort === 'occurences') {
      arr = arr.sort((a, b) => b.occurences - a.occurences);
    }

    return arr;
  };

  const numSelected = words.filter((w) => w.selected === true).length;
  // ? does this update when wordStats changes since wordStats is hidden in the function
  const wordsToDisplay = applyItemFilters(words);

  // todo: react suspense ?!
  // cf. https://stackoverflow.com/questions/53332321/
  useEffect(() => {
    if (user) {
      (async () => {
        const response = await fetch('/api/cards', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', token: user.token },
          credentials: 'same-origin',
        });
        const responseJSON = await response.json();
        setWordStats(responseJSON);
      })();
    }
  }, [user]);

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
            <ItemFilter
              cursor={cursor}
              wordCount={wordsToDisplay.length}
              updateCursor={updateCursor}
              updateFilter={updateFilter}
            />
            <SimpleGrid my={12} columns={6} spacing={4}>
              {wordsToDisplay
                .slice(cursor, cursor + 30)
                .map(({ word, definitions, selected }) => (
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
          <ActionBar
            numSelected={numSelected}
            checkbox={checkbox}
            handleCheckbox={handleCheckbox}
            addToKnown={addToKnown}
            addToLessons={addToLessons}
          />
        </Flex>
      </AuthCheck>
    </>
  );
};

export default CatalogItem;
