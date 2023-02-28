import Head from 'next/head';
import Link from 'next/link';
import GlobalStyle from '@/styles/globalStyles';
import * as sc from './style';

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
        {data.map((planet: any) => (
          <Link href={`/planets/${planet.id}`} key={planet.id}>
            <h2 >{planet.name}</h2>
            <p>{planet.description}</p>
            <div>See more</div>
          </Link>
        ))}
      </sc.Wrapper>
    </>
  );
}

export async function getStaticProps(): Promise<IGetStaticSolarSystemProps> {
  const data: IGetAllPlanetsDataQuery[] | undefined = await getAllPlanets();
  return { props: { data } };
};