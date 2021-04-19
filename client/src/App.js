import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './views/home';
import Login from './views/login';
import Messages from './views/messages';
import Profile from './views/profile';


const App = () =>{
  return (
    <Router>
        <Switch>

          <Route exact path="/home">
            <Home/>
          </Route>

          <Route exact path="/login">
            <Login/>
          </Route>

          <Route exact path="/messages">
            <Messages/>
          </Route>

          <Route exact path="/profile">
            <Profile/>
          </Route>

          <Route exact path="*">
            <Home />
          </Route>

        </Switch>
    </Router>
  );
}

export default App;