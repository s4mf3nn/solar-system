import { generateDescription } from "./generateDescription";
import { IPlanetsData, IGetAllPlanetsDataQuery } from '@/interfaces/commons.interface';

/**
 * Get data of a all Solar System planets
 * @returns {IGetPlanetDataQuery | undefined} - planets data or undefined value
 */
export const getAllPlanets = async (): Promise<IGetAllPlanetsDataQuery[] | undefined> => {
  try {
    const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies?data=id,englishName&filter=isPlanet,eq,true&order=semimajorAxis');
    const data: IPlanetsData = await response.json();

    const planetsData: IGetAllPlanetsDataQuery[] = [];

    await Promise.all(data.bodies.map(async (planet: any) => {
      // const description = await generateDescription(planet.englishName);
      planetsData.push({
        id: planet.id,
        name: planet.englishName,
        description: "Lorem ipsum",
        // description: description,
      });
    }));

    return planetsData;
  } catch (error) {
    console.log(error);
  }
};