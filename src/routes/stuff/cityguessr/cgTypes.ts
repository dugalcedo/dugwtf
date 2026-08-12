/** True extent of the urban centre, in degrees. */
export type Bounds = {
    north: number,
    south: number,
    east: number,
    west: number
}

export type City = {
    id: number,
    name: string,
    altNames: string[],
    country: string,
    /** State / province / department. null where the country has no admin-1. */
    admin1: string | null,
    continent: string,
    region: string,
    /** Centroid of the whole cluster — NOT necessarily where `name` sits. */
    lat: number,
    lon: number,
    /** null when the source geometry carried no envelope. */
    bounds: Bounds | null,
    population: number,
    areaKm2: number,
    zoom: number,
    isCapital: boolean,
    difficulty: string
}

export type CityInGame = City & {
    url: string
    correct?: boolean
    /** Other cities whose centre falls inside this city's image. */
    citiesInRect: City[]
}

export type CityImageOptions = {
    continents: Set<string> | 'all'
    countries: Set<string> | 'all'
    minPop: number
    maxPop: number
}