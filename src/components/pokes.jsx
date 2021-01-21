import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { getPoke, getAllPokes } from "../utils/pokeApi";
import { capitalize } from "../utils/capitalize";
import {
  getPokes,
  savePoke,
  saveNewPoke,
  deletePoke,
} from "../services/pokeService";
import Poke from "./poke";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

class Pokes extends Component {
  state = {
    allPokes: [],
    pokes: [],
    selected: [],
    loading: false,
    saving: false,
    cancelToken: "",
    inc: 1,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    this.refreshPokes();
    const { data } = await getAllPokes();
    const allPokes = data.results.map((poke) => capitalize(poke.name));
    this.setState({ allPokes, loading: false });
  }

  refreshPokes = async () => {
    const { data } = await getPokes();
    this.setState({ pokes: data });
  };

  onAddPoke = async (input) => {
    if (!input[0]) return;
    await getPoke(input[0].toLowerCase());

    const newPoke = {
      name: input[0].toLowerCase(),
      count: 0,
    };
    await saveNewPoke(newPoke);
    this.refreshPokes();
  };

  handleDelete = async (pokeId) => {
    const originalPokes = this.state.pokes;
    const pokes = this.state.pokes.filter((p) => p._id !== pokeId);
    this.setState({ pokes });
    try {
      await deletePoke(pokeId);
    } catch (ex) {
      alert("Something failed while deleting the Pokemon.");
      this.setState({ pokes: originalPokes });
    }
  };

  handleCount = async (poke, num) => {
    this.setState({ saving: true });
    let newCount = poke.count + num;
    if (newCount < 0) {
      newCount = 0;
    }
    const newPoke = {
      name: poke.name,
      count: newCount,
      _id: poke._id,
    };

    const { pokes } = this.state;
    const objIndex = pokes.findIndex((obj) => obj._id === poke._id);
    pokes[objIndex].count = newCount;
    this.setState({ pokes });

    try {
      await savePoke(newPoke);
      this.refreshPokes();
    } catch (ex) {
      alert("Something went wrong. Please try again.", ex);
    }
    this.setState({ saving: false });
  };

  handleChange = (selected) => {
    this.setState({ selected });
    this.onAddPoke(selected);
  };

  changeInc = ({ target }) => {
    let inc = parseInt(target.value);
    console.log(inc);
    if (inc < 1) inc = 1;
    if (isNaN(inc)) {
      return;
    }
    this.setState({ inc });
  };

  render() {
    const { pokes, selected, allPokes, loading, saving, inc } = this.state;
    return (
      <React.Fragment>
        <div className="col-md-6 offset-md-3 d-inline-block">
          <Form.Group>
            <Typeahead
              id="typeahead"
              placeholder="Search Pokemon by name..."
              minLength={2}
              highlightOnlyResult
              onChange={(selected) => this.handleChange(selected)}
              options={allPokes}
              selected={selected}
            ></Typeahead>
            <div className="d-flex justify-content-center d-inline-block my-3">
              <input
                type="number"
                className="col-2 form-control"
                onChange={this.changeInc}
                defaultValue={inc}
              ></input>
            </div>
          </Form.Group>
        </div>
        <div>
          {loading && <h3 className="text-center">Loading...</h3>}
          {pokes.map((poke) => (
            <Poke
              poke={poke}
              key={poke.count + poke._id}
              id={poke._id}
              onDelete={this.handleDelete}
              onCount={this.handleCount}
              changeInc={this.changeInc}
              saving={saving}
              inc={inc}
            ></Poke>
          ))}
          <Form></Form>
        </div>
      </React.Fragment>
    );
  }
}

export default Pokes;
