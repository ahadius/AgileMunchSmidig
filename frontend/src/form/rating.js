import React, { useState } from 'react';
import { NavLink } from 'react-bootstrap';

const Rating = e => {
	const [r, setR] = useState(0);
	const ChangeRate = () => {
		let x = 0;
		let res = x + 1;
		console.log(res);
		setR(res);
	};
	return (
		<div className="rating">
			<NavLink
				onClick={ChangeRate}
				className=" border border-1">
				<i class="fa-solid fa-thumbs-up"></i> liked
				<span> {r}</span>
			</NavLink>
		</div>
	);
};

export default Rating;
