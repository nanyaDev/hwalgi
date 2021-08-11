// todo: delete this if it doesn't end up getting used
import { useState } from 'react';
// prettier-ignore
import { Box, Button, Flex, SimpleGrid, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack } from '@chakra-ui/react';

const LessonGenerator = () => {
  return (
    <Box
      w="350px"
      h="400px"
      p={8}
      rounded="md"
      bg="white"
      boxShadow="md"
      flexShrink={0}
    >
      <SliderWithNumber
        title="Occurences"
        min={1}
        max={10}
        step={1}
        defaultValue={2}
      />
      <SliderWithNumber
        title="Min Frequency"
        min={0}
        max={10000}
        step={500}
        defaultValue={2000}
      />
      <SliderWithNumber
        title="Max Frequency"
        min={0}
        max={10000}
        step={500}
        defaultValue={2000}
        isReversed
      />
      <Text fontWeight="bold" fontSize="sm" color="gray.500" my={2}>
        Episodes
      </Text>
      <SimpleGrid columns={8}>
        {Array.from({ length: 16 }, (_, n) => (
          <Flex
            key={n}
            justify="center"
            align="center"
            borderRight={(n + 1) % 8 !== 0 ? '1px' : null}
            borderBottom={n + 1 <= 8 ? '1px' : null}
            borderColor="gray.100"
            // w="30px"
            h="30px"
            // rounded="md"
            color="gray.400"
            fontWeight="medium"
          >
            {n + 1}
          </Flex>
        ))}
      </SimpleGrid>
      <Button w="full" h="40px" mt={4} colorScheme="blue">
        Generate Lessons
      </Button>
    </Box>
  );
};

// ? is spreading props bad practice
// todo: implement a range slider for min and max frequency
const SliderWithNumber = ({ title, ...props }) => {
  const [value, setValue] = useState(props.defaultValue || 0);

  return (
    <VStack py={2} spacing={2}>
      <Flex w="full" justify="space-between" align="center">
        <Text fontWeight="bold" fontSize="sm" color="gray.500">
          {title}
        </Text>
        <Text fontWeight="bold" color="gray.500">
          {props.isReversed ? props.max - value : value}
        </Text>
      </Flex>
      <Slider
        {...props}
        focusThumbOnChange={false}
        value={value}
        onChange={(val) => setValue(val)}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </VStack>
  );
};

export default LessonGenerator;
