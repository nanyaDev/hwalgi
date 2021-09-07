import { useState, useEffect } from 'react';
import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { useInView } from 'react-intersection-observer';

import { useAuth } from '@/lib/auth';
import ItemFilter from '@/components/ItemFilter';
import ActionBar from '@/components/ActionBar';
import Slide from '@/components/Slide';

// ? is it okay to use onMouseDown instead of onClick
const WordGrid = ({ cards }) => {
  const { user } = useAuth();
  // todo: probably better to use SWR
  // cf. https://github.com/leerob/fastfeedback/blob/master/pages/sites.js
  const [known, setKnown] = useState([]);
  const [learning, setLearning] = useState([]);
  const [words, setWords] = useState(cards);
  const [filters, setFilters] = useState({ sort: 'chronology', filter: 'new' });
  const [cursor, setCursor] = useState(0);
  const [loading, setLoading] = useState({ known: false, lessons: false });
  const { ref, inView } = useInView({ threshold: 0.5 });

  const updateFilter = (filter, value) => {
    setFilters({ ...filters, [filter]: value });
  };

  const updateCursor = (change) => {
    setCursor((p) => p + change);
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
    setLoading((p) => ({ ...p, known: true }));

    const data = words.filter((w) => w.selected === true);

    const response = await fetch('/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: user.token },
      credentials: 'same-origin',
      body: JSON.stringify({ destination: 'known', data }),
    });

    // todo: is there a better way to catch errors (axios?)
    if (response.ok) {
      setKnown((p) => [...p, ...data.map((d) => d.word)]);
      setWords(cards);
    }

    setLoading((p) => ({ ...p, known: false }));
  };

  // todo: does this handle duplicate adding to lessons
  const addToLessons = async () => {
    setLoading((p) => ({ ...p, lessons: true }));

    const data = words.filter((w) => w.selected === true);

    const response = await fetch('/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', token: user.token },
      credentials: 'same-origin',
      body: JSON.stringify({ destination: 'lessons', data }),
    });

    // todo: is there a better way to catch errors (axios?)
    if (response.ok) {
      setLearning((p) => [...p, ...data.map((d) => d.word)]);
      setWords(cards);
    }

    setLoading((p) => ({ ...p, lessons: false }));
  };

  const applyItemFilters = (words) => {
    let arr = words;

    if (filters.filter === 'known') {
      arr = words.filter((wObj) => known.includes(wObj.word));
    } else if (filters.filter === 'learning') {
      arr = words.filter((wObj) => learning.includes(wObj.word));
    } else if (filters.filter === 'new') {
      arr = words.filter(
        (wObj) => !known?.includes(wObj.word) && !learning.includes(wObj.word)
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
  // ? does this update when known/learning changes since known/learning are hidden in the function
  const wordsToDisplay = applyItemFilters(words);
  // ? does this have to come after wordsToDispaly decalaration to use updated value on rerender
  const allChecked = wordsToDisplay
    .slice(cursor, cursor + 30)
    .every((wordObj) => wordObj.selected);
  const isIndeterminate =
    wordsToDisplay
      .slice(cursor, cursor + 30)
      .some((wordObj) => wordObj.selected) && !allChecked;

  // todo: make checkbox functionality more logical
  const handleCheckbox = () => {
    // todo: DRY up this code taken from selectWord
    const copy = words.map((obj) => ({ ...obj })); // deep copy hack
    // ? how does using wordsToDisplay here affect rerendering
    const pageWords = wordsToDisplay
      .slice(cursor, cursor + 30)
      .map((wObj) => wObj.word);

    const bool = !isIndeterminate && !allChecked;
    const update = copy.map((wordObj) => {
      if (pageWords.includes(wordObj.word)) {
        wordObj.selected = bool;
      }

      return wordObj;
    });

    setWords(update);
  };

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
        setKnown(responseJSON.known);
        setLearning(responseJSON.learning);
      })();
    }
  }, [user]);

  return (
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
      <SimpleGrid
        templateRows="repeat(5, 100px)"
        columns={6}
        spacing={4}
        pt={12}
        pb={36}
        ref={ref}
      >
        {wordsToDisplay
          .slice(cursor, cursor + 30)
          .map(({ word, definitions, selected }) => (
            <Flex
              key={word}
              direction="column"
              justify="center"
              align="center"
              bg="white"
              border={selected ? '2px' : '1px'}
              borderColor={selected ? 'blue.500' : 'gray.300'}
              borderRadius="6px"
              cursor="pointer"
              _hover={{ boxShadow: 'base' }}
              onMouseDown={() => selectWord(word)}
            >
              <Text fontSize="lg" fontWeight="semibold" color="gray.700" mb={1}>
                {word}
              </Text>
              <Text fontWeight="light" align="center">
                {definitions[0]}
              </Text>
            </Flex>
          ))}
      </SimpleGrid>
      <Slide inView={inView}>
        <ActionBar
          numSelected={numSelected}
          isChecked={allChecked}
          isIndeterminate={isIndeterminate}
          handleCheckbox={handleCheckbox}
          loading={loading}
          addToKnown={addToKnown}
          addToLessons={addToLessons}
        />
      </Slide>
    </Box>
  );
};

export default WordGrid;
