import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

// let lastId = 0;
const slice = createSlice({
  name: "pokemon",
  initialState: [],
  reducers: {
    reorderPokemon: (pokemon, action) => {
      return pokemon = action.payload;
    },
    addPokemon: (pokemon, action) => {
      let id = new Date().getTime();
      pokemon.push({ id, data: action.payload });
    },
    removePokemon: (pokemon, action) => {
      return pokemon.filter((breeder) => breeder.id !== action.payload);
    },
    addCount: (pokemon, action) => {
      const poke = pokemon.find((x) => x.id === action.payload.id);
      poke.data.count += action.payload.inc;
    },
    setInc: (pokemon, action) => {
      const poke = pokemon.find((x) => x.id === action.payload.id);
      poke.data.inc = action.payload.inc;
    },
    changeForm: (pokemon, action) => {
      const poke = pokemon.find((x) => x.id === action.payload);
      poke.data.form = poke.data.form === "shiny" ? "default" : "shiny";
    },
  },
});

export const getPokemon = createSelector(
  (state) => state.entities.pokemon,
  (pokemon) => pokemon
);

export default slice.reducer;
export const {
  reorderPokemon,
  addPokemon,
  removePokemon,
  addCount,
  setInc,
  changeForm,
} = slice.actions;
