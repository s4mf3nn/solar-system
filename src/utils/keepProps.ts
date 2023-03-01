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