import React, { useEffect } from 'react';
import '../App.css';
import { Navbar, Nav, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';
import { UseAuthUser } from '../userHooks/userAuth.js';
import { useLogout } from '../userHooks/userLoggut.js';
import { useNavigate } from 'react-router-dom';
const Header = () => {
	const { user } = UseAuthUser();
	console.log(user);
	const { Logout } = useLogout();
	const navigate = useNavigate();

	const onclickHandler = () => {
		Logout();
		navigate('/');
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
			<Navbar.Brand
				style={{
					fontFamily: 'impact',
					color: 'white',
					fontSize: 50,
				}}
				as={Link}
				to="/"
				className="mx-3">
				DRAW
			</Navbar.Brand>

			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="ms-auto">
					{user && (
						<Nav className="ml-2">
							<Col
								style={{
									fontSize: 30,

									color: 'white',
									marginRight: 30,
									marginTop: 7,
								}}>
								{user.email}
							</Col>

							<Nav.Link
								onClick={onclickHandler}
								style={{
									fontSize: 30,
									fontFamily: 'impact',
									color: 'white',
								}}>
								logged out
							</Nav.Link>
						</Nav>
					)}

					{!user && (
						<Nav.Link
							as={Link}
							to="/login"
							style={{
								fontSize: 30,
								fontFamily: 'impact',
								color: 'white',
							}}>
							Login
						</Nav.Link>
					)}

					{user && (
						<Nav.Link
							as={Link}
							to="/result"
							style={{
								fontSize: 30,
								fontFamily: 'impact',
								color: 'white',
							}}>
							Kunst Galleri
						</Nav.Link>
					)}
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default Header;
