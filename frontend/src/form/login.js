import React, { useState } from 'react';
import '../App.css';

const Login = () => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	const onchangeUsername = e => {
		const result1 = e.target.value;
		setUsername(result1);
		e.preventDefault();
	};
	const onchangePassword = e => {
		const result2 = e.target.value;
		setPassword(result2);
		e.preventDefault();
	};

	const setToDb = {
		username,
		password,
	};
	const onsubmitHandel = e => {
		e.preventDefault();
		console.log(setToDb);
	};
	return (
		<div className="Auth-form-container">
			<form className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">login</h3>
					<div className="form-group mt-3">
						<label>Username</label>
						<input
							onChange={onchangeUsername}
							type="username"
							className="form-control mt-1"
							placeholder="Username"
						/>
					</div>
					<div className="form-group mt-3">
						<label>Password</label>
						<input
							onChange={onchangePassword}
							type="password"
							className="form-control mt-1"
							placeholder="Enter password"
						/>
					</div>
					<div className="d-grid gap-2 mt-3">
						<button
							onClick={onsubmitHandel}
							type="submit"
							className="btn btn-primary">
							Submit
						</button>
					</div>
					<p className="forgot-password text-right mt-2">
						<a href="/signup">sign up</a>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Login;
