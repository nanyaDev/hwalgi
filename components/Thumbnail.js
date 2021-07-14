import NextLink from 'next/link';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';

// todo: work on image layout implementation
const Thumbnail = ({ item }) => {
  return (
    <NextLink href={`/catalog/${item.slug}`} passHref>
      <Box
        as="a"
        w="140px"
        h="210px"
        borderRadius="md"
        overflow="hidden"
        pos="relative"
        // boxShadow="2xl"
        border="1px"
        borderColor="gray.300"
        boxShadow="0px 3px 0px 0px var(--chakra-colors-gray-300)"
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
