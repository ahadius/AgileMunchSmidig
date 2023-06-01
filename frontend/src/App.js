import React from 'react';
import logo from './munch_logo.png';
import './App.css';
import DrawingArea from "./BoardAssets/board.js";

//import Startpage from './StartPage/startpage.js';
//import Board from './BoardAssets/board.js';


/*
<Navbar />
				<Routes>
					<Route path="/" element={<Startpage />} />

					<Route path="/dashbort" element={<Board/>} />


				</Routes>
*/
function App() {
    return (
        <div className="App">
            <div className="nav-container">
                <a href="/" className="nav-title">MUNCH</a>
                <a href="https://www.munchmuseet.no/en/buy-tickets/" className="nav-link">Tickets</a>
                <a href="https://www.munchmuseet.no/en/visit-us/" className="nav-link">Visit US</a>
            </div>
            <DrawingArea/>
            <div className="whiteBox"></div>
        </div>
    );
}

export default App;
