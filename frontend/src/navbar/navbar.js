/*import React from 'react';
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

export default Navbar;*/

import React from 'react';
//import { Link } from 'react-router-dom';
import '../App.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/*<div>
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
		</div>*/

const Header = () => {
	return (
		<Navbar
			style={{ height: '100px' }}
			collapseOnSelect
			expand="sm"
			bg="dark"
			variant="dark"
			className="mb-3">
			<Navbar.Brand
				style={{
					fontFamily: 'impact',
					color: 'red',
					fontSize: 50,
				}}
				as={Link}
				to="/"
				className="mx-3">
				MUNCH
			</Navbar.Brand>
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ms-auto">
					<Nav.Link
						as={Link}
						to="/board"
						style={{
							fontFamily: 'impact',
							fontSize: '25px',
						}}>
						Plays
					</Nav.Link>
					<Nav.Link
						as={Link}
						to="/login"
						style={{
							fontFamily: 'impact',
							fontSize: '25px',
						}}>
						Login
					</Nav.Link>
					<Nav.Link
						as={Link}
						to="/result"
						style={{
							fontFamily: 'impact',
							fontSize: '25px',
						}}>
						Yourdrawpictures
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};
//test dette funker kanskje
export default Header;
