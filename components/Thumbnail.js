import { useState } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { Box, Skeleton } from '@chakra-ui/react';

// todo: work on image layout implementation
// ? is there a better way to do w={w} h={h}
// ? is the skeleton needed, seems hacky
const Thumbnail = ({ item, w, h }) => {
  const { type, slug, posterURL, title } = item;

  // todo: unnecessary state if it's not an album
  // ? is this the best way to handle albums
  const [loading, setLoading] = useState(true);

  return (
    <NextLink href={`/catalog/${slug}`} passHref>
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
        bg={loading ? null : item.bg || null}
      >
        {loading && <Skeleton h="full" w="full" />}
        <Image
          src={posterURL}
          key={slug}
          alt={title}
          layout="fill"
          objectFit={type === 'music' ? 'contain' : 'cover'}
          onLoad={() => setLoading(false)}
        />
      </Box>
    </NextLink>
  );
};

export default Thumbnail;
