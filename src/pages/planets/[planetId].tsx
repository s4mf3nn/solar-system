import { useEffect, useState } from 'react';
import { useStore } from '@/store';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getPlanet } from '@/api/getPlanet';
import { Button, Close, Heading, Info, Text } from '@/components';
import * as sc from '@/styles/planet.style';
import { bodyPrimaryColor, bodySecondaryColors } from '@/styles/constants/bodyColors.constant';
import { IGetPlanetDataQuery, IGetServerSidePlanetsProps, IPlanetData, IQuery } from '@/interfaces/common.interface';

export default function Planets({ data }: IPlanetData) {
  const router = useRouter();
  const [color, _] = useState<string>(bodySecondaryColors[data.id]);
  const { changeBackgroundColor } = useStore();

  /**
   * Get the specific background color for the selected planet
   * @returns {string} - backgroundColor
   */
  const getBackgroundColor = (): string => {
    return bodyPrimaryColor[data.id];
  };

  useEffect(() => {
    const backgroundColor = getBackgroundColor();
    changeBackgroundColor(backgroundColor);
  }, []);

  /**
   * Format the value with a unit
   * @param value {number}
   * @param unit {string}
   * @param decimal {number}
   * @returns {string}
   */
  const getInfo = (value: number, unit: string, decimal: number): string => {
    if (!decimal) {
      return `${value.toLocaleString()} ${unit}`;
    }
    return `${value.toFixed(decimal).toLocaleString()} ${unit}`;
  };

  /**
   * Go to the previous page
   * Back method has been replaced to prevent a bug
   */
  const handleClick = () => router.push("/");

  return (
    <>
      <Head>
        <title>Planet {data.name}</title>
        <meta name="description" content={`Things about the planet ${data.name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <sc.Wrapper>
        <sc.Header>
          <Text color={color} bold={true}>Things to know about</Text>
          <Close color={color} handleClick={handleClick} />
        </sc.Header>
        <Heading color={color} type="h1">{data.name}</Heading>
        <sc.Spacer size="1rem" />
        <sc.Divider color={color} />
        <sc.Spacer size="1rem" />
        <Text color={color}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum.
        </Text>
        <sc.Spacer size="2rem" />
        {data.moons &&
          <>
            <sc.MoonContainer>
              {data.moons.map(() => <sc.Moon color={color} />)}
            </sc.MoonContainer>
            <sc.Spacer size="1.5rem" />
          </>
        }
        {data.moons &&
          <Link href={`/planets/${data.id}/moons`}>
            <Button color={color} label={data.moons.length > 1
              ? `See the ${data.moons.length} moons`
              : "See the moon"
            } />
          </Link>
        }
        <sc.Spacer size="2rem" />
        <sc.InfoContainer>
          <Info
            color={color}
            title={getInfo(data.semimajorAxis, "km", 0)}
            subtitles={["Distance from the Sun"]}
          />
          <sc.Spacer size="1rem" />
          <Info
            color={color}
            title={getInfo(data.meanRadius, "km", 1)}
            subtitles={["Radius"]}
          />
          <sc.Spacer size="1rem" />
          <Info
            color={color}
            title={getInfo(data.gravity, "m/s²", 1)}
            subtitles={["Gravity"]}
          />
          <sc.Spacer size="1rem" />
          <Info
            color={color}
            title={getInfo(data.sideralOrbit, "days", 1)}
            subtitles={["One year duration"]}
          />
          <sc.Spacer size="1rem" />
          <Info
            color={color}
            title={getInfo(data.sideralRotation, "hours", 2)}
            subtitles={["One day duration"]}
          />
        </sc.InfoContainer>
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
