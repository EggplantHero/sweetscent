import React, { Component } from "react";
import { getImg } from "../utils/pokeApi";
import { capitalize } from "../utils/capitalize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import questionMark from "../question-mark.png";

class Poke extends Component {
  state = {
    name: this.props.poke.name,
    count: this.props.poke.count,
    saving: this.props.saving,
  };

  async componentDidMount() {
    const url = await getImg(this.props.poke.name);
    this.setState({ url });
  }

  render() {
    const { name, count, url, saving } = this.state;
    const { onDelete, onCount, id, poke, inc } = this.props;
    let disabled;
    let allDisabled;
    let blank;
    if (count === 0) {
      disabled = true;
    }
    if (saving) {
      allDisabled = true;
    }
    if (this.state.url === "blank") {
      blank = true;
    }
    return (
      <div className="col-md-6 col-lg-3 user-select-none d-inline-block">
        <div className="p-1">
          <div className="card border-success">
            <div className="card-header bg-success text-white text-center">
              <h5>{capitalize(name)}</h5>
            </div>
            <div className="card-body text-center">
              <div style={{ width: "96px", height: "96px", margin: "auto" }}>
                {url && !blank && <img src={url} alt={name} />}
                {blank && <img src={questionMark} alt={name} />}
              </div>
              <p>Count:</p>
              <h3>{count}</h3>
              <div>
                <button
                  className="btn btn-danger m-1 col-3"
                  onClick={() => onCount(poke, -inc)}
                  disabled={disabled || allDisabled}
                >
                  -{inc}
                </button>
                <button
                  className="btn btn-success m-1 col-3"
                  onClick={() => onCount(poke, inc)}
                  disabled={allDisabled}
                >
                  +{inc}
                </button>
              </div>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger m-1 float-right"
                onClick={() => onDelete(id)}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Poke;
