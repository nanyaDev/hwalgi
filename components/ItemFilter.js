// prettier-ignore
import { HStack, Select, Text, } from '@chakra-ui/react';

// todo: find a way to reconcile CatalogFilter and ItemFilter
const ItemFilter = ({ updateFilter }) => {
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
  );
};

export default ItemFilter;
