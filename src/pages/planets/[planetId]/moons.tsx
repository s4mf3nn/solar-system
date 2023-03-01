import { useEffect } from 'react';
import { useStore } from '@/store'; import Head from 'next/head';
import { getMoons } from '@/api/getMoons';
import * as sc from '@/styles/moons.style';
import { IGetServerSideMoonsProps } from '@/interfaces/common.interface';

export default function Moons({ data, planetId }: any) {
  const { changeBackgroundColor } = useStore();

  useEffect(() => {
    changeBackgroundColor('#ededed');
  }, []);

  return (
    <>
      <Head>
        <title>{data.length > 1 ? `The ${data.length} moons of planet ${planetId}` : `The moon of planet ${planetId}`}</title>
        <meta name="description" content={`Things about the moon(s) of planet ${planetId}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <sc.Wrapper>
        <pre>{JSON.stringify(data)}</pre>
      </sc.Wrapper>
    </>
  );
}

export async function getServerSideProps(context: { query: any; }): Promise<IGetServerSideMoonsProps> {
  const { planetId } = context.query;
  const { data, notFound } = await getMoons(planetId);

  if (notFound) return { notFound: true };

  return { props: { data, planetId } };
}
