import React from "react";
import ReactDOM from "react-dom";
import {store, persistor } from "./store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./wheel.css";
import "./index.css";
import "./themes.css";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
