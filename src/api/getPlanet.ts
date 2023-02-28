import { IPlanetData, IGetPlanetDataQuery } from "@/interfaces/common.interface";
import { keepPlanetProps } from '@/utils/keepProps';

/**
 * Get data of a specific planet by ID
 * @param {string} planetId  - planet ID
 * @returns {IGetPlanetDataQuery} - planet data
 */
export const getPlanet = async (planetId: string): Promise<IGetPlanetDataQuery> => {
  const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${planetId}`);

  // Return 404 page if no body was found
  let notFound = response.status === 404;

  const data = notFound ? null : await response.json();

  // If the body is not a planet return 404 page
  notFound = !data?.isPlanet;

  return { data: keepPlanetProps(data) as unknown as IPlanetData, notFound };
};