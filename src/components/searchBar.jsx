import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Typeahead } from "react-bootstrap-typeahead";
import { getAllPokeNames } from "../utils/pokeApi";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { addPokemon } from "../store/pokemon";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [allPokes, setAllPokes] = useState([]);
  const [selected, setSelected] = useState([]);
  const getPokes = async () => {
    setAllPokes(await getAllPokeNames());
  };

  useEffect(() => {
    getPokes();
  }, []);

  const handleChange = async (input) => {
    const name = input[0];
    if (selected[0] === input[0]) return;
    if (input.length === 0) return;
    setSelected(input);
    const newPokemon = {
      name: name,
      count: 0,
      inc: 1,
      form: "default",
    };
    dispatch(addPokemon(newPokemon));
  };

  return (
    <div className="col-4 my-4 d-inline-block" spellCheck="false">
      <Typeahead
        id="typeahead"
        placeholder="Name..."
        minLength={2}
        highlightOnlyResult
        onChange={(selected) => {
          handleChange(selected);
        }}
        options={allPokes}
      ></Typeahead>
    </div>
  );
};

export default SearchBar;
