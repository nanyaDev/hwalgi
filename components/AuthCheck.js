import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

const AuthCheck = ({ children, isRequired = true }) => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(isRequired, auth?.user);
    if (isRequired && auth.user === false) router.push('/landing');
    if (!isRequired && auth.user) router.push('/dashboard');
  }, [auth, router, isRequired]);

  // ? - why does if(!auth) work in flytrap and usehooks.com
  // ? - is conditional chaining required
  // todo - refactor convoluted conditionals
  if (auth.user === null) return <Spinner />;
  if (isRequired && !auth?.user) return <Spinner />;
  if (!isRequired && auth?.user) return <Spinner />;
  else return <>{children}</>;
};

export default AuthCheck;
