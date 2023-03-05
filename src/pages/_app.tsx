import { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import { useStore } from '@/store';
import NextNProgress from 'nextjs-progressbar';
import { Analytics } from '@vercel/analytics/react';
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });
import { commonColors } from '@/styles/constants/colors.constant';
import { appWithTranslation } from 'next-i18next';

interface CustomPageProps { }
function MyApp({ Component, pageProps }: AppProps<CustomPageProps>) {
  const { backgroundColor } = useStore();

  return (
    <>
      <NextNProgress color={commonColors.loadingProgress} />
      <div className={poppins.className}>
        <Component {...pageProps} />
        <Analytics />
      </div>
      <style jsx global>{`body { background: ${backgroundColor}; }`}</style>
    </>
  );
}

export default appWithTranslation(MyApp);