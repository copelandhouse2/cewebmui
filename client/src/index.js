import React from "react";
import ReactDOM from "react-dom";
import AppContainer from "./containers/AppContainer";
import "./css/index.css";
import store from "./store";
import {Provider} from "react-redux";
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
