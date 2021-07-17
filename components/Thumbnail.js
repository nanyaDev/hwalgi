import NextLink from 'next/link';
import Image from 'next/image';
import { Box } from '@chakra-ui/react';

// todo: work on image layout implementation
// ? is there a better way to do w={w} h={h}
const Thumbnail = ({ item, w, h }) => {
  return (
    <NextLink href={`/catalog/${item.slug}`} passHref>
      <Box
        d="block"
        w={w}
        h={h}
        flexShrink={0}
        as="a"
        borderRadius="md"
        overflow="hidden"
        pos="relative"
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
