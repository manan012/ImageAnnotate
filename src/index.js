import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";
import rootReducer from "./store";
import { logger } from "redux-logger";
import rootSaga from "./sagas";
import registerServiceWorker from "./registerServiceWorker";
import { baseURL } from "./config";

//Default axio headers
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware));
sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  const user = store.getState().user;
  if (user.loggedIn) {
    if (
      !("token" in localStorage) ||
      localStorage.getItem("token") != user.token
    ) {
      console.log("token updated");
      localStorage.setItem("token", user.token);
    }
  }
})
store.subscribe(() => {if (store.getState().user.loggedIn) axios.defaults.headers['x_auth_token'] = store.getState().user.token})
store.subscribe(() => {if (store.getState().user.status === 'LOGOUT') localStorage.removeItem('token')})
axios.defaults.baseURL = baseURL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
