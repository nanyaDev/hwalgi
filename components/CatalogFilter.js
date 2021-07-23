import { useCallback } from 'react';
import debounce from 'lodash.debounce';
import { ChevronDownIcon, SearchIcon, SmallCloseIcon } from '@chakra-ui/icons';
// prettier-ignore
import { Button, HStack, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, } from '@chakra-ui/react';

// todo: implement 'Lists' logic
const CatalogFilter = ({ updateFilter, clearFilters, updateSearch }) => {
  const filters = [
    {
      name: 'Type',
      values: ['TV', 'Movie', 'Music'],
    },
    {
      name: 'Difficulty',
      values: ['Beginner', 'Intermediate', 'Advanced'],
    },
    {
      name: 'Lists',
      values: ['Favorites', 'Want to Watch'],
    },
  ];

  // ? is this debouncing even required here (no api call)
  // todo: fix this warning
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedUpdateSearch = useCallback(
    debounce((val) => updateSearch(val), 500),
    []
  );

  const handleChange = (e) => {
    debouncedUpdateSearch(e.target.value);
  };

  return (
    <HStack justify="space-between" px={40} py={6}>
      <InputGroup w="sm">
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Search"
          variant="flushed"
          onChange={handleChange}
        />
      </InputGroup>
      <HStack justify="flex-end" spacing={3}>
        {filters.map((props) => (
          <DropDownMenu
            key={props.name}
            {...props}
            updateFilter={updateFilter}
          />
        ))}
        <Button
          rightIcon={<SmallCloseIcon />}
          variant="ghost"
          size="sm"
          onClick={clearFilters}
        >
          Clear
        </Button>
      </HStack>
    </HStack>
  );
};

const DropDownMenu = ({ name, values, updateFilter }) => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant="ghost"
        size="sm"
      >
        {name}
      </MenuButton>
      <MenuList>
        {values.map((val) => (
          <MenuItem
            key={val}
            onClick={() => updateFilter(name.toLowerCase(), val.toLowerCase())}
          >
            {val}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default CatalogFilter;
