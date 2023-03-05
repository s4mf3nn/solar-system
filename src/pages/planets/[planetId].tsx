import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useStore } from '@/store';
import { getPlanet } from '@/api/getPlanet';
import { Button, Close, Heading, Info, Text } from '@/components';
import * as sc from '@/styles/planet.style';
import { bodyPrimaryColor, bodySecondaryColors } from '@/styles/constants/colors.constant';
import { IGetPlanetDataQuery, IGetServerSidePlanetsProps, IPlanetData, IQuery } from '@/interfaces/common.interface';

export default function Planets({ data }: IPlanetData) {
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  const [color, _] = useState<string>(bodySecondaryColors[data.id]);
  const { changeBackgroundColor, descriptionList } = useStore();

  useEffect(() => {
    const backgroundColor = getBackgroundColor();
    changeBackgroundColor(backgroundColor);
  }, []);

  // Get the specific background color for the selected planet
  const getBackgroundColor = (): string => {
    return bodyPrimaryColor[data.id];
  };

  // Get the planet description from the store in the selected language
  const getDescription = (): string => {

    return descriptionList
      .filter(item => item.name === data.id)
      .map(({ englishDescription, frenchDescription }) => i18n.language === 'en'
        ? englishDescription
        : frenchDescription)[0];
  };

  // Format the value with a unit
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

  // Go to the main page
  const handleClick = () => router.push("/");

  // Get the translated planet name
  const planetName = i18n.language === "en"
    ? data.englishName
    : data.id === "terre"
      ? "La Terre"
      : data.id;

  // Capitalize a string
  const capitalize = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <Head>
        <title>{t("planetHeadTitle", { planet: capitalize(planetName) })}</title>
        <meta name="description" content={`Things about the planet ${data.englishName}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <sc.Wrapper>
        <sc.Header>
          <Text color={color} bold={true}>{t('planetSubTitle')}</Text>
          <Close color={color} handleClick={handleClick} />
        </sc.Header>
        <Heading color={color} type="h1" capitalize>{planetName}</Heading>
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
            <Button
              color={color}
              label={t('seeMoon', { count: data.moons.length })}
            />
          </Link>
        }
        <sc.Spacer size="2rem" />
        <sc.InfoContainer>
          <Info
            color={color}
            title={getInfo(data.semimajorAxis, "km", 0)}
            subtitles={[`${t('distFromSun')}`]}
          />
          <sc.Spacer size="1rem" />
          <Info
            color={color}
            title={getInfo(data.meanRadius, "km", 1)}
            subtitles={[`${t('radius')}`]}
          />
          <sc.Spacer size="1rem" />
          <Info
            color={color}
            title={getInfo((data.avgTemp - 273.15), "°C", 1)}
            subtitles={[`${t('avgTmp')}`]}
          />
          <sc.Spacer size="1rem" />
          <Info
            color={color}
            title={getInfo(data.gravity, "m/s²", 1)}
            subtitles={[`${t('gravity')}`]}
          />
          <sc.Spacer size="1rem" />
          <Info
            color={color}
            title={getInfo(data.sideralOrbit, "yearDuration", 1)}
            subtitles={[`${t('yearDuration')}`]}
          />
          <sc.Spacer size="1rem" />
          <Info
            color={color}
            title={getInfo(data.sideralRotation, "dayDuration", 2)}
            subtitles={[`${t('dayDuration')}`]}
          />
          <sc.Spacer size="1rem" />
          <Info
            color={color}
            title={getInfo(data.axialTilt, "°", 1)}
            subtitles={[`${t('axialTilt')}`]}
          />
          <sc.Spacer size="1rem" />
          <Info
            color={color}
            //@ts-ignore
            title={data.population.toLocaleString('en-US')}
            subtitles={[`${t('population')}`]}
          />
        </sc.InfoContainer>
      </sc.Wrapper>
    </>
  );
}

export async function getServerSideProps(context: { query: { planetId: string; }; locale: string; }): Promise<IGetServerSidePlanetsProps> {
  const { planetId } = context.query;
  const { data, notFound }: IGetPlanetDataQuery = await getPlanet(planetId);

  // Return 404 page if no body was found
  if (notFound) return { notFound: true };

  return {
    props: {
      ...(await serverSideTranslations(context.locale, ['common'])),
      data
    }
  };
}
