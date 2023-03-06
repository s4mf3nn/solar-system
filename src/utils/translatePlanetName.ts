import { capitalize } from "./capitalize";

// Get the translated planet name
export const translatePlanetName = (
  language: string,
  englishName: string,
  frenchName: string
): string => {
  const planetName = language === "en"
    ? englishName : frenchName === "terre"
      ? "la Terre" : frenchName;

  return capitalize(planetName);
};