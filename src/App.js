import React, { Component, Fragment } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Main from "./AnnotationTool/Main";
import Start from "./AnnotationTool/landingPage/Start";
import Signin from "./AnnotationTool/landingPage/Signin";
import ProjectDashBoard from "../src/Dashboards/ProjectDashBoard/ProjectDashBoard";
import OverviewDashBoard from "../src/Dashboards/OverviewDashBoard";
import { connect } from "react-redux";


// import Axios from "axios";


class App extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.verifyToken();
    this.props.autoLogIn();
  }

  render() {
    return (
        <div className="root">
          {this.props.loggedIn ? (
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
    );
  }
}

const matchStateToProp = (store) => ({
  loggedIn: store.user.loggedIn
})

const matchDispatchToProp = (dispatch) => ({
  verifyToken: (loggedIn) => {if (!loggedIn && 'token' in localStorage) dispatch({type: 'VERIFY_TOKEN', token: localStorage.getItem('token')})},
  autoLogIn: () => dispatch({type: 'LOGIN', logInCred: {email: 'team1@gmail.com', password: '12345'}})
})

export default connect(matchStateToProp, matchDispatchToProp)(App);
