import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Startpage from './StartPage/startpage.js';
import Navbar from './navbar/navbar.js';
import DrawingArea from './BoardAssets/board.js';
//import Background from './background/background';
import Multi from '../src/multi/multi.js';

function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<Startpage />} />
				<Route
					exact
					path="/board"
					element={<DrawingArea />}
				/>
				<Route exact path="/multi" element={<Multi />} />
			</Routes>
		</div>
	);
}

export default App;
