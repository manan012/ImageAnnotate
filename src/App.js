import React, { Component, Fragment } from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Main from './AnnotationTool/Main';
import Start from './AnnotationTool/landingPage/Start';
import Signin from './AnnotationTool/landingPage/Signin';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isSignedIn: false,
      logginStatus: true,
      token: localStorage.getItem('token'),
    }
  }

  

  render() {

    console.log('hello',this.state.token);
    return (
        <Router>
          <div className="root">
            <Switch>

              <Route exact
                path='/signin'
                component={Signin}
              >
                

              </Route>
              <Route exact
                path='/'
                component={Start}
              >
              </Route>

              
              {localStorage.getItem('token') ? (
                
                
                <Route
                path="/label"
                component={Main}
              >
              </Route>
               
              )
               : (
                <Route exact
                path='/'
                component={()=><Redirect to = "/" />}
              />
                
              )}

              

              
              


            </Switch>
          </div>
        </Router>

        
    )
  }

}

export default App;
