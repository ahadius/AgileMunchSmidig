import { useState } from 'react';

import { useLogin } from '../userHooks/userLogin.js';
import { redirect } from 'react-router';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { Log, error, isLoading } = useLogin();

	const handleSubmit = async e => {
		e.preventDefault();
		await Log(email, password);
	};

	return (
		<>
			<Container>
				<form className="" onSubmit={handleSubmit}>
					<h3>Login</h3>
					<label>Email address:</label>
					<input
						className="form-control"
						type="email"
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
					<label>Passord:</label>
					<input
						type="password"
						className="form-control"
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>

					<Button
						className="d-grid m-2 btn btn-primary "
						disabled={isLoading}>
						Login
					</Button>
					{error && <div className="error">{error}</div>}
					<Link to="/signup">sign up</Link>
				</form>
			</Container>
		</>
	);
};

export default Login;
