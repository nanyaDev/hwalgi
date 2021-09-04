import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Box } from '@chakra-ui/react';

const MotionBox = motion(Box);

// ? is putting these outside to prevent useEffect rerenders the best way
const enter = {
  y: 0,
  transition: { type: 'spring', duration: 1, bounce: 0.3 },
};

const exit = { y: '200%' };

const Slide = ({ children, inView }) => {
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start(enter);
    } else {
      animation.start(exit);
    }
  }, [animation, inView]);

  return (
    <MotionBox
      w="fit-content"
      pos="fixed"
      bottom="30px"
      right="30px"
      initial={exit}
      animate={animation}
    >
      {children}
    </MotionBox>
  );
};

export default Slide;
