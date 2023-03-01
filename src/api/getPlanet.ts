import { IGetPlanetDataQuery } from "@/interfaces/common.interface";

const RAPID_API_SK = process.env.RAPID_API_SK;
/**
 * Get data of a specific planet by ID
 * @param {string} planetId  - planet ID
 * @returns {IGetPlanetDataQuery} - planet data
 */
export const getPlanet = async (planetId: string): Promise<IGetPlanetDataQuery> => {
  const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${planetId}`);
  let population = 0;
  if (planetId.toLowerCase() === "earth") {
    const popResponse = await fetch("https://get-population.p.rapidapi.com/population", {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': RAPID_API_SK!,
        'X-RapidAPI-Host': 'get-population.p.rapidapi.com',
      },
    });

    const data = await popResponse.json();
    population = data.count || 0;
  }

  // Return 404 page if no body was found
  let notFound = response.status === 404;
  const data = notFound ? null : await response.json();

  // If the body is not a planet return 404 page
  notFound = !data?.isPlanet;

  // Add population to the planet object
  data.population = population;

  return { data, notFound };
};