import { keepMoonsProps } from "@/utils/keepProps";
import { IGetMoonsDataQuery } from '@/interfaces/common.interface';

/**
 * Get moons data of a specific planet by ID
 * @param {string} planetId  - planet ID
 * @returns {IGetMoonsDataQuery} - planet data
 */
export const getMoons = async (planetId: string): Promise<IGetMoonsDataQuery> => {
  const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${planetId}`);

  // Return 404 page if no body was found
  let notFound = response.status === 404;

  const planet = notFound ? null : await response.json();
  let moonsData = [];

  if (planet.moons) {
    moonsData = await Promise.all(planet.moons.map(async (moon: any) => {
      const response = await fetch(moon.rel);
      return await response.json();
    }));
  } else {
    notFound = true;
  }

  const data = moonsData.length ? keepMoonsProps(moonsData) : [];

  return { data, notFound };
};