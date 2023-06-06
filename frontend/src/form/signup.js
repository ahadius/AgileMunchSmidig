import React from 'react';

const Sigup = () => {
	return (
		<div className="Auth-form-container">
		  <form className="Auth-form">
			<div className="Auth-form-content">
			  <h3 className="Auth-form-title">sign up</h3>
			  <div className="form-group mt-3">
				<label>Username</label>
				<input
				  type="email"
				  className="form-control mt-1"
				  placeholder="Username"
				/>
			  </div>
			  <div className="form-group mt-3">
				<label>Password</label>
				<input
				  type="password"
				  className="form-control mt-1"
				  placeholder="Enter password"
				/>
			  </div>
			  <div className="form-group mt-3">
				<label>telefon</label>
				<input
				  type="number"
				  className="form-control mt-1"
				  placeholder="Enter telefon"
				/>
			  </div>
			  <div className="d-grid gap-2 mt-3">
				<button type="submit" className="btn btn-primary">
				  Submit
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
