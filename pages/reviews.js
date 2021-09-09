import { useEffect } from 'react';

import AuthCheck from '@/components/AuthCheck';
import GradientBar from '@/components/GradientBar';
import Navbar from '@/components/Navbar';
import useKey from '@/lib/useKey';
import useToggle from '@/lib/useToggle';
import useReviews from '@/lib/useReviews';
// prettier-ignore
import { Shell, Card, TitleBar, Prompt, Response, ReviewButtons } from 'components/Flashcard';
import { useAuth } from '@/lib/auth';
import ContentCheck from '@/components/ContentCheck';

// card layout uses auto margins on the TitleBar and Buttons
// cf. https://stackoverflow.com/questions/32551291/
// todo: abstract background to shell
const Reviews = () => {
  const { user } = useAuth();

  const [context, toggleContext] = useToggle(true);
  // prettier-ignore
  const { reviews, setReviews, index, value, grade, handleInput, handleSubmit, handleRetry, } = useReviews(null);

  const review = reviews?.[index];

  useKey('Enter', handleSubmit);
  useKey('Escape', handleRetry);

  useEffect(() => {
    if (user) {
      (async () => {
        const response = await fetch('/api/reviews', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', token: user.token },
          credentials: 'same-origin',
        });
        const responseJSON = await response.json();
        setReviews(responseJSON);
      })();
    }
  }, [user, setReviews]);

  return (
    <AuthCheck>
      <ContentCheck content={reviews}>
        <GradientBar />
        <Navbar />
        <Shell>
          <Card>
            <TitleBar
              title={review?.title}
              index={index}
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
          </Card>
        </Shell>
      </ContentCheck>
    </AuthCheck>
  );
};

export default Reviews;
