import React, { useEffect, useState } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import { GetData } from '../api/api.js';
import { set_Image } from '../store/constansTypes/constantTypes.js';
import { UseUploadContext } from '../userHooks/useUploadConwxt.js';
import { UseAuthUser } from '../userHooks/userAuth.js';
const Result = () => {
	const { user } = UseAuthUser();
	const { images, dispatch } = UseUploadContext();

	const getDataFromDash = async () => {
		const data = await GetData();
		return data;
	};
	useEffect(() => {
		getDataFromDash()
			.then(data => {
				let result = data;
				dispatch({ type: set_Image, payload: result });
			})
			.catch(err => {
				console.log(err.message);
			});
	}, [dispatch, user]);

	return (
		<>
			<Container>
				<p>you drowing result</p>
				<div
					style={{
						background: '#eeeff5',
						height: '40vh',
						marginTop: '10px',
						width: '800px',
					}}>
					{images &&
						images.map(p => (
							<Card key={p._id}>
								<Col>{p.image}</Col>
							</Card>
						))}
				</div>
			</Container>
		</>
	);
};

export default Result;
