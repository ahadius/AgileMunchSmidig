import { useState } from 'react';
import { UseSignup } from '../userHooks/userSign.js';
import { Container } from 'react-bootstrap';

const Signup = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { signup, error, isLoading } = UseSignup();

	const handleSubmit = async e => {
		e.preventDefault();

		await signup(email, password);
	};

	return (
		<>
			<Container>
				<form className="signup" onSubmit={handleSubmit}>
					<h3>Sign Up</h3>

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

					<button disabled={isLoading}>Sign up</button>
					{error && <div className="error">{error}</div>}
				</form>
			</Container>
		</>
	);
};

export default Signup;
