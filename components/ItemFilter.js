// prettier-ignore
import { Flex, HStack, IconButton, Select, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

// todo: find a way to reconcile CatalogFilter and ItemFilter
// todo: disable pagination buttons at extremes
// todo: fix pagination number at right extreme
const ItemFilter = ({ cursor, wordCount, updateCursor, updateFilter }) => {
  const filters = [
    {
      name: 'Sort By',
      values: ['Chronology', 'Frequency', 'Occurences'],
      selected: 'Chronology',
    },
    {
      name: 'Filter By',
      values: ['New', 'Learning', 'Known'],
      selected: 'New',
    },
  ];

  return (
    <Flex justify="space-between">
      <HStack spacing={8}>
        {filters.map(({ name, values, selected }) => (
          <HStack spacing={3} key={name}>
            <Text fontWeight="medium">{name}</Text>
            <Select
              w="fit-content"
              onChange={(e) =>
                updateFilter(
                  name.toLowerCase().split(' ')[0],
                  e.target.value.toLowerCase()
                )
              }
            >
              {values.map((val) => (
                <option key={val} value={val} selected={val === selected}>
                  {val}
                </option>
              ))}
            </Select>
          </HStack>
        ))}
      </HStack>
      <Flex align="center">
        <Text mr={4}>
          {cursor + 1} - {Math.min(cursor + 30, wordCount)} of {wordCount}
        </Text>
        <IconButton
          variant="ghost"
          aria-label="Previous Page"
          icon={<ChevronLeftIcon boxSize="1.5em" />}
          isDisabled={cursor <= 0}
          onClick={() => updateCursor(-30)}
        />
        <IconButton
          variant="ghost"
          aria-label="Next Page"
          icon={<ChevronRightIcon boxSize="1.5em" />}
          isDisabled={cursor + 30 >= wordCount}
          onClick={() => updateCursor(30)}
        />
      </Flex>
    </Flex>
  );
};

export default ItemFilter;
