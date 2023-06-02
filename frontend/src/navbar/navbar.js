import React from 'react';
import DrawingArea from '../BoardAssets/board.js';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<div>
			<div className="App">
				<div className="nav-container">
					<Link to="/">startpage</Link>
					<Link to="./board">board pages</Link>
				</div>

				<div className="whiteBox"></div>
			</div>
		</div>
	);
};

export default Navbar;
