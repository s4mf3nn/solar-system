import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useStore } from '@/store';
import { Card, Heading, Search, Text } from '@/components';
import { bodyPrimaryColor } from '@/styles/constants/bodyColors.constant';
import * as sc from '@/styles/index.style';

import { getAllPlanets } from '@/api/getAllPlanets';
import { ISolarSystemProps, IGetAllPlanetsDataQuery, IGetStaticSolarSystemProps, IDescriptionList } from '@/interfaces/common.interface';

export default function SolarSystem({ data }: ISolarSystemProps) {
  const [state, setState] = useState(data);
  const [searchValue, setSearchValue] = useState("");
  const { changeBackgroundColor, populateDescriptionList } = useStore();

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

  useEffect(() => {
    const descriptionList: IDescriptionList[] = [];
    data.map(planet => {
      descriptionList.push({
        name: planet.id,
        description: planet.description,
      });
    });
    populateDescriptionList(descriptionList);
  }, []);

  return (
    <>
      <Head>
        <title>Explore Solar System</title>
        <meta name="description" content="Explore planets and moons of Solar System" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
                  id={planet.name}
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
    </>
  );
}

export async function getStaticProps(): Promise<IGetStaticSolarSystemProps> {
  const data: IGetAllPlanetsDataQuery[] | undefined = await getAllPlanets();
  return { props: { data } };
};