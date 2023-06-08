import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
//import Background from './background/background'
import Navbar from './navbar/navbar.js';
import DrawingArea from './BoardAssets/board.js';
import Multi from '../src/multi/multi.js';
import Sigup from './form/signup.js';
import Login from './form/login.js';
import Result from './DrewingStore/result.js';
import Startpage from './StartPage/startpage.js';

function App() {
	return (
		<div>
         
			<Navbar />

			<Routes>
				<Route path="/" element={<Startpage />} />  {/* Route to HomePage */}
				<Route exact path="/signup" element={<Sigup />} />
				<Route exact path="/result" element={<Result />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/board" element={<DrawingArea />} />
				<Route exact path="/multi" element={<Multi />} />
			</Routes>
		</div>
	);
}

export default App;
