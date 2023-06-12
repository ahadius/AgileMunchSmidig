import React, { useEffect } from 'react';
import Rating from './rating.js';
import { Container, Card, Row, Col } from 'react-bootstrap';

import { GetData } from '../api/api.js';
import { set_Image } from '../store/constansTypes/constantTypes.js';
import { UseUploadContext } from '../userHooks/useUploadConwxt.js';
import ShareFB from '../form/shareFb.js';
import ShareFb from '../form/shareFb.js';

const Result = () => {
	const { img, dispatch } = UseUploadContext();

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
	}, [dispatch, img]);

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
			<Card className="m-5 p-5 border-0 shadow">
				<Container>
					<Card.Title as="h1">Your images</Card.Title>
					<Row>
						{img.map(p => (
							<Col>
								<Card.Img
									className="border border-success border border-5"
									src={p.image}
									height={100}
									width={50}
									border-radius={(50, 20)}
								/>
							</Col>
						))}

						<Card.Img style={styles.cardImage} />
						<ShareFb />
					</Row>
				</Container>
			</Card>
		</Container>
	);
};

export default Result;
