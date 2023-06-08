import '../App.css';
import { useState, useEffect } from 'react';
import { NewUser } from '../api/api.js';
import { UseAuthUser } from '../userHooks/userAuth.js';
import { useNavigate } from 'react-router';

const Sigup = () => {
	const { dispatch } = UseAuthUser();
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		NewUser()
			.then(data => {
				return data;
			})
			.catch(err => {
				console.log(err);
			});
	}, [dispatch]);

	const onchangName = e => {
		const result = e.target.value;
		setName(result);
	};

	const onchangEmail = e => {
		const result = e.target.value;
		setEmail(result);
	};
	const onchangPassword = e => {
		const result = e.target.value;
		setPassword(result);
	};

	const onSubmit = async e => {
		e.preventDefault();
		const userOb = {
			name,
			email,
			password,
		};

		const result = await NewUser(userOb);
		localStorage.setItem('user', JSON.stringify(result));
		localStorage.setItem('token', result.token);
		setName('');
		setEmail('');
		setPassword('');
		navigate('/login');
	};

	return (
		<div className="Auth-form-container">
			<form className="Auth-form">
				<div className="Auth-form-content">
					<h3 className="Auth-form-title">sign up</h3>
					<div className="form-group mt-3">
						<label>Username</label>
						<input
							onChange={onchangName}
							type="username"
							className="form-control mt-1"
							placeholder="Username"
						/>
					</div>
					<div className="form-group mt-3">
						<label>email</label>
						<input
							onChange={onchangEmail}
							type="email"
							className="form-control mt-1"
							placeholder="Enter password"
						/>
					</div>
					<div className="form-group mt-3">
						<label>password</label>
						<input
							onChange={onchangPassword}
							type="password"
							className="form-control mt-1"
							placeholder="Enter telefon"
						/>
					</div>
					<div className="d-grid gap-2 mt-3">
						<button
							onClick={onSubmit}
							type="submit"
							className="btn btn-primary">
							sign up
						</button>
					</div>
					<p className="forgot-password text-right mt-2">
						<a href="/login">login</a>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Sigup;
