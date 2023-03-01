import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Card, Heading, Search, Text } from '@/components';
import GlobalStyle from '@/styles/globalStyles';
import { bodyPrimaryColor } from '@/styles/bodyColors.constant';
import * as sc from '../styles/index.style';

import { getAllPlanets } from '@/api/getAllPlanets';
import { ISolarSystemProps, IGetAllPlanetsDataQuery, IGetStaticSolarSystemProps } from '@/interfaces/common.interface';
import { useStore } from '@/store';

export default function SolarSystem({ data }: ISolarSystemProps) {
  const [state, setState] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const { changeBackgroundColor } = useStore();

  useEffect(() => {
    changeBackgroundColor('#000');
  }, []);

  /**
   * Update the searchValue on searchInput change
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  /**
   * Search and return list of planets that match the searchValue
   * @returns {IGetPlanetDataQuery[]} - list of planet
   */
  const searchPlanet = (): IGetAllPlanetsDataQuery[] => {
    return data.filter(planet => planet.name.toLowerCase().includes(searchValue.toLowerCase().trim()));
  };

  useEffect(() => {
    const searchResult = searchPlanet();
    setState(searchResult);
  }, [searchValue]);

  return (
    <>
      <Head>
        <title>Explore Solar System</title>
        <meta name="description" content="Explore planets and moons of Solar System" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyle />
      <sc.Wrapper>
        <Text color="#fff" bold={true}>Solar System</Text>
        <Heading color="#fff" type="h1">Discover</Heading>
        <sc.Spacer size="2.5rem" />
        <Search placeholder="Search for a planet" handleChange={handleChange} value={searchValue} />
        <sc.Spacer size="2.5rem" />
        <sc.Layout>
          {state.length
            ? (state.map((planet, i) => (
              <sc.CardContainer key={i}>
                <Card
                  id={planet.id}
                  name={planet.name}
                  description={planet.description}
                  planetColor={bodyPrimaryColor[planet.id]}
                />
              </sc.CardContainer>
            )))
            : (<Text color="#fff" bold={false}>No planet found</Text>)
          }
        </sc.Layout>
      </sc.Wrapper>
      <style jsx global>{`
        body {
          background: "red";
        }
      `}</style>
    </>
  );
}

export async function getStaticProps(): Promise<IGetStaticSolarSystemProps> {
  const data: IGetAllPlanetsDataQuery[] | undefined = await getAllPlanets();
  return { props: { data } };
};