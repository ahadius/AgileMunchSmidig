import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
//import Background from './background/background'
import { UseAuthUser } from '../src/userHooks/userAuth.js';

import Navbar from './navbar/navbar.js';
import DrawingArea from './BoardAssets/board.js';
import Multi from '../src/multi/multi.js';
import Sigup from './form/signup.js';
import Login from './form/login.js';
import Result from './form/result.js';
import Startpage from './StartPage/startpage.js';
import Room from './room/room.js';
import UploadImage from './form/uploadImage.js';

function App() {
	const { user } = UseAuthUser();
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
				<Route
					path="/uploadImage"
					element={<UploadImage />}
				/>
				<Route exact path="/multi" element={<Multi />} />
				<Route exact path="/room" element={<Room />} />{' '}
				<Route
					path="/login"
					element={
						!user ? <Login /> : <Navigate to="/result" />
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
