import logo from '../../logo.svg';
import './App.css';
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import HeaderApp from '../../components/Header/Header';
import FooterApp from '../../components/Footer/Footer';

class App extends Component {
  constructor(){
    super();
  }

  render(){
    return(
        <Router>
            <HeaderApp />
          <div>
            Hallo
          </div>
            <FooterApp />
        </Router>
    )
  }
}

export default App;
