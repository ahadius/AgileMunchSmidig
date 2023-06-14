import React, { useEffect } from 'react';
import {
	Container,
	Card,
	Row,
	Col,
	Image,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GetData } from '../api/api.js';
import { set_Image } from '../store/constansTypes/constantTypes.js';
import { UseUploadContext } from '../userHooks/useUploadConwxt.js';
import Share from './shareFb.js';

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
	}, [dispatch]);

	const styles = {
		card: {
			backgroundColor: '#B7E0F2',
			borderRadius: 50,
			padding: '3rem',
		},
		cardImage: {
			objectFit: 'cover',
			borderRadius: 50,
		},
	};

	return (
		<Container fluid>
			<Card.Title as="h1">Your images</Card.Title>

			<Row>
				{img.map(p => (
					<Col key={p._id}>
						<Link to={`/Details/:id ${p._id}`}>
							<Image
								className="border border-success border border-3"
								src={p.image}
								height={200}
								border-radius={(10, 10)}
							/>
						</Link>
					</Col>
				))}

				<Card.Img style={styles.cardImage} />
			</Row>
		</Container>
	);
};

export default Result;
