import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from './auth.js';

// https://usehooks.com/useRequireAuth/
// https://nextjs.org/docs/api-reference/next/router
// - Convert to arrow functions
// - Remov useRouter()
// - Add `redirect` to useEffect parameters
const useRequireAuth = (redirect = '/login') => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.user === false) {
      router.push(redirect);
    }
  }, [auth, router, redirect]);

  return auth;
};

export default useRequireAuth;
