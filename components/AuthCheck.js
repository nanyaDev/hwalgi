import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Center, Spinner } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

const AuthCheck = ({ children, isRequired = true }) => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isRequired && auth.user === false) router.push('/landing');
    if (!isRequired && auth.user) router.push('/catalog');
  }, [auth, router, isRequired]);

  // ? - why does if(!auth) work in flytrap and usehooks.com
  // ? - is conditional chaining required
  // todo - refactor convoluted conditionals
  if (auth.user === null) return <Loader />;
  if (isRequired && !auth?.user) return <Loader />;
  if (!isRequired && auth?.user) return <Loader />;
  else return <>{children}</>;
};

const Loader = () => (
  <Center flexGrow={1} w="full">
    <Spinner
      thickness="5px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
    />
  </Center>
);

export default AuthCheck;
