// prettier-ignore
import { Checkbox, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { BiCheck, BiExit } from 'react-icons/bi';

const ActionBar = ({ numSelected, checkbox, handleCheckbox }) => (
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
      />
      <IconButton
        icon={<BiExit />}
        variant="solid"
        borderRadius="full"
        colorScheme="blue"
        aria-label="known"
      />
    </HStack>
  </Flex>
);

export default ActionBar;
