export interface ISolarSystemProps {
  data: IGetAllPlanetsDataQuery[];
}

export interface IPlanetProps {
  id: string;
  englishName: string;
  moons: IMoonsData[];
  semimajorAxis: number;
  gravity: number;
  meanRadius: number;
  sideralOrbit: number;
  sideralRotation: number;
  avgTemp: number;
  axialTilt: number;
}

export interface IMoonsProps {
  englishName: string;
  semimajorAxis: number;
  gravity: number;
  meanRadius: number;
  sideralOrbit: number;
  sideralRotation: number;
  avgTemp: number;
}

export interface IGetStaticSolarSystemProps {
  props: {
    data: IGetAllPlanetsDataQuery[] | undefined;
  };
}

export interface IGetServerSidePlanetsProps {
  notFound?: boolean;
  props?: {
    data: IPlanetData;
  };
}

export interface IGetServerSideMoonsProps {
  notFound?: boolean;
  props?: {
    data: IMoonsProps[];
    planetId: string;
  };
}

export interface IPlanetData {
  data: {
    id: string;
    englishName: string;
    moons: IMoonsData[] | null;
    semimajorAxis: number;
    gravity: number;
    meanRadius: number;
    sideralOrbit: number;
    sideralRotation: number;
    avgTemp: number;
    axialTilt: number;
    population: string;
  };
}

interface IMoonsData {
  moon: string;
  rel: string;
}

export interface IPlanetsData {
  bodies: IBodiesData[];
}

interface IBodiesData {
  id: string,
  englishName: string,
}

export interface IQuery {
  planetId: string;
}

export interface IGetPlanetDataQuery {
  data: IPlanetData;
  notFound: boolean;
}

export interface IGetMoonsDataQuery {
  data: IMoonsProps[];
  notFound: boolean;
}

export interface IGetAllPlanetsDataQuery {
  id: string;
  name: string;
  semimajorAxis: number;
  englishDescription: string;
  frenchDescription: string;
}

export interface IDescriptionList {
  name: string;
  englishDescription: string,
  frenchDescription: string,
}