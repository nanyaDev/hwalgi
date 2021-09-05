import AuthCheck from '@/components/AuthCheck';
import GradientBar from '@/components/GradientBar';
import Navbar from '@/components/Navbar';
import useToggle from '@/lib/useToggle';
import useKey from '@/lib/useKey';
import useLessons from '@/lib/useLessons';
import useReviews from '@/lib/useReviews';
// prettier-ignore
import { Card, TitleBar, Prompt, Info,  Response, Shell, LessonButtons, ReviewButtons } from '@/components/Flashcard';
import { cardData } from '@/utils/mockData';

const Lessons = () => {
  const lessonData = cardData;

  const [context, toggleContext] = useToggle(true);
  // prettier-ignore
  const { index: lessonIndex, lesson, handleNext, handleBack } = useLessons(lessonData);
  // prettier-ignore
  const { index: reviewIndex, review, value, grade, handleInput, handleSubmit, handleRetry } = useReviews(lessonData);

  // ? is this the best way of doing it
  const mode =
    lessonIndex % 5 === 0 && lessonIndex !== reviewIndex ? 'review' : 'lesson';

  const forwards = () => {
    mode === 'lesson' ? handleNext() : handleSubmit();
  };

  const backwards = () => {
    mode === 'lesson' ? handleBack() : handleRetry();
  };

  // todo: modify useKey to take multiple key arguments e.g. 'Enter Backspace'
  // todo: having same hotkeys for lessons and reviews isn't great
  useKey('ArrowRight', forwards);
  useKey('Enter', forwards);

  useKey('ArrowLeft', backwards);
  useKey('Escape', backwards);

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
            index={reviewIndex}
            totalCount={lessonData.length}
            context={context}
            toggleContext={toggleContext}
          />
          {mode === 'lesson' ? (
            <>
              <Prompt context={context} item={lesson} />
              <Info lesson={lesson} />
              <LessonButtons handleBack={handleBack} handleNext={handleNext} />
            </>
          ) : (
            <>
              <Prompt context={context} item={review} />
              <Response
                grade={grade}
                value={value}
                review={review}
                handleInput={handleInput}
              />
              <ReviewButtons
                handleRetry={handleRetry}
                handleSubmit={handleSubmit}
              />
            </>
          )}
        </Card>
      </Shell>
    </AuthCheck>
  );
};

export default Lessons;
