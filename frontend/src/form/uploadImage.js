import React, { useState, useEffect } from 'react';
import { PostDrowing } from '../api/api.js';
import { Card, Container } from 'react-bootstrap';
import { UseUploadContext } from '../userHooks/useUploadConwxt.js';
import { create_Image } from '../store/constansTypes/constantTypes.js';

const UploadImage = () => {
	const { dispatch } = UseUploadContext();
	const [image, setImage] = useState();

	const changeValue = e => {
		const res = e.target.files;
		setImage(res);
	};
	useEffect(() => {
		PostDrowing()
			.then(data => {
				return data;
			})
			.catch(err => {
				console.log(err);
			});
	}, [dispatch]);

	const onsubmitHandle = async e => {
		e.preventDefault();
		const ob = {
			image,
		};
		console.log(image);
		const res = await PostDrowing(ob);

		dispatch({ type: create_Image, payload: res });
	};

	return (
		<Container>
			<Card>
				<input type="file" onChange={changeValue} />
				<button onClick={onsubmitHandle}>
					share your galley
				</button>
			</Card>
		</Container>
	);
};

export default UploadImage;
