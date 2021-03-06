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
import OverviewDashBoard from "../src/Dashboards/OverviewDashBoard/OverviewDashBoard";
import { connect } from "react-redux";
import Datasetdisplay from "./Dashboards/ProjectDashBoard/Datasetdisplay";
import Header from "./Header.js/Header";
import DisplayErrors from "./Errors/DisplayErrors";
import { Spinner } from "reactstrap";


// import Axios from "axios";


class App extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.props.verifyToken();
    //this.props.autoLogIn();
  }

  render() {
    return (
        <div className="root">
          <DisplayErrors />
          {
            this.props.status==="VERIFYING_TOKEN" ?
            <div className="vh-100 d-flex align-items-center justify-content-center">
              <Spinner color="primary" />
            </div>
            :
            this.props.loggedIn ? (
              <Router>
                <Header />
                <Switch>
                  <Route
                    exact
                    path="/label"
                    render={(props) => (
                      <Main {...props} handleUser={this.signOutUser} />
                    )}
                  ></Route>
                  <Route exact path="/projects" component={ProjectDashBoard} />
                  <Route exact path="/members" component={ProjectDashBoard} />
                  <Route exact path="/datasets" component={ProjectDashBoard} />
                  <Route exact path="/overview/:projectId" component={OverviewDashBoard} />
                  <Route exact path="/dataset/:datasetId" component={Datasetdisplay} />
                  <Route
                    exact
                    path="/"
                    component={() => <Redirect to="/projects" />}
                  />
                  <Route
                    exact
                    path="/signin"
                    component={() => <Redirect to="/projects" />}
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
                  {/* <Route
                    exact
                    path="/label"
                    component={() => <Redirect to="/signin" />}
                  />
                  <Route
                    exact
                    path="/projects"
                    component={() => <Redirect to="/signin" />}
                  />
                  <Route
                    exact
                    path="/overview"
                    component={() => <Redirect to="/signin" />}
                  /> */}
                  <Route path="*" component={() => <Redirect to="/" />} />
                </Switch>
              </Router>
            )
          }
        </div>
    );
  }
}

const matchStateToProp = (store) => ({
  status: store.user.status,
  loggedIn: store.user.loggedIn
})

const matchDispatchToProp = (dispatch) => ({
  verifyToken: (loggedIn) => {if (!loggedIn && 'token' in localStorage) dispatch({type: 'VERIFY_TOKEN', token: localStorage.getItem('token')})},
  autoLogIn: () => dispatch({type: 'LOGIN', logInCred: {email: 'team1@gmail.com', password: '12345'}})
})

export default connect(matchStateToProp, matchDispatchToProp)(App);
