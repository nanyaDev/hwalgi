import { useState } from 'react';

const useLessons = (initialLessons) => {
  const [index, setIndex] = useState(0);

  const lessons = initialLessons;
  const lesson = lessons[index];

  const handleNext = () => setIndex(index + 1);
  const handleBack = () => setIndex(index - 1);

  return { index, lesson, handleNext, handleBack };
};

export default useLessons;
