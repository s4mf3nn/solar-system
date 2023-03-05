import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from "next/link";
import Image from 'next/image';
import { useStore } from '@/store';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { Card, Heading, Search, Text } from '@/components';
import { getAllPlanets } from '@/api/getAllPlanets';
import { ISolarSystemProps, IGetAllPlanetsDataQuery, IGetStaticSolarSystemProps, IDescriptionList } from '@/interfaces/common.interface';
import { bodyPrimaryColor, commonColors } from '@/styles/constants/colors.constant';
import * as sc from '@/styles/index.style';

export default function SolarSystem({ data }: ISolarSystemProps) {
  const { t, i18n } = useTranslation('common');
  const [state, setState] = useState(data);
  const [language, setLanguage] = useState('fr');
  const [searchValue, setSearchValue] = useState('');
  const { changeBackgroundColor, populateDescriptionList } = useStore();

  // Update background color on page load
  useEffect(() => changeBackgroundColor(commonColors.homePageBackground), []);

  // Update the searchValue on searchInput change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value);

  // Search and return list of planets that match the searchValue
  const searchPlanet = (): IGetAllPlanetsDataQuery[] => {
    return data.filter(planet => planet.name.toLowerCase().includes(searchValue.toLowerCase().trim()));
  };

  const toggleLanguage = () => language === 'fr' ? setLanguage('en') : setLanguage('fr');

  useEffect(() => {
    const searchResult = searchPlanet();
    setState(searchResult);
  }, [searchValue]);

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
          <Text color={commonColors.homePageText} bold={true}>{t('homeTitle')}</Text>
          <Link href={"/"} locale={language} onClick={toggleLanguage}>
            <Image alt="switch language" src="/switch-language.png" width="26" height="26" />
          </Link>
        </sc.Header>
        <Heading color={commonColors.homePageText} type="h1">{t('homeMainTitle')}</Heading>
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

export async function getStaticProps({ locale }: any): Promise<IGetStaticSolarSystemProps> {
  const data: IGetAllPlanetsDataQuery[] | undefined = await getAllPlanets();
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      data
    }
  };
};