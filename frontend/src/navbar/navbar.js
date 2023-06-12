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
import { Navbar, Nav } from 'react-bootstrap';

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

import { Link } from 'react-router-dom';
import { UseAuthUser } from '../userHooks/userAuth.js';
import { UseLogout } from '../userHooks/userLoggut.js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Header = () => {
	const [show] = useState(false);
	const { user } = UseAuthUser();
	const { LogFuc } = UseLogout();
	const navigate = useNavigate();

	const onclickHandler = () => {
		LogFuc();
		navigate('/signup');
	};

	return (
		<Navbar
			style={{ height: '100px', marginTop: 0 }}
			collapseOnSelect
			expand="sm"
			bg="dark"
			variant="dark"
			className="mb-0">
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
					{user && (
						<Nav.Link
							as={Link}
							to="/login"
							style={{
								fontSize: 30,
								fontFamily: 'impact',
							}}>
							Login
						</Nav.Link>
					)}
					{!user && (
						<Nav.Link
							onChange={onclickHandler}
							as={Link}
							to="/login"
							style={{
								fontSize: 30,
								fontFamily: 'impact',
							}}>
							Logget out
						</Nav.Link>
					)}
					{user && (
						<Nav.Link
							as={Link}
							to="/result"
							style={{
								fontSize: 30,
								fontFamily: 'impact',
							}}>
							Art gallery
						</Nav.Link>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

//test dette funker kanskje
export default Header;
