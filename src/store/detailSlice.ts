import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  PokemonDetailType,
  fetchPokemonDetailAPI,
} from "../service/pokeService";
import { RootState } from ".";

export const fetchPokemonsDetail = createAsyncThunk(
  "pokemon/fetchPokomonsDetail",
  async (name: string) => {
    const response = await fetchPokemonDetailAPI(name);
    return response;
  },
  {
    condition: (name, { getState }) => {
      const { pokemonDetail } = getState() as RootState;
      const pokemon = pokemonDetail.pokemonDetails[name];
      return !pokemon;
    },
  }
);

interface PokemonDatailState {
  // pokemonDetails:{
  // '이상해시': PokemonDetailType,
  // '피카츄': PokemonDetailType,
  //
  // }
  pokemonDetails: Record<string, PokemonDetailType>;
}

const initialState = {
  pokemonDetails: {},
} as PokemonDatailState;

const pokemonDetailSlice = createSlice({
  name: "pokemonDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchPokemonsDetail.fulfilled,
      (state, action: PayloadAction<PokemonDetailType>) => {
        state.pokemonDetails = {
          ...state.pokemonDetails,
          [action.payload.name]: action.payload,
        };
      }
    );
  },
});

export const pokeomonDetailReducer = pokemonDetailSlice.reducer;
