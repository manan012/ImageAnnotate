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
import Axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      isSignedIn: false,
      logginStatus: true,
      token: localStorage.getItem("token"),
      loggedInUser: "",
    };
  }

  // verifyUser = () => {
  //   if (this.state.token) {
  //     axios
  //       .get("")
  //       .then((user) => {
  //         return true;
  //       })
  //       .catch((err) => {
  //         localStorage.removeItem("token");

  //         this.setState({
  //           loggedInUser: "",
  //           token: null,
  //         });
  //         return false;
  //       });
  //   } else {
  //     return false;
  //   }
  // };

  signInUser = (user) => {
    this.setState({
      loggedInUser: user,
    });
  };

  signOutUser = (user) => {
    this.setState({
      loggedInUser: "",
    });
  };

  render() {
    console.log("hello", this.state.token);
    return (
      <Router>
        <div className="root">
          <Switch>
            <Route
              exact
              path="/signin"
              component={Signin}
              handleUser={this.signInUser}
            ></Route>
            <Route exact path="/" component={Start}></Route>

            {localStorage.getItem("token") ? (
              <Route
                path="/label"
                component={Main}
                handleUser={this.signOutUser}
              ></Route>
            ) : (
              <Route exact path="/" component={() => <Redirect to="/" />} />
            )}
            <Route exact path="/project" component={ProjectDashBoard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
