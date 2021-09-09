import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '@/lib/auth';
import Loader from './Loader';

const AuthCheck = ({ children, isRequired = true }) => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isRequired && auth.user === false) router.push('/landing');
    if (!isRequired && auth.user) router.push('/');
  }, [auth, router, isRequired]);

  // ? - why does if(!auth) work in flytrap and usehooks.com
  // ? - is conditional chaining required
  // todo - refactor convoluted conditionals
  if (auth.user === null) return <Loader />;
  if (isRequired && !auth?.user) return <Loader />;
  if (!isRequired && auth?.user) return <Loader />;
  else return <>{children}</>;
};

export default AuthCheck;
