import React, { Component } from 'react';
import Navbar from './Navbar'
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'

import Login from './Login'
import Hospital from './Splash'

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
     
          <Switch>
            
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Routes;
