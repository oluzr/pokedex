import axios from "axios";

const remote = axios.create();
export const defaultpokeUrl = "https://pokeapi.co/api/v2/pokemon";

export interface PokemonListResponseType {
  count: number;
  next: string;
  results: {
    name: string;
    url: string;
  }[];
}

export const fetchPokemonsAPI = async (nextUrl?: string) => {
  const response = await remote.get<PokemonListResponseType>(
    nextUrl ? nextUrl : `${defaultpokeUrl}`
  );
  return response;
};

interface PokemonDetailResponseType {
  id: number;
  weight: number;
  height: number;
  name: string;
  types: {
    type: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
      "official-artwork": {
        front_default: string;
      };
    };
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

export interface PokemonDetailType {
  id: number;
  weight: number;
  height: number;
  name: string;
  koreanName: string;
  color: string;
  types: string[];
  images: {
    frontDefault: string;
    dreamWorldFront: string;
    officialArtworkFront: string;
  };
  baseStats: {
    name: string;
    value: number;
  }[];
}

interface PokemonSpeciesResponseType {
  color: {
    name: string;
  };
  names: {
    name: string;
    language: {
      name: string;
    };
  }[];
}
export const fetchPokemonDetailAPI = async (
  name: string
): Promise<PokemonDetailType> => {
  const { data: response } = await remote.get<PokemonDetailResponseType>(
    `${defaultpokeUrl}/${name}`
  );
  const { data: speciesResponse } =
    await remote.get<PokemonSpeciesResponseType>(
      `${defaultpokeUrl}-species/${name}`
    );
  return {
    id: response.id,
    name: response.name,
    height: response.height / 10,
    weight: response.weight / 10,
    color: speciesResponse.color.name,
    koreanName:
      speciesResponse.names.find((item) => {
        return item.language.name === "ko";
      })?.name ?? response.name,
    types: response.types.map((item) => item.type.name),
    images: {
      frontDefault: response.sprites.front_default,
      dreamWorldFront: response.sprites.other.dream_world.front_default,
      officialArtworkFront:
        response.sprites.other["official-artwork"].front_default,
    },
    baseStats: response.stats.map((item) => {
      return {
        name: item.stat.name,
        value: item.base_stat,
      };
    }),
  };
};
