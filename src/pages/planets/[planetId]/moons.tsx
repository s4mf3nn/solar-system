import { getMoons } from '@/api/getMoons';
import { Close, Heading, Info, Text } from '@/components';
import { useStore } from '@/store';
import { commonColors } from '@/styles/constants/colors.constant';
import * as sc from '@/styles/moons.style';
import { translatePlanetName } from '@/utils/translatePlanetName';
import { GetServerSideProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Moons({ data, planetId }: any) {
  const router = useRouter();
  const { t, i18n } = useTranslation('common');
  const { changeBackgroundColor } = useStore();
  const [planetName, setPlanetName] = useState<string>('');

  // Set the planet name and the background color
  useEffect(() => {
    changeBackgroundColor(commonColors.moonPageBackground);
    setPlanetName(translatePlanetName(i18n.language, planetId, data[0].aroundPlanet.planet));
  }, []);

  // Go to the previous page
  const handleClick = () => router.push(`/planets/${planetId}`);

  // Get the translated moon name
  const moonName = (englishName: string, frenchName: string): string => {
    return i18n.language === "en" ? englishName : frenchName;
  };

  return (
    <>
      <Head>
        <title>{t('moonHeadTitle', { count: data.length, planet: planetName })}</title>
        <meta name="description" content={`Things to know about the moon(s) of planet ${planetId}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <sc.Wrapper>
        <sc.Header>
          <Text color={commonColors.moonPageText} bold={true}>
            {t('moonSubTitle', { count: data.length, planet: planetName })}
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
                  `${t('distFrom')} ${planetName} : ${moon.semimajorAxis.toLocaleString()} km`,
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { planetId } = ctx.query;
  const { data, notFound } = await getMoons(planetId as string);

  if (notFound) return { notFound: true };

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale as string, ['common'])),
      data,
      planetId
    }
  };
};
