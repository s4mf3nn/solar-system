import Head from 'next/head';
import { Card, Heading, Search, Text } from '@/components';
import GlobalStyle from '@/styles/globalStyles';
import { bodyPrimaryColor } from '@/styles/bodyColors.constant';
import * as sc from './index.style';

import { getAllPlanets } from '@/api/getAllPlanets';
import { ISolarSystemProps, IGetAllPlanetsDataQuery, IGetStaticSolarSystemProps } from '@/interfaces/common.interface';

export default function SolarSystem({ data }: ISolarSystemProps) {

  return (
    <>
      <Head>
        <title>Explore Solar System</title>
        <meta name="description" content="Explore planets and moons of Solar System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <sc.Wrapper>
        <Text color="#fff" bold={true}>Solar System</Text>
        <Heading color="#fff" type="h1">Explore</Heading>
        <sc.Spacer size="2.5rem" />
        <Search placeholder="Search for a planet" />
        <sc.Spacer size="2.5rem" />
        <sc.Layout>
          {data.map((planet, i) => (
            <sc.CardContainer key={i}>
              <Card
                id={planet.id}
                name={planet.name}
                description={planet.description}
                planetColor={bodyPrimaryColor[planet.id]}
              />
            </sc.CardContainer>
          ))}
        </sc.Layout>
      </sc.Wrapper>
    </>
  );
}

export async function getStaticProps(): Promise<IGetStaticSolarSystemProps> {
  const data: IGetAllPlanetsDataQuery[] | undefined = await getAllPlanets();
  return { props: { data } };
};