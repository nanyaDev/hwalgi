import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Kbd,
  Switch,
  Text,
} from '@chakra-ui/react';

import AuthCheck from '@/components/AuthCheck';
import Navbar from '@/components/Navbar';
import { mockReviews } from '@/utils/mockData';

// todo: abstract background to shell
const Lessons = () => {
  const [index, setIndex] = useState(0);
  const [context, setContext] = useState(true);
  const [value, setValue] = useState('');
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

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') handleRetry();
    if (e.key === 'Enter') handleSubmit();
  };

  const handleSubmit = () => {
    if (review.definitions.includes(value)) {
      setIndex(index + 1);
      setValue('');
    }
  };

  const handleRetry = () => {
    setValue('');
  };

  return (
    <AuthCheck>
      <Navbar />
      <Shell>
        <Card
          title={review.title}
          index={index}
          totalCount={reviews.length}
          context={context}
          handleContext={handleContext}
        >
          <Box>
            {context ? (
              <Sentence
                sentence={review.sentence}
                start={review.start}
                end={review.end}
              />
            ) : (
              <Term term={review.term} />
            )}
            <Input
              size="lg"
              variant="flushed"
              textAlign="center"
              mb={12}
              placeholder="Your Response"
              value={value}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
            />
          </Box>
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
const Card = ({
  children,
  title,
  index,
  totalCount,
  context,
  handleContext,
}) => (
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
    <Flex justify="space-between" p={4}>
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
    <Flex grow={1} px={32} pb={8} direction="column" justify="center">
      {children}
    </Flex>
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
  <Flex justify="space-between">
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
