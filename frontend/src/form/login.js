import React from 'react';
import { useState, useEffect } from 'react';
import { postLogin } from '../api/api.js';
import { useNavigate } from 'react-router-dom';
import { UseAuthUser } from '../userHooks/userAuth.js';
import { loggin } from '../store/constansTypes/constantTypes.js';

const Login = () => {
	const [name, setName] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();
	const { dispatch } = UseAuthUser();

	const onchangEmail = e => {
		const result = e.target.value;
		setName(result);
	};
	const onchangPassword = e => {
		const result = e.target.value;
		setPassword(result);
	};
	useEffect(() => {
		postLogin()
			.then(data => {
				return data;
			})
			.catch(err => {
				console.log(err);
			});
	}, [dispatch]);

	const onSubmit = async e => {
		e.preventDefault();
		const ob = {
			name,
			password,
		};
		const res = await postLogin(ob);
		let u = localStorage.setItem(
			'user',
			JSON.stringify(res)
		);

		dispatch({ type: loggin, payload: u });
		setName('');
		setPassword('');
		//navigate('/Details');
	};
	return (
		<div className="Auth-form-container">
			<form className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">login</h3>
					<div className="form-group mt-3">
						<label>Username</label>
						<input
							onChange={onchangEmail}
							type="username"
							className="form-control mt-1"
							placeholder="Username"
						/>
					</div>
					<div className="form-group mt-3">
						<label>Password</label>
						<input
							onChange={onchangPassword}
							type="password"
							className="form-control mt-1"
							placeholder="Enter password"
						/>
					</div>
					<div className="d-grid gap-2 mt-3">
						<button
							onClick={onSubmit}
							type="submit"
							className="btn btn-primary">
							login
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
