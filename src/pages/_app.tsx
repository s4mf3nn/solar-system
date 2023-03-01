import { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import { useStore } from '@/store';
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

interface CustomPageProps { }
function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  const { backgroundColor } = useStore();

  return (
    <>
      <div className={poppins.className}>
        <Component {...pageProps} />
      </div>
      <style jsx global>{`
        body { background: ${backgroundColor}; }
      `}</style>
    </>
  );
}

export default MyApp;