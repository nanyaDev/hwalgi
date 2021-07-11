import Image from 'next/image';
import { Box } from '@chakra-ui/react';

const Thumbnail = ({ item }) => {
  return (
    <>
      <Box h="240px" borderRadius="md" overflow="hidden" pos="relative">
        <Image
          src={item.posterURL}
          key={item.tmdbID}
          alt={item.title}
          layout="fill"
          objectFit="cover"
        />
      </Box>
    </>
  );
};

export default Thumbnail;
