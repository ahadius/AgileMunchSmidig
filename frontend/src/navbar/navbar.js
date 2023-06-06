import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { Card } from 'react-bootstrap';

const Navbar = () => {
	return (
		<div>
			<Card>hello</Card>
			<div className="App">
				<div className="nav-container">
					<Link to="./" className="Munch">
						MUNCH
						<Link to="./board"></Link>
					</Link>
					<Link to="./multi">multiplayers</Link>
					<Link to="./signup">signup</Link>
					<Link to="./login">login</Link>
				</div>

				<div className="whiteBox"></div>
			</div>
		</div>
	);
};

export default Navbar;
