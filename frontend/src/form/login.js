import { useState } from 'react';

import { useLogin } from '../userHooks/userLogin.js';
import { redirect } from 'react-router';
import { Container } from 'react-bootstrap';
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
				<form className="login" onSubmit={handleSubmit}>
					<h3>Log In</h3>

					<label>Email address:</label>
					<input
						type="email"
						onChange={e => setEmail(e.target.value)}
						value={email}
					/>
					<label>Password:</label>
					<input
						type="password"
						onChange={e => setPassword(e.target.value)}
						value={password}
					/>

					<button disabled={isLoading}>Log in</button>
					{error && <div className="error">{error}</div>}
				</form>
			</Container>
		</>
	);
};

export default Login;
