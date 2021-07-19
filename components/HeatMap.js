import { Box, SimpleGrid } from '@chakra-ui/react';

// ? does using an svg grid like GitHub does result in better performance
const HeatMap = () => {
  // code
  return (
    <Box flexGrow={1} bg="gray.400">
      <SimpleGrid templateRows="repeat(7, 1fr)" autoFlow="column" spacing="3px">
        {Array(365)
          .fill()
          .map((_, i) => (
            <Box
              key={i}
              rounded="sm"
              h="12px"
              border="1px"
              borderColor="gray.600"
            />
          ))}
      </SimpleGrid>
    </Box>
  );
};

export default HeatMap;
