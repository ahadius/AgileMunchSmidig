import { useState } from 'react';

import { useLogin } from '../userHooks/userLogin.js';
import { redirect } from 'react-router';
import { Container, Form } from 'react-bootstrap';
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
					<Form.Group
						className="mb-2"
						controlId="exampleForm.ControlInput1">
						<input
							type="email"
							onChange={e => setEmail(e.target.value)}
							value={email}
						/>
					</Form.Group>
					<label>Password:</label>
					<Form.Group
						className="mb-2"
						controlId="exampleForm.ControlInput1">
						<input
							type="password"
							onChange={e => setPassword(e.target.value)}
							value={password}
						/>
					</Form.Group>
					<Form.Group
						className="mb-2"
						controlId="exampleForm.ControlInput1">
						<button disabled={isLoading}>Log in</button>
						{error && <div className="error">{error}</div>}
					</Form.Group>
				</form>
			</Container>
		</>
	);
};

export default Login;
