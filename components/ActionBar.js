// prettier-ignore
import { Checkbox, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { BiCheck, BiExit } from 'react-icons/bi';

// prettier-ignore
const ActionBar = ({ numSelected, checkbox, handleCheckbox, addToKnown, addToLessons }) => (
  <Flex
    pos="fixed"
    right={4}
    bottom={4}
    w="xs"
    justify="space-between"
    align="center"
    borderRadius="10px"
    bg="white"
    boxShadow="0 0 50px 0 var(--chakra-colors-gray-400)"
    px={5}
    py={3}
  >
    <HStack spacing={4}>
      <Checkbox
        size="lg"
        colorScheme="blue"
        isChecked={checkbox}
        onChange={handleCheckbox}
      />
      <Text fontWeight="medium" color="gray.700">
        {numSelected} selected
      </Text>
    </HStack>
    <HStack spacing={4}>
      <IconButton
        icon={<BiCheck />}
        variant="outline"
        borderRadius="full"
        colorScheme="green"
        aria-label="known"
        onClick={addToKnown}
      />
      <IconButton
        icon={<BiExit />}
        variant="solid"
        borderRadius="full"
        colorScheme="blue"
        aria-label="known"
        onClick={addToLessons}
      />
    </HStack>
  </Flex>
);

export default ActionBar;
