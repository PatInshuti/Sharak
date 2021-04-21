import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './views/home';
import Login from './views/login';
import Signup from './views/signup';
import AllRequests from './views/requests';
import Profile from './views/profile';
import RequestSwipe from './views/requestSwipe';
import RequestCampusDirhams from './views/requestDirhams';


const App = () =>{
  return (
    <Router>
        <Switch>

        <Route exact path="/login">
            <Login/>
          </Route>

          <Route exact path="/home">
            <Home/>
          </Route>

          <Route exact path="/signup">
            <Signup/>
          </Route>

          <Route exact path="/allRequests">
            <AllRequests/>
          </Route>

          <Route exact path="/profile">
            <Profile/>
          </Route>

          <Route exact path="/requestSwipe">
            <RequestSwipe/>
          </Route>

          <Route exact path="/requestCampusDirhams">
            <RequestCampusDirhams/>
          </Route>

          <Route exact path="*">
            <Login />
          </Route>

        </Switch>
    </Router>
  );
}

export default App;