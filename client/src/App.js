import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from './views/home';
import Login from './views/login';

const App = () =>{
  return (
    <Router>
        <Switch>

          <Route exact path="/">
            <Home/>
          </Route>

          <Route exact path="/login">
            <Login/>
          </Route>

          <Route exact path="*">
            <Home />
          </Route>

        </Switch>
    </Router>
  );
}

export default App;