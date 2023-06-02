import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Startpage from './StartPage/startpage.js';
import Navbar from './navbar/navbar.js';
import DrawingArea from './BoardAssets/board.js';

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
			</Routes>
		</div>
	);
}

export default App;
