import Head from 'next/head';
import * as sc from '../../styles/planet.style';

import { getPlanet } from '@/api/getPlanet';
import { IGetPlanetDataQuery, IGetServerSidePlanetsProps, IPlanetData, IQuery } from '@/interfaces/common.interface';
import Link from 'next/link';

export default function Planets({ data }: IPlanetData) {

  return (
    <>
      <Head>
        <title>Planet {data.englishName}</title>
        <meta name="description" content={`Things about the planet ${data.englishName}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <sc.Wrapper>
        <pre>{data.semimajorAxis}</pre>
        {data.moons &&
          <Link href={`/planets/${data.id}/moons`}>
            {data.moons.length > 1
              ? `See the ${data.moons.length} moons`
              : "See the moon"
            }
          </Link>
        }
      </sc.Wrapper>
    </>
  );
}

export async function getServerSideProps(context: { query: IQuery; }): Promise<IGetServerSidePlanetsProps> {
  const { planetId } = context.query;
  const { data, notFound }: IGetPlanetDataQuery = await getPlanet(planetId);

  // Return 404 page if no body was found
  if (notFound) return { notFound: true };

  return { props: { data: data } };
}
