import NextLink from 'next/link';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';

// todo: work on image layout implementation
const Thumbnail = ({ item }) => {
  return (
    <NextLink href={`/catalog/${item.slug}`} passHref>
      <Box
        as="a"
        w="160px"
        h="240px"
        borderRadius="md"
        overflow="hidden"
        pos="relative"
      >
        <Image
          src={item.posterURL}
          key={item.tmdbID}
          alt={item.title}
          layout="fill"
          objectFit="cover"
        />
      </Box>
    </NextLink>
  );
};

export default Thumbnail;
