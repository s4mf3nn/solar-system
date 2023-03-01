import { useEffect } from 'react';
import { useStore } from '@/store';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Close, Heading, Info, Text } from '@/components';
import { getMoons } from '@/api/getMoons';
import * as sc from '@/styles/moons.style';
import { IGetServerSideMoonsProps } from '@/interfaces/common.interface';

const bodyPrimaryColor = "#f7f6f6";
const bodySecondaryColor = "#373737";

export default function Moons({ data, planetId }: any) {
  const router = useRouter();
  const { changeBackgroundColor } = useStore();

  useEffect(() => {
    changeBackgroundColor(bodyPrimaryColor);
  }, []);

  // Go to the previous page
  const handleClick = () => router.back();

  console.log(data);
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
          <Text color={bodySecondaryColor} bold={true}>
            {data.length > 1
              ? `Moons of ${planetId}`
              : `Moon ${planetId}`
            }
          </Text>
          <Close color={bodySecondaryColor} handleClick={handleClick} />
        </sc.Header>
        <Heading color={bodySecondaryColor} type="h1">
          {data.length > 1
            ? `${data.length} moons`
            : "1 moon"
          }
        </Heading>
        <sc.Spacer size="2.5rem" />
        <sc.Layout>
          {data.map((moon: { meanRadius: number; semimajorAxis: number; name: string; }, i: number) =>
            <sc.CardContainer key={i}>
              <Info
                color={bodySecondaryColor}
                title={moon.name}
                subtitles={[`Distance from Mars : ${moon.semimajorAxis.toLocaleString()} km`, `Radius : ${moon.meanRadius.toLocaleString()} km`]}
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
