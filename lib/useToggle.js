import { useCallback, useState } from 'react';

// cf. https://usehooks.com/useToggle/
const useToggle = (initialState = false) => {
  const [state, setState] = useState(initialState);

  // ? why does this need useCallback()
  // ? why is setState passed an empty array as a second parameter
  const toggleState = useCallback(() => setState((state) => !state), []);

  return [state, toggleState];
};

export default useToggle;
