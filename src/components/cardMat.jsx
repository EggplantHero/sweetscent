import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPokemon, reorderPokemon } from "../store/pokemon";
import PokeCard from "./pokeCard";
import SearchBar from "./searchBar";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-dnd";
import useResize from "../utils/viewport";

const CardMat = () => {
  const dispatch = useDispatch();
  const pokemon = useSelector(getPokemon);
  const { gridSize } = useResize();

  const onChange = (sourceId, sourceIndex, targetIndex, targetId) => {
    const nextState = swap(pokemon, sourceIndex, targetIndex);
    dispatch(reorderPokemon(nextState));
  };

  const getHeight = () => {
    const height = (350 * pokemon.length) / gridSize;
    return `${height}px`;
  };

  return (
    <div>
      <SearchBar />
      <GridContextProvider onChange={onChange}>
        <div className="container">
          {pokemon.length === 0 && (
            <p className="user-select-none">
              There are 0 pokemon being displayed. <br /> Please type in the
              name of any existing pokemon to add them. (e.g: Pikachu)
            </p>
          )}
          <GridDropZone
            id="items"
            className="d-flex"
            boxesPerRow={gridSize}
            rowHeight={330}
            style={{ height: getHeight() }}
          >
            {pokemon.map((poke) => (
              <GridItem key={poke.id}>
                <PokeCard pokemon={poke} />
              </GridItem>
            ))}
          </GridDropZone>
        </div>
      </GridContextProvider>
    </div>
  );
};

export default CardMat;
