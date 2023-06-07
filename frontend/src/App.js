import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Startpage from './StartPage/startpage.js';
import Navbar from './navbar/navbar.js';
import DrawingArea from './BoardAssets/board.js';
//import Background from './background/background';
import Multi from '../src/multi/multi.js';
import Sigup from './form/signup.js';
import Login from './form/login.js';
import Result from './DrewingStore/result.js';

function App() {
	return (
		<div>
			<Navbar />
			<Routes>
				<Route path="/" element={<Startpage />} />
				<Route exact path="/signup" element={<Sigup />} />
				<Route exact path="/result" element={<Result />} />
				<Route exact path="/login" element={<Login />} />
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
