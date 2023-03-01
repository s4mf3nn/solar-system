import { generateDescription } from "./generateDescription";
import { IPlanetsData, IGetAllPlanetsDataQuery } from '@/interfaces/common.interface';

/**
 * Get data of a all Solar System planets
 * @returns {IGetPlanetDataQuery | undefined} - planets data or undefined value
 */
export const getAllPlanets = async (): Promise<IGetAllPlanetsDataQuery[] | undefined> => {
  try {
    const response = await fetch('https://api.le-systeme-solaire.net/rest/bodies?data=id,englishName,semimajorAxis&filter=isPlanet,eq,true');
    const data: IPlanetsData = await response.json();

    const planetsData: IGetAllPlanetsDataQuery[] = [];

    await Promise.all(data.bodies.map(async (planet: any) => {
      // const description = await generateDescription(planet.englishName);
      planetsData.push({
        id: planet.id,
        name: planet.englishName,
        semimajorAxis: planet.semimajorAxis,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum.",
        // description: description,
      });
    }));

    // Sort planets by distance from the sun (the sorting parameter in api url doesn't work with the openai generated description)
    return planetsData.sort((x, y) => x.semimajorAxis - y.semimajorAxis);
  } catch (error) {
    console.log(error);
  }
};