import React, { useState, useEffect } from 'react';
import { PostDrowing } from '../api/api.js';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { UseUploadContext } from '../userHooks/useUploadConwxt.js';
import { create_Image } from '../store/constansTypes/constantTypes.js';
import { useNavigate } from 'react-router-dom';
const UploadImage = () => {
	const { dispatch } = UseUploadContext();
	const [image, setImage] = useState('');
	const navigator = useNavigate();

	const changeValue = e => {
		const read = new FileReader();
		read.readAsDataURL(e.target.files[0]);
		read.onload = () => {
			console.log(read.result);
			setImage(read.result);
		};
		read.get = () => {
			console.log('get!');
		};
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
		await PostDrowing(ob);
		dispatch({ type: create_Image, payload: ob });
		navigator('/result');
	};

	return (
		<Container>
			<Row>
				<Card
					style={{
						width: '500px',
						height: '500px',
						border: '2px',
						background: 'grey',
					}}>
					<h3>let´s us upload the images</h3>
					<Col>
						<input
							accept="image/*"
							type="file"
							name="myImage"
							onChange={changeValue}
						/>
					</Col>
					<button onClick={onsubmitHandle}>
						share your galley
					</button>
				</Card>
			</Row>
			{image === '' || image === null ? '' : null}
		</Container>
	);
};

export default UploadImage;
