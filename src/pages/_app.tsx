import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import { useStore } from '@/store';
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

interface CustomPageProps { }
function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { backgroundColor } = useStore();

  useEffect(() => {
    const handleStart = (url: string) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url: string) => (url === router.asPath) && setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  });

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div className={poppins.className}>
        <Component {...pageProps} />
      </div>
      <style jsx global>{`
        body {
          background: ${backgroundColor};
        }
      `}</style>
    </>
  );
}

export default MyApp;