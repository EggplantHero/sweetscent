import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addCount, removePokemon, setInc, changeForm } from "../store/pokemon";
import { getImg } from "../utils/pokeApi";
import capitalize from "../utils/capitalize";
import { BsGear, BsGearFill, BsTrash } from "react-icons/bs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const PokeCard = ({ pokemon }) => {
  const dispatch = useDispatch();
  const { data, id } = pokemon;
  const { name, count, inc, form, tutorial } = data;
  const [url, setUrl] = useState("");
  const [input, setInput] = useState(1);
  const [visibleConfig, setVisibleConfig] = useState(false);

  useEffect(() => {
    if (tutorial) setVisibleConfig(true);
    const getUrl = async () => {
      const url = await getImg(name, form);
      setUrl(url);
    };
    getUrl();
  }, [name, form, tutorial]);

  const handleIncrement = (id, inc, value) => {
    inc *= value;
    dispatch(addCount({ id, inc }));
  };

  const handleChange = (inc) => {
    if (inc.match(/^[1-9]\d*$/) && inc < 100000) {
      setInput(inc);
      dispatch(setInc({ id, inc }));
    } else {
      setInput("");
    }
  };

  const buttons = [
    { value: -1, sign: "-", class: "danger" },
    { value: 1, sign: "+", class: "success" },
  ];

  return (
    <div className="card user-select-none m-2">
      <div className="card-header">
        <h5>{capitalize(name)}</h5>
      </div>
      <div className="card-body">
        <div className="spriteContainer mx-auto">
          <img className="sprite pe-none" src={url} alt=""></img>
        </div>
        <h3>{count}</h3>
        <div className="d-flex justify-content-center">
          {buttons.map((btn) => (
            <button
              key={btn.sign}
              onClick={() => handleIncrement(id, inc, btn.value)}
              className={`btn btn-${btn.class} mx-1 inc`}
            >
              {btn.sign}
              {inc}
            </button>
          ))}
        </div>
      </div>
      <div className="card-footer px-1 d-flex justify-content-end">
        {visibleConfig && (
          <Fragment>
            <button
              className="btn btn-danger"
              onClick={() => dispatch(removePokemon(id))}
            >
              <BsTrash />
            </button>
            <button
              className="btn btn-warning"
              onClick={() => dispatch(changeForm(id))}
            >
              {form === "shiny" ? <AiFillStar /> : <AiOutlineStar />}
            </button>
            <input
              type="number"
              value={input}
              placeholder={inc}
              onChange={(e) => handleChange(e.target.value)}
              className="form-control mx-1"
            />
          </Fragment>
        )}
        <button
          className="btn btn-info"
          onClick={() => setVisibleConfig(!visibleConfig)}
        >
          {visibleConfig ? <BsGearFill /> : <BsGear />}
        </button>
      </div>
    </div>
  );
};

export default PokeCard;
