// todo: find approach that doesn't export multiple components from 1 file
// prettier-ignore
import { Button, Center, Flex, FormControl, FormLabel, Input, Kbd, Switch, Text } from '@chakra-ui/react';

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
    w="700px"
    h="450px"
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

const TitleBar = ({ title, index, totalCount, context, toggleContext }) => (
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
        onChange={toggleContext}
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

// todo: 'overpassing' review prop
const Prompt = ({ item, context }) => {
  const { sentence, start, length, word } = item;

  return (
    <>
      {context ? (
        <Sentence sentence={sentence} start={start} end={start + length} />
      ) : (
        <Word word={word} />
      )}
    </>
  );
};

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

const Word = ({ word }) => (
  <Text
    fontSize="6xl"
    fontWeight="medium"
    color="gray.600"
    textAlign="center"
    mb={3}
  >
    {word}
  </Text>
);

const Response = ({ grade, value, review, handleInput }) => {
  return (
    <>
      {grade !== null ? (
        <Center w="md" h={12} borderBottom="1px" borderColor="gray.200">
          <Text
            align="center"
            fontSize="18px"
            color={grade ? 'green.500' : 'red.500'}
          >
            {value}
          </Text>
          {grade === false && (
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
    </>
  );
};

const ReviewButtons = ({ handleRetry, handleSubmit }) => (
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

export { Shell, Card, TitleBar, Prompt, Response, ReviewButtons };
