import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { imageTypeReducer } from "./imageTypeSlice";
import { pokeomonsReducer } from "./pokemonSlice";
import { pokeomonDetailReducer } from "./detailSlice";
export const store = configureStore({
  reducer: {
    imageType: imageTypeReducer,
    pokemons: pokeomonsReducer,
    pokemonDetail: pokeomonDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
