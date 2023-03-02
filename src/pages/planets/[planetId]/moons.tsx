import { useEffect } from 'react';
import { useStore } from '@/store';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Close, Heading, Info, Text } from '@/components';
import { getMoons } from '@/api/getMoons';
import * as sc from '@/styles/moons.style';
import { commonColors } from '@/styles/constants/colors.constant';
import { IGetServerSideMoonsProps } from '@/interfaces/common.interface';

export default function Moons({ data, planetId }: any) {
  const router = useRouter();
  const { changeBackgroundColor } = useStore();

  useEffect(() => {
    changeBackgroundColor(commonColors.moonPageBackground);
  }, []);

  // Go to the previous page
  const handleClick = () => router.push(`/planets/${planetId}`);

  return (
    <>
      <Head>
        <title>{data.length > 1 ? `The ${data.length} moons of planet ${planetId}` : `The moon of planet ${planetId}`}</title>
        <meta name="description" content={`Things to know about the moon(s) of planet ${planetId}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <sc.Wrapper>
        <sc.Header>
          <Text color={commonColors.moonPageText} bold={true}>
            {data.length > 1
              ? `Moons of ${planetId}`
              : `Moon of ${planetId}`
            }
          </Text>
          <Close color={commonColors.moonPageText} handleClick={handleClick} />
        </sc.Header>
        <Heading color={commonColors.moonPageText} type="h1">
          {data.length > 1
            ? `${data.length} moons`
            : "1 moon"
          }
        </Heading>
        <sc.Spacer size="2.5rem" />
        <sc.Layout>
          {data.map((moon: { meanRadius: number; semimajorAxis: number; englishName: string; }, i: number) =>
            <sc.CardContainer key={i}>
              <Info
                color={commonColors.moonPageText}
                title={moon.englishName}
                subtitles={[`Distance from ${planetId} : ${moon.semimajorAxis.toLocaleString()} km`, `Radius : ${moon.meanRadius.toLocaleString()} km`]}
              />
            </sc.CardContainer>
          )}
        </sc.Layout>
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
