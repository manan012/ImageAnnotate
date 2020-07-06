import React, { Component, Fragment } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import axios from "axios";

import Main from "./AnnotationTool/Main";
import Start from "./AnnotationTool/landingPage/Start";
import Signin from "./AnnotationTool/landingPage/Signin";
import ProjectDashBoard from "../src/Dashboards/ProjectDashBoard";
import OverviewDashBoard from "../src/Dashboards/OverviewDashBoard";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store";
import {logger} from 'redux-logger'

// import Axios from "axios";

const store = createStore(rootReducer, applyMiddleware(logger));

class App extends Component {
  constructor() {
    super();
    // console.log("constructor called");
    // localStorage.removeItem("token");
    this.state = {
      isSignedIn: false,
      logginStatus: true,
      token: localStorage.getItem("token"),
    };
  }

  verifyUser = () => {
    if (this.state.token) {
      // console.log("in if");
      const config = {
        headers: {
          "Content-type": "application/json",
          "x-access-token": this.state.token,
        },
      };
      axios
        .get("https://edunomics.in/api/labelImg/user/verify", config)
        .then((response) => {
          // console.log("here");
          return true;
        })
        .catch((err) => {
          localStorage.removeItem("token");
          this.setState({
            token: null,
          });
          return false;
        });
    } else {
      return false;
    }
  };

  signInUser = () => {
    this.setState({
      token: localStorage.getItem("token"),
    });
  };

  signOutUser = () => {
    this.setState({
      token: null,
    });
  };
  render() {
    return (
      <Provider store={store}>
        <div className="root">
          {this.state.token ? (
            <Router>
              <Switch>
                <Route
                  exact
                  path="/label"
                  render={(props) => (
                    <Main {...props} handleUser={this.signOutUser} />
                  )}
                ></Route>
                <Route exact path="/project" component={ProjectDashBoard} />
                <Route exact path="/overview" component={OverviewDashBoard} />
                <Route
                  exact
                  path="/"
                  component={() => <Redirect to="/project" />}
                />
                <Route
                  exact
                  path="/signin"
                  component={() => <Redirect to="/project" />}
                />
              </Switch>
            </Router>
          ) : (
            <Router>
              <Switch>
                <Route exact path="/" component={Start}></Route>
                <Route
                  exact
                  path="/signin"
                  render={(props) => (
                    <Signin {...props} handleUser={this.signInUser} />
                  )}
                ></Route>
                <Route
                  exact
                  path="/label"
                  component={() => <Redirect to="/signin" />}
                />
                <Route
                  exact
                  path="/project"
                  component={() => <Redirect to="/signin" />}
                />
                <Route
                  exact
                  path="/overview"
                  component={() => <Redirect to="/signin" />}
                />
              </Switch>
            </Router>
          )}
        </div>
      </Provider>
    );
  }
}

export default App;
