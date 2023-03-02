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
  const { changeBackgroundColor, descriptionList } = useStore();

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

  const getDescription = (): string => {
    return descriptionList.filter(item => item.name === data.id).map(({ description }) => description || "")[0];
  };

  /**
   * Format the value with a unit
   * @returns {string}
   */
  const getInfo = (value: number, unit: string, decimal: number): string => {
    if (!decimal) {
      return `${value.toLocaleString('en-US')} ${unit}`;
    }

    if (unit === 'yearDuration') {
      if (Math.abs(value) <= 730) {
        //@ts-ignore
        return `${Math.abs(value).toFixed(decimal).toLocaleString('en-US')} days`;
      }
      //@ts-ignore
      return `${Math.abs(value / 365).toFixed(decimal).toLocaleString('en-US')} years`;
    }

    if (unit === 'dayDuration') {
      if (Math.abs(value) <= 48) {
        //@ts-ignore
        return `${Math.abs(value).toFixed(decimal).toLocaleString('en-US')} hours`;
      }
      //@ts-ignore
      return `${Math.abs(value / 24).toFixed(decimal).toLocaleString('en-US')} days`;
    }

    //@ts-ignore
    return `${value.toFixed(decimal).toLocaleString('en-US')} ${unit}`;
  };

  /**
   * Go to the main page
   */
  const handleClick = () => router.push("/");

  return (
    <>
      <Head>
        <title>Planet {data.englishName}</title>
        <meta name="description" content={`Things about the planet ${data.englishName}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <sc.Wrapper>
        <sc.Header>
          <Text color={color} bold={true}>Things to know about</Text>
          <Close color={color} handleClick={handleClick} />
        </sc.Header>
        <Heading color={color} type="h1">{data.englishName}</Heading>
        <sc.Spacer size="1rem" />
        <sc.Divider color={color} />
        <sc.Spacer size="1rem" />
        <Text color={color}>
          {getDescription()}
        </Text>
        <sc.Spacer size="2rem" />
        {data.moons &&
          <>
            <sc.MoonContainer>
              {data.moons.map((_, index) => <sc.Moon key={index} color={color} />)}
            </sc.MoonContainer>
            <sc.Spacer size="1.5rem" />
          </>
        }
        {data.moons &&
          <Link href={`/planets/${data.englishName}/moons`}>
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
            title={getInfo((data.avgTemp - 273.15), "°C", 1)}
            subtitles={["Average temperature"]}
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
            title={getInfo(data.sideralOrbit, "yearDuration", 1)}
            subtitles={["One year duration"]}
          />
          <sc.Spacer size="1rem" />
          <Info
            color={color}
            title={getInfo(data.sideralRotation, "dayDuration", 2)}
            subtitles={["One day duration"]}
          />
          <sc.Spacer size="1rem" />
          <Info
            color={color}
            title={getInfo(data.axialTilt, "°", 1)}
            subtitles={["Axial tilt"]}
          />
          <sc.Spacer size="1rem" />
          <Info
            color={color}
            //@ts-ignore
            title={data.population.toLocaleString('en-US')}
            subtitles={["Population"]}
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
