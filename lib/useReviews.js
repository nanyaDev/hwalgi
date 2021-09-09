import { useState } from 'react';
import { useAuth } from '@/lib/auth';

// todo: this hook feels like a strange abstraction, returns too much
// todo: bundling a controlled input is especially weird
const useReviews = (destination) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState(null);
  const [index, setIndex] = useState(0);
  const [grade, setGrade] = useState(null);
  const [value, setValue] = useState('');

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  // todo: error should push the failed item back
  const handleSubmit = async () => {
    if (grade !== null) {
      let body;
      if (destination === 'lessons') body = [reviews[index].id];
      if (destination === 'reviews') body = { [reviews[index].id]: grade };

      // ? this seems to cause 3 rerenders, why aren't they batched
      setGrade(null);
      setValue('');
      // ? should this use a update function
      setIndex(index + 1);

      // todo: handle API failures
      const response = await fetch(`/api/${destination}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: user.token,
        },
        credentials: 'same-origin',
        body: JSON.stringify(body),
      });
    } else {
      setGrade(reviews[index].definitions.includes(value));
    }
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
