import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useStore } from '@/store';
import { Close, Heading, Info, Text } from '@/components';
import { getMoons } from '@/api/getMoons';
import * as sc from '@/styles/moons.style';
import { commonColors } from '@/styles/constants/colors.constant';
import { IGetServerSideMoonsProps } from '@/interfaces/common.interface';

export default function Moons({ data, planetId }: any) {
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  const { changeBackgroundColor } = useStore();

  useEffect(() => {
    changeBackgroundColor(commonColors.moonPageBackground);
  }, []);

  // Go to the previous page
  const handleClick = () => router.push(`/planets/${planetId}`);

  // Get the translated planet name
  const planetName = i18n.language === "en"
    ? planetId
    : data[0].aroundPlanet.planet === "terre"
      ? "la Terre"
      : data[0].aroundPlanet.planet;

  // Get the translated moon name
  const moonName = (englishName: string, frenchName: string): string => {
    return i18n.language === "en" ? englishName : frenchName;
  };

  // Capitalize a string
  const capitalize = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <Head>
        <title>{t('moonHeadTitle', { count: data.length, planet: capitalize(planetName) })}</title>
        <meta name="description" content={`Things to know about the moon(s) of planet ${planetId}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <sc.Wrapper>
        <sc.Header>
          <Text color={commonColors.moonPageText} bold={true}>
            {t('moonSubTitle', { count: data.length, planet: capitalize(planetName) })}
          </Text>
          <Close color={commonColors.moonPageText} handleClick={handleClick} />
        </sc.Header>
        <Heading color={commonColors.moonPageText} type="h1">
          {t('moonTitle', { count: data.length })}
        </Heading>
        <sc.Spacer size="2.5rem" />
        <sc.Layout>
          {data.map((moon: { meanRadius: number; semimajorAxis: number; englishName: string; name: string; }, i: number) =>
            <sc.CardContainer key={i}>
              <Info
                color={commonColors.moonPageText}
                title={moonName(moon.englishName, moon.name)}
                subtitles={[
                  `${t('distFrom')} ${capitalize(planetName)} : ${moon.semimajorAxis.toLocaleString()} km`,
                  `${t('radius')} : ${moon.meanRadius.toLocaleString()} km`
                ]}
              />
            </sc.CardContainer>
          )}
        </sc.Layout>
      </sc.Wrapper>
    </>
  );
}

export async function getServerSideProps(context: { query: { planetId: string; }; locale: string; }): Promise<IGetServerSideMoonsProps> {
  const { planetId } = context.query;
  const { data, notFound } = await getMoons(planetId);

  if (notFound) return { notFound: true };

  return {
    props: {
      ...(await serverSideTranslations(context.locale ?? 'en', ['common'])),
      data,
      planetId
    }
  };
}
