import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { Button, Heading, Text } from '@/components';
import { useStore } from '@/store';
import { commonColors } from '@/styles/constants/colors.constant';
import * as sc from '@/styles/404.style';

export default function FourOhFour() {
  const { changeBackgroundColor } = useStore();

  useEffect(() => {
    changeBackgroundColor(commonColors.notFoundBackground);
  }, []);

  return (
    <>
      <Head>
        <title>404 - Not found</title>
        <meta name="description" content={"404 - Not found"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <sc.Wrapper>
        <Heading type="h1" color={commonColors.notFoundText}>404</Heading>
        <sc.Spacer size="2rem" />
        <Text color={commonColors.notFoundText}>Your journey through our website has taken you to a place where time and space converge, and the laws of physics break down. You may have stumbled into a digital black hole, where our 404 not found page has been pulled into the abyss. We recommend retracing your steps back to a safer, more stable part of the site.</Text>
        <sc.Spacer size="1.5rem" />
        <Link href={"/"}>
          <Button color={commonColors.notFoundText} label="Try to escape" />
        </Link>
      </sc.Wrapper>
    </>
  );
};