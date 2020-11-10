import React, { Component } from "react";
import { Form } from "react-bootstrap";
import { getPoke, getAllPokes } from "../utils/pokeApi";
import { getPokes, savePoke, deletePoke } from "../services/pokeService";
import Poke from "./poke";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

class Pokes extends Component {
  state = {
    allPokes: [],
    pokes: [],
    selected: [],
  };

  async componentDidMount() {
    this.refreshPokes();
    const { data } = await getAllPokes();
    const allPokes = data.results.map((poke) => poke.name);
    this.setState({ allPokes });
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
    await savePoke(newPoke);
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
      alert("A random network error occurred, please try clicking slower.");
    }
  };

  handleChange = (selected) => {
    this.setState({ selected });
    this.onAddPoke(selected);
  };

  render() {
    const { pokes, selected, allPokes } = this.state;
    const reversedPokes = pokes.reverse();
    return (
      <React.Fragment>
        <div className="col-6 offset-3">
          <Form.Group>
            <Typeahead
              id="typeahead"
              placeholder="Add a pokemon..."
              minLength={2}
              highlightOnlyResult
              onChange={(selected) => this.handleChange(selected)}
              options={allPokes}
              selected={selected}
            ></Typeahead>
          </Form.Group>
        </div>
        <div>
          {reversedPokes.map((poke) => (
            <Poke
              poke={poke}
              key={poke.count + poke._id}
              id={poke._id}
              onDelete={this.handleDelete}
              onCount={this.handleCount}
            ></Poke>
          ))}
          <Form></Form>
        </div>
      </React.Fragment>
    );
  }
}

export default Pokes;
