import AuthCheck from '@/components/AuthCheck';
import GradientBar from '@/components/GradientBar';
import Navbar from '@/components/Navbar';
import useKey from '@/lib/useKey';
import useToggle from '@/lib/useToggle';
import useReviews from '@/lib/useReviews';
// prettier-ignore
import { Shell, Card, TitleBar, Prompt, Response, ReviewButtons } from 'components/Flashcard';
import { cardData } from '@/utils/mockData';

// card layout uses auto margins on the TitleBar and Buttons
// cf. https://stackoverflow.com/questions/32551291/
// todo: abstract background to shell
const Reviews = () => {
  const reviewData = cardData;

  const [context, toggleContext] = useToggle(true);
  // prettier-ignore
  const { index, review, value, grade, handleInput, handleSubmit, handleRetry, } = useReviews(reviewData);

  useKey('Enter', handleSubmit);
  useKey('Escape', handleRetry);

  return (
    <AuthCheck>
      <GradientBar />
      <Navbar />
      <Shell>
        <Card>
          <TitleBar
            title={review.title}
            index={index}
            totalCount={reviewData.length}
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
    </AuthCheck>
  );
};

export default Reviews;
