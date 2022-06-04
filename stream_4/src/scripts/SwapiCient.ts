type GetParams = {
  search: string;
};

type Pagination<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<T>;
};

type People = {
  birth_year: string;
  eye_color: string;
  films: Array<string>;
  gender: string;
  hair_color: string;
  height: number;
  homeworld: string;
  mass: number;
  name: string;
  skin_color: string;
  created: string;
  edited: string;
  species: Array<string>;
  starships: Array<string>;
  url: string;
  vehicles: Array<string>;
};

type Planet = {
  climate: string;
  created: string;
  diameter: number;
  edited: string;
  films: Array<string>;
  gravity: string;
  name: string;
  orbital_period: number;
  population: number;
  residents: Array<string>;
  rotation_period: number;
  surface_water: number;
  terrain: string;
  url: string;
};

type Starship = {
  MGLT: string;
  cargo_capacity: number;
  consumables: string;
  cost_in_credits: number;
  created: string;
  crew: number;
  edited: string;
  hyperdrive_rating: number;
  length: number;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: number;
  films: Array<string>;
  pilots: Array<string>;
  starship_class: string;
  url: string;
};

function normalizeNumbers<T>(paginationObj: Pagination<T>): Pagination<T> {
  paginationObj.results.map((obj) => {
    for (const key in obj) {
      if (!Number.isNaN(Number.parseFloat(obj[key] as string))) {
        obj[key as string] = Number.parseFloat(obj[key as string]);
      }
    }
  });

  return paginationObj;
}

class SwapiClient {
  baseUrl = "https://swapi.dev/api";

  getPeople(params: GetParams): Promise<Pagination<People>> {
    return fetch(`${this.baseUrl}/people/?${new URLSearchParams(params)}`)
      .then((d) => d.json())
      .then((obj) => normalizeNumbers(obj));
  }

  getPlanets(params: GetParams): Promise<Pagination<Planet>> {
    return fetch(`${this.baseUrl}/planets/?${new URLSearchParams(params)}`)
      .then((d) => d.json())
      .then((obj) => normalizeNumbers(obj));
  }

  getStarships(params: GetParams): Promise<Pagination<Starship>> {
    return fetch(`${this.baseUrl}/starships/?${new URLSearchParams(params)}`)
      .then((d) => d.json())
      .then((obj) => normalizeNumbers(obj));
  }
}

export default SwapiClient;
