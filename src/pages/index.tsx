import { getAllPlanets } from '@/api/getAllPlanets';
import { Card, Heading, Search, Text } from '@/components';
import { IDescriptionList, IGetAllPlanetsDataQuery, ISolarSystemProps } from '@/interfaces/common.interface';
import { useStore } from '@/store';
import { bodyPrimaryColor, commonColors } from '@/styles/constants/colors.constant';
import * as sc from '@/styles/index.style';
import { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Image from 'next/image';
import Link from "next/link";
import { useEffect, useState } from 'react';

export default function SolarSystem({ data }: ISolarSystemProps) {
  const { t, i18n } = useTranslation('common');
  const [state, setState] = useState(data);
  const [language, setLanguage] = useState<string | undefined>(undefined);
  const [searchValue, setSearchValue] = useState<string>('');
  const { changeBackgroundColor, populateDescriptionList } = useStore();

  // Update background color on page load
  useEffect(() => changeBackgroundColor(commonColors.homePageBackground), []);

  // Update the searchValue on searchInput change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  // Toggle the app language
  const toggleLanguage = () => i18n.language === 'en' ? setLanguage('fr') : setLanguage('en');

  // Set the app language
  useEffect(() => {
    i18n.language === 'en' ? setLanguage('fr') : setLanguage('en');
  }, [i18n.language]);

  // Search and return list of planets that match the searchValue
  useEffect(() => {
    const searchResult = data.filter(planet =>
      planet.id.toLowerCase().includes(searchValue.toLowerCase().trim())
      || planet.name.toLowerCase().includes(searchValue.toLowerCase().trim()));

    setState(searchResult);
  }, [searchValue]);

  // Store the description of each planet
  useEffect(() => {
    const descriptionList: IDescriptionList[] = [];
    data.map(planet => {
      descriptionList.push({
        name: planet.id,
        englishDescription: planet.englishDescription,
        frenchDescription: planet.frenchDescription,
      });
    });

    populateDescriptionList(descriptionList);
  }, []);

  return (
    <>
      <Head>
        <title>{t('homeHeadTitle')}</title>
        <meta name="description" content="Explore planets and moons of Solar System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <sc.Wrapper>
        <sc.Header>
          <Text color={commonColors.homePageText} bold={true}>{t('homeSubTitle')}</Text>
          <Link href={"/"} locale={language} onClick={toggleLanguage}>
            <Image alt="switch language" src="/language.svg" width="26" height="26" />
          </Link>
        </sc.Header>
        <Heading color={commonColors.homePageText} type="h1">{t('homeTitle')}</Heading>
        <sc.Spacer size="2.5rem" />
        <Search placeholder={t('searchPlaceholder')} handleChange={handleChange} value={searchValue} />
        <sc.Spacer size="2.5rem" />
        <sc.Layout>
          {state.length
            ? (state.map((planet, i) => (
              <sc.CardContainer key={i}>
                <Card
                  id={planet.name}
                  name={i18n.language === "en" ? planet.name : planet.id}
                  description={i18n.language === "en" ? planet.englishDescription : planet.frenchDescription}
                  planetColor={bodyPrimaryColor[planet.id]}
                  callToAction={t('seeMore')}
                />
              </sc.CardContainer>
            )))
            : (<Text color={commonColors.homePageText} bold={false}>No planet found</Text>)
          }
        </sc.Layout>
      </sc.Wrapper>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const data: IGetAllPlanetsDataQuery[] | undefined = await getAllPlanets();

  return {
    props: {
      ...(await serverSideTranslations(ctx.locale as string, ['common'])),
      data
    }
  };
};