import { useState } from 'react';

// todo: this hook feels like a strange abstraction, returns too much
// todo: bundling a controlled input is especially weird
const useReviews = (initialReviews) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [index, setIndex] = useState(0);
  const [grade, setGrade] = useState(null);
  const [value, setValue] = useState('');

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  // todo: error should push the failed item back
  const handleSubmit = () => {
    // ? this seems to cause 3 rerenders, why aren't they batched
    if (grade !== null) {
      setGrade(null);
      setValue('');
      // ? should this use a update function
      setIndex(index + 1);
      return;
    }

    setGrade(reviews[index].definitions.includes(value));
  };

  // todo: disable retry for success and remove setSuccess below
  const handleRetry = () => {
    setGrade(null);
    setValue('');
  };

  // prettier-ignore
  return { reviews, setReviews, index , value, grade, handleInput, handleSubmit, handleRetry };
};

export default useReviews;
