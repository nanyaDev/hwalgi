import { Center, Spinner } from '@chakra-ui/react';

const Loader = () => (
  <Center flexGrow={1} w="full">
    <Spinner
      thickness="5px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Center>
);

export default Loader;
