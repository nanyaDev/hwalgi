import { useEffect } from 'react';
import { Text } from '@chakra-ui/react';

import AuthCheck from '@/components/AuthCheck';
import GradientBar from '@/components/GradientBar';
import Navbar from '@/components/Navbar';
import ContentCheck from '@/components/ContentCheck';
import useToggle from '@/lib/useToggle';
import useKey from '@/lib/useKey';
import useLessons from '@/lib/useLessons';
import useReviews from '@/lib/useReviews';
// prettier-ignore
import { Card, TitleBar, Prompt, Info,  Response, Shell, LessonButtons, ReviewButtons, LessonTags } from '@/components/Flashcard';
import { useAuth } from '@/lib/auth';

const Lessons = () => {
  const { user } = useAuth();
  const [context, toggleContext] = useToggle(true);
  // prettier-ignore
  const { lessons, setLessons, index: lessonIndex, handleNext, handleBack } = useLessons();
  // prettier-ignore
  const { reviews, setReviews, index: reviewIndex, value, grade, handleInput, handleSubmit, handleRetry } = useReviews('lessons');

  const lesson = lessons?.[lessonIndex];
  const review = reviews?.[reviewIndex];

  // ? is this the best way of doing it
  // ? if (lessons === null) return <Loader /> might eliminate a lot of ?. chaining
  let mode;
  if (lessons !== null && lessons?.length === 0) {
    mode = 'none';
  } else if (
    lessonIndex === lessons?.length &&
    reviewIndex === reviews?.length
  ) {
    mode = 'completed';
  } else if (lessonIndex % 5 === 0 && lessonIndex < reviewIndex) {
    mode = 'review';
  } else if (lessonIndex === lessons?.length) {
    mode = 'review';
  } else {
    mode = 'lesson';
  }

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

  // ? shouldn't this go in useLessons
  const cursor = Math.floor(lessonIndex / 5) * 5;
  const curr = lessonIndex - cursor;
  const tags = lessons?.slice(cursor, cursor + 5).map((wObj) => wObj.word);

  useEffect(() => {
    if (user) {
      (async () => {
        const response = await fetch('/api/lessons', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', token: user.token },
          credentials: 'same-origin',
        });
        const responseJSON = await response.json();
        setLessons(responseJSON);
        setReviews(responseJSON);
      })();
    }
  }, [user, setLessons, setReviews]);

  // todo: disable buttons and keys when they shouldn't be pressed
  // todo: Prompt component name doesn't make much sense in lesson context
  return (
    <AuthCheck>
      <ContentCheck content={lessons}>
        <GradientBar />
        <Navbar />
        <Shell>
          <Card>
            {mode === 'lesson' && (
              <>
                <TitleBar
                  title={lesson?.title}
                  index={reviewIndex}
                  totalCount={lessons?.length}
                  context={context}
                  toggleContext={toggleContext}
                />
                <Prompt context={context} item={lesson} />
                <Info lesson={lesson} />
                <LessonButtons
                  handleBack={handleBack}
                  handleNext={handleNext}
                />
              </>
            )}
            {mode === 'review' && (
              <>
                <TitleBar
                  title={review?.title}
                  index={reviewIndex}
                  totalCount={reviews?.length}
                  context={context}
                  toggleContext={toggleContext}
                />
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
            {mode === 'none' && (
              <Text fontWeight="light" color="gray.700" fontSize="3xl">
                You have no lessons! 😱
              </Text>
            )}
            {mode === 'completed' && (
              <Text fontWeight="light" color="gray.700" fontSize="3xl">
                You&#39;re all done with your lessons! 🎉
              </Text>
            )}
          </Card>
          {mode === 'lesson' && <LessonTags tags={tags} curr={curr} />}
        </Shell>
      </ContentCheck>
    </AuthCheck>
  );
};

export default Lessons;
