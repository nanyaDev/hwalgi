import { Button, Flex, Kbd, Text } from '@chakra-ui/react';

import AuthCheck from '@/components/AuthCheck';
import Navbar from '@/components/Navbar';
import useToggle from '@/lib/useToggle';
import useKey from '@/lib/useKey';
import useLessons from '@/lib/useLessons';
import { Card, Prompt, Shell, TitleBar } from '@/components/Flashcard';
import { cardData } from '@/utils/mockData';

const Lessons = () => {
  const lessonData = cardData;

  const [context, toggleContext] = useToggle(true);
  const { index, lesson, handleNext, handleBack } = useLessons(lessonData);

  // todo: modify useKey to take multiple key arguments e.g. 'Enter Backspace'
  useKey('ArrowRight', handleNext);
  useKey('Enter', handleNext);

  useKey('ArrowLeft', handleBack);
  useKey('Backspace', handleBack);

  // todo: disable buttons and keys when they shouldn't be pressed
  // todo: Prompt component name doesn't make much sense in lesson context
  return (
    <AuthCheck>
      <Navbar />
      <Shell>
        <Card>
          <TitleBar
            title={lesson.title}
            index={index}
            totalCount={lessonData.length}
            context={context}
            toggleContext={toggleContext}
          />
          <Prompt context={context} item={lesson} />
          <Info lesson={lesson} />
          <LessonButtons handleBack={handleBack} handleNext={handleNext} />
        </Card>
      </Shell>
    </AuthCheck>
  );
};

const Info = ({ lesson }) => (
  <>
    <Text fontSize="32px" color="gray.600">
      {lesson.definitions[0]}
    </Text>
    <Text fontSize="24px" color="gray.400">
      {lesson.definitions.slice(1)}
    </Text>
  </>
);

const LessonButtons = ({ handleBack, handleNext }) => (
  <Flex justify="space-between" mt="auto" mb={16} w="md">
    <Button
      variant="ghost"
      border="1px"
      colorScheme="purple"
      onClick={handleBack}
    >
      <Kbd mr={2}>←</Kbd> Back
    </Button>
    <Button
      variant="ghost"
      border="1px"
      colorScheme="blue"
      onClick={handleNext}
    >
      Next <Kbd ml={2}>↵</Kbd>
    </Button>
  </Flex>
);

export default Lessons;
