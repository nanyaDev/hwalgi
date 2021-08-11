import { useState } from 'react';
// prettier-ignore
import { Box, Button, Center, Flex, FormControl, FormLabel, Input, Kbd, Switch, Text, } from '@chakra-ui/react';

import AuthCheck from '@/components/AuthCheck';
import Navbar from '@/components/Navbar';
import { mockReviews } from '@/utils/mockData';
import useKey from '@/lib/useKey';

// card layout uses auto margins on the TitleBar and Buttons
// cf. https://stackoverflow.com/questions/32551291/
// todo: abstract background to shell
const Lessons = () => {
  const [index, setIndex] = useState(0);
  const [context, setContext] = useState(true);
  const [value, setValue] = useState('');
  // ? maybe combine error and success into one three value boolean
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const reviews = mockReviews;
  const review = reviews[index];

  const handleContext = () => {
    setContext(!context);
  };

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  // todo: error should push the failed item back
  const handleSubmit = () => {
    if (success || error) {
      setSuccess(false);
      setError(false);
      setValue('');
      setIndex(index + 1);
      return;
    }

    if (review.definitions.includes(value)) {
      setSuccess(true);
    } else {
      setError(true);
    }
  };

  // todo: disable retry for success and remove setSuccess below
  const handleRetry = () => {
    setSuccess(false);
    setError(false);
    setValue('');
  };

  useKey('Enter', handleSubmit);
  useKey('Escape', handleRetry);

  // todo: abstract error/success message to component
  return (
    <AuthCheck>
      <Navbar />
      <Shell>
        <Card>
          <TitleBar
            title={review.title}
            index={index}
            totalCount={reviews.length}
            context={context}
            handleContext={handleContext}
          />
          {context ? (
            <Sentence
              sentence={review.sentence}
              start={review.start}
              end={review.end}
            />
          ) : (
            <Term term={review.term} />
          )}
          {error || success ? (
            <Center w="md" h={12} borderBottom="1px" borderColor="gray.200">
              <Text
                align="center"
                fontSize="18px"
                color={success ? 'green.500' : 'red.500'}
              >
                {value}
              </Text>
              {error && (
                <>
                  <Text align="center" fontSize="18px" color="gray.500" mx={1}>
                    →
                  </Text>
                  <Text align="center" fontSize="18px" color="green.500">
                    {review.definitions[0]}
                  </Text>
                </>
              )}
            </Center>
          ) : (
            <Input
              size="lg"
              variant="flushed"
              textAlign="center"
              placeholder="Your Response"
              w="md"
              autoFocus
              value={value}
              onChange={handleInput}
            />
          )}
          <Buttons handleRetry={handleRetry} handleSubmit={handleSubmit} />
        </Card>
      </Shell>
    </AuthCheck>
  );
};

const Shell = ({ children }) => (
  <Flex
    grow={1}
    direction="column"
    justify="center"
    align="center"
    bg="gray.50"
  >
    {children}
  </Flex>
);

// todo: fix minW="200px" hacky solution to center title
// the margin: auto trick might work
const Card = ({ children }) => (
  <Flex
    h="450px"
    w="700px"
    direction="column"
    bg="white"
    borderRadius="xl"
    boxShadow="base"
    border="1px"
    borderColor="gray.100"
  >
    <Flex grow={1} direction="column" justify="center" align="center">
      {children}
    </Flex>
  </Flex>
);

const TitleBar = ({ title, index, totalCount, context, handleContext }) => (
  <Flex alignSelf="stretch" justify="space-between" p={4} mb="auto">
    <FormControl
      minW="200px"
      display="flex"
      w="fit-content"
      alignItems="center"
    >
      <Switch
        id="context"
        size="sm"
        isChecked={context}
        onChange={handleContext}
        mr={2}
      />
      <FormLabel
        htmlFor="context"
        fontSize="sm"
        fontWeight="bold"
        color="gray.400"
        mb="0"
      >
        Context
      </FormLabel>
    </FormControl>
    <Text fontSize="md" fontWeight="bold" color="gray.500">
      {title}
    </Text>
    <Text
      minW="200px"
      fontSize="sm"
      fontWeight="bold"
      textAlign="right"
      color="gray.400"
    >
      {index} / {totalCount}
    </Text>
  </Flex>
);

const Sentence = ({ sentence, start, end }) => (
  <Text
    fontSize="4xl"
    fontWeight="normal"
    color="gray.600"
    textAlign="center"
    mb={6}
  >
    {sentence.slice(0, start)}
    <Text as="span" fontSize="4xl" fontWeight="normal" color="blue.500">
      {sentence.slice(start, end)}
    </Text>
    {sentence.slice(end)}
  </Text>
);

const Term = ({ term }) => (
  <Text
    fontSize="6xl"
    fontWeight="medium"
    color="gray.600"
    textAlign="center"
    mb={6}
  >
    {term}
  </Text>
);

const Buttons = ({ handleRetry, handleSubmit }) => (
  <Flex justify="space-between" mt="auto" mb={16} w="md">
    <Button
      variant="ghost"
      border="1px"
      colorScheme="purple"
      onClick={handleRetry}
    >
      Retry <Kbd ml={2}>Esc</Kbd>
    </Button>
    <Button
      variant="ghost"
      border="1px"
      colorScheme="blue"
      onClick={handleSubmit}
    >
      Submit <Kbd ml={2}>↵</Kbd>
    </Button>
  </Flex>
);

export default Lessons;
