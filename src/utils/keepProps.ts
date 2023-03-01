import { IPlanetProps, IMoonsProps } from '@/interfaces/common.interface';

/**
 * Return a smaller object that contains planet props
 * @param {any} data - complete planet props
 * @returns {IPlanetProps} - planet props to keep
 */
export const keepPlanetProps = (data: any): IPlanetProps => {
  const {
    id,
    englishName: name,
    moons,
    semimajorAxis,
    gravity,
    meanRadius,
    sideralOrbit,
    sideralRotation,
    avgTemp,
  } = data;

  return {
    id,
    name,
    moons,
    semimajorAxis,
    gravity,
    meanRadius,
    sideralOrbit,
    sideralRotation,
    avgTemp,
  };
};

/**
 * Return a smaller array of object that contains moons props
 * @param {any[]} data - list of complet moons props
 * @returns {IMoonsProps[]} - list of moons props to keep
 */
// TODO
export const keepMoonsProps = (data: any[]): IMoonsProps[] => {
  const keysToKeep = [
    "englishName",
    "semimajorAxis",
    "gravity",
    "meanRadius",
    "sideralOrbit",
    "sideralRotation",
    "avgTemp",
  ];

  return data;
};