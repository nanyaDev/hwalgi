import { ChakraProvider } from '@chakra-ui/react';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';

import { AuthProvider } from '@/lib/auth';
import theme from '@/styles/theme';
import SEO from '../next-seo.config';

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();

  const path = pathname.split('/')[1];
  const title = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <DefaultSeo {...SEO} title={title} />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
