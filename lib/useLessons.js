import { useState } from 'react';

const useLessons = () => {
  const [lessons, setLessons] = useState(null);
  const [index, setIndex] = useState(0);

  const handleNext = () => setIndex(index + 1);
  const handleBack = () => setIndex(index - 1);

  return { lessons, setLessons, index, handleNext, handleBack };
};

export default useLessons;
