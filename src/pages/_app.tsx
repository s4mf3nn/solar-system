import { useStore } from '@/store';
import { commonColors } from '@/styles/constants/colors.constant';
import { Poppins } from '@next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import NextNProgress from 'nextjs-progressbar';
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] });

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