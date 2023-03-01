import { useEffect } from 'react';
import { useStore } from '@/store';
import Head from 'next/head';
import { getPlanet } from '@/api/getPlanet';
import Link from 'next/link';
import * as sc from '@/styles/planet.style';
import { IGetPlanetDataQuery, IGetServerSidePlanetsProps, IPlanetData, IQuery } from '@/interfaces/common.interface';
import { bodyPrimaryColor } from '@/styles/bodyColors.constant';

export default function Planets({ data }: IPlanetData) {
  const { changeBackgroundColor } = useStore();

  const getBackgroundColor = () => {
    return bodyPrimaryColor[data.id];
  };

  useEffect(() => {
    const backgroundColor = getBackgroundColor();
    changeBackgroundColor(backgroundColor);
  }, []);

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

  return { props: { data } };
}
