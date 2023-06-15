import React, { useEffect, useState } from 'react';
import {
	Container,
	Card,
	Row,
	Col,
	Image,
} from 'react-bootstrap';
import { GetData } from '../api/api.js';
import { set_Image } from '../store/constansTypes/constantTypes.js';
import { UseUploadContext } from '../userHooks/useUploadConwxt.js';
import Share from './shareFb.js';
import { useParams } from 'react-router';

const Details = () => {
	const { img, dispatch } = UseUploadContext();
	const params = useParams();
	const currentUrl = window.location.href;
	console.log(currentUrl);
	const currentImage = img.find(p => p._id === params.id);
	console.log(currentImage);

	const getDataFromDash = async () => {
		const data = await GetData();
		dispatch({ type: set_Image, payload: data });
		return data;
	};
	useEffect(() => {
		getDataFromDash()
			.then(data => {
				dispatch({ type: set_Image, payload: data });
			})
			.catch(err => {
				console.log(err.message);
			});
	}, [dispatch]);

	const styles = {
		card: {
			backgroundColor: '#B7E0F2',
			borderRadius: 50,
			padding: '3rem',
		},
		cardImage: {
			objectFit: 'cover',
			borderRadius: 55,
		},
	};

	return (
		<Container fluid>
			<Row>
				<Container>
					<Card.Title as="h1">
						Your image Details
					</Card.Title>
					<Col>
						<Image
							src={currentImage.image}
							width={500}
							height={300}
						/>
						<Share description={currentUrl} />
					</Col>
				</Container>
			</Row>
			<Card.Img style={styles.cardImage} />
		</Container>
	);
};

export default Details;
