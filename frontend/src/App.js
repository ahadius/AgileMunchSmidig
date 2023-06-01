import React from 'react';
import './App.css';
import DrawingArea from "./BoardAssets/board.js";
import Startpage from './StartPage/startpage.js';
import { BrowserRouter as Router, Route } from 'react-router-dom';



function App() {
    return (
        <Router>
          <div className="App">
            <div className="nav-container">
              <a href="/" className="nav-title">
                MUNCH
              </a>
              <a href="https://www.munchmuseet.no/en/buy-tickets/" className="nav-link">
                Tickets
              </a>
              <a href="https://www.munchmuseet.no/en/visit-us/" className="nav-link">
                Visit US
              </a>
            </div>
    
            <Route exact path="/" component={Startpage} />
            <Route path="/drawing" component={DrawingArea} />
    
            <div className="whiteBox"></div>
          </div>
        </Router>
      );
}

export default App;
