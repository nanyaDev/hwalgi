import { useEffect } from 'react';

// cf. https://www.caktusgroup.com/blog/2020/07/01/usekeypress-hook-react/
// ? does the dependency array cause unnecessary rerenders compared to an empty array
const useKey = (key, action) => {
  useEffect(() => {
    const onKeydown = (e) => {
      if (e.key === key) action();
    };

    window.addEventListener('keydown', onKeydown);

    return () => window.removeEventListener('keydown', onKeydown);
  }, [action, key]);
};

export default useKey;
