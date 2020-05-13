import React, {Component, Fragment} from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import Main from './Main';
import Start from './landingPage/Start';
import Signin from './landingPage/Signin';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isSignedIn:false,
      logginStatus:true,
      token:localStorage.getItem('token'),
    }
  }

  render(){
    return(
      

    <Fragment>
      <Router history={BrowserRouter}>
        <div className="root">
          <Switch>
        
                <Route exact
                path='/signin'
                component={Signin}
                >
            </Route>


            <Route
              exact
              path="/label"
              component={Main}
              >
            </Route>
                        
            <Route exact
                path='/'
                component={Start}
                >
            </Route>
            
          </Switch>
        </div>
      </Router>
    
        

    {/* <!-- <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js"></script> --> */}
    
    </Fragment>
      

  )}

}

export default App;
