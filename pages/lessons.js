import AuthCheck from '@/components/AuthCheck';
import GradientBar from '@/components/GradientBar';
import Navbar from '@/components/Navbar';
import useToggle from '@/lib/useToggle';
import useKey from '@/lib/useKey';
import useLessons from '@/lib/useLessons';
// prettier-ignore
import { Card, Info, LessonButtons, Prompt, Shell, TitleBar } from '@/components/Flashcard';
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
      <GradientBar />
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

export default Lessons;
