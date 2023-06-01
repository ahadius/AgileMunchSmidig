import React from 'react';
import './App.css';
import DrawingArea from "./BoardAssets/board.js";
import StartingPage from './StartPage/startpage.js';
import { BrowserRouter as Router, Route, BrowserRouter } from 'react-router-dom';




function App() {
    return (
        <BrowserRouter>
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
    
            <Route path="/" component={StartingPage} />
            <Route path="/drawing" component={DrawingArea} />
    
            <div className="whiteBox"></div>
          </div>
        </Router>
        </BrowserRouter>
      );
}

export default App;
