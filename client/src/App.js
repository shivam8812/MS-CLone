import React,{useState} from 'react';
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Register from './components/Register'
import 'semantic-ui-css/semantic.min.css'
import { ContextProvider } from './Context';
import Login from './components/Login'

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/home">
            <ContextProvider>
              <Home />
            </ContextProvider>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
