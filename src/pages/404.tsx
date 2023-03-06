import { Button, Heading, Text } from '@/components';
import { useStore } from '@/store';
import * as sc from '@/styles/404.style';
import { commonColors } from '@/styles/constants/colors.constant';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

export default function FourOhFour() {
  const { t } = useTranslation('common');
  const { changeBackgroundColor } = useStore();

  useEffect(() => {
    changeBackgroundColor(commonColors.notFoundBackground);
  }, []);

  return (
    <>
      <Head>
        <title>404 - Not found</title>
        <meta name="description" content="404 - Not found" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <sc.Wrapper>
        <Heading type="h1" color={commonColors.notFoundText}>{t('notFoundTitle')}</Heading>
        <sc.Spacer size="2rem" />
        <Text color={commonColors.notFoundText}>{t('notFoundContent')}</Text>
        <sc.Spacer size="1.5rem" />
        <Link href={"/"}>
          <Button color={commonColors.notFoundText} label={t('goBackHome')} />
        </Link>
      </sc.Wrapper>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale as string, ['common'])),
    }
  };
};