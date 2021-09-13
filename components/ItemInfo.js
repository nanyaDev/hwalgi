// prettier-ignore
import { Box, Flex, Heading, HStack, VStack, Table, Tr, Td, Text, IconButton } from '@chakra-ui/react';
import { FaHeart, FaBookmark } from 'react-icons/fa';

import Thumbnail from '@/components/Thumbnail';
import VideoModal from '@/components/VideoModal';

const ItemInfo = ({ item, tidbits, media }) => {
  return (
    <HStack align="flex-start" spacing={8} px={36} pt={8}>
      <Thumbnail item={item} w="250px" h="375px" />
      <Flex h="375px" px={6} direction="column" justify="space-evenly">
        <VStack align="flex-start" spacing={1}>
          <HStack align="flex-end" spacing={2}>
            <Heading size="lg" color="gray.700">
              {item.title}
            </Heading>
            <Heading size="md" color="gray.500" pb="2px">
              {item.koreanTitle || item.artist}
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
          {media && <VideoModal trailer={media}>Play Trailer</VideoModal>}
        </HStack>
        <Box>
          <Text casing="uppercase" letterSpacing="wider" fontSize="sm" mb={4}>
            {item.tagline}
          </Text>
          <Text>{item.overview}</Text>
        </Box>
        <Table variant="unstyled">
          {Object.keys(tidbits).map((key) => (
            <Tr key={key}>
              <Td fontWeight="semibold" color="gray.500" px={0} py={1}>
                {capitalize(key)}
              </Td>
              <Td color="gray.500" px={3} py={1} w="100%">
                {tidbits[key]}
              </Td>
            </Tr>
          ))}
        </Table>
      </Flex>
    </HStack>
  );
};

// helper
const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
};

export default ItemInfo;
