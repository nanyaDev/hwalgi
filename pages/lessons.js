import { useEffect } from 'react';
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
  const mode =
    (lessonIndex % 5 === 0 && lessonIndex !== reviewIndex) ||
    lessonIndex === lessons?.length
      ? 'review'
      : 'lesson';

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
            {mode === 'lesson' ? (
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
            ) : (
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
          </Card>
          {mode === 'lesson' && <LessonTags tags={tags} curr={curr} />}
        </Shell>
      </ContentCheck>
    </AuthCheck>
  );
};

export default Lessons;
