// prettier-ignore
import { Box, Flex, Heading, HStack, VStack, Text, IconButton } from '@chakra-ui/react';
import { FaHeart, FaBookmark } from 'react-icons/fa';

import Thumbnail from '@/components/Thumbnail';
import VideoModal from '@/components/VideoModal';

const ItemInfo = ({ item, credits, trailer }) => {
  return (
    <HStack align="flex-start" spacing={8} px={36} pt={8}>
      <Thumbnail item={item} w="250px" h="375px" />
      <Flex h="375px" px={6} direction="column" justify="space-evenly">
        <VStack align="flex-start" spacing={1}>
          <HStack align="flex-end" spacing={2}>
            <Heading size="lg" color="gray.700">
              {item.title}
            </Heading>
            <Heading size="md" color="gray.500">
              {item.koreanTitle}
            </Heading>
          </HStack>
          <Text fontWeight="medium" casing="capitalize">
            {item.type}, {item.year.slice(0, 4)}
          </Text>
        </VStack>
        <HStack spacing={4}>
          <IconButton
            icon={<FaHeart />}
            variant="outline"
            borderRadius="full"
            color="gray.200"
            aria-label="favorite"
          />
          <IconButton
            icon={<FaBookmark />}
            variant="outline"
            borderRadius="full"
            color="gray.200"
            aria-label="bookmark"
          />
          {trailer && <VideoModal trailer={trailer}>Play Trailer</VideoModal>}
        </HStack>
        <Box>
          <Text casing="uppercase" letterSpacing="wider" fontSize="sm" mb={4}>
            {item.tagline}
          </Text>
          <Text>{item.overview}</Text>
        </Box>
        <HStack spacing={6}>
          <Box>
            <Text fontWeight="semibold" color="gray.500">
              Director
            </Text>
            <Text fontWeight="semibold" color="gray.500">
              Cast
            </Text>
          </Box>
          <Box>
            <Text color="gray.500">{credits.director}</Text>
            {credits.cast.map((actor) => (
              <Text as="span" key={actor.id} color="gray.500">
                {actor.name},{' '}
              </Text>
            ))}
          </Box>
        </HStack>
      </Flex>
    </HStack>
  );
};

export default ItemInfo;
