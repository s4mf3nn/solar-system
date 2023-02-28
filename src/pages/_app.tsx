import { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

interface CustomPageProps { }
function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  return (
    <div className={poppins.className}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;