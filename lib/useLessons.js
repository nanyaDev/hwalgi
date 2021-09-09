import { useState } from 'react';

const useLessons = (initialLessons) => {
  const [lessons, setLessons] = useState(initialLessons);
  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex(index + 1);
  const handleBack = () => setIndex(index - 1);

  return { lessons, setLessons, index, handleNext, handleBack };
};

export default useLessons;
