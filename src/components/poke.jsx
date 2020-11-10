import React, { Component } from "react";
import { getImg } from "../utils/pokeApi";
import { capitalize } from "../utils/capitalize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

class Poke extends Component {
  state = {
    name: this.props.poke.name,
    count: this.props.poke.count,
  };

  async componentDidMount() {
    const url = await getImg(this.props.poke.name);
    this.setState({ url });
  }

  render() {
    const { name, count, url } = this.state;
    const { onDelete, onCount, id, poke } = this.props;
    const negatives = [-1, -3, -5, -100];
    const positives = [1, 3, 5, 100];
    let disabled;
    if (count === 0) {
      disabled = true;
    }
    return (
      <div className="col-md-6" style={{ display: "inline-block" }}>
        <div className="p-1">
          <div className="card border-danger">
            <div className="card-header bg-danger text-white text-center">
              <h5>{capitalize(name)}</h5>
            </div>
            <div className="card-body text-center">
              <div style={{ width: "96px", height: "96px", margin: "auto" }}>
                {url && <img src={url} alt={name} />}
              </div>
              <p>Count:</p>
              <h3>{count}</h3>
              <div>
                {positives.map((num) => (
                  <button
                    className="btn btn-danger m-1 col-4"
                    onClick={() => onCount(poke, num)}
                    key={num}
                  >
                    +{num}
                  </button>
                ))}
              </div>
              <div>
                {negatives.map((num) => (
                  <button
                    className="btn btn-light m-1 col-4"
                    onClick={() => onCount(poke, num)}
                    key={num}
                    disabled={disabled}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            <div className="card-footer">
              <button
                className="btn btn-danger m-1 col-2 float-right"
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
