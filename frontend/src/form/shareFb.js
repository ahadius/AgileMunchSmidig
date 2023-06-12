import React from 'react';
import { Button, Container } from 'react-bootstrap';
import {
	TwitterShareButton,
	TwitterIcon,
} from 'react-share';
import {
	FacebookShareButton,
	FacebookIcon,
} from 'react-share';
import Result from '../form/result.js';

function shareFb() {
	return (
		<Container className="ml-3">
			<FacebookShareButton
				url={'http://localhost:3000/'}
				hashtag="hello1">
				<i class="fa fa-share" className="pl-5"></i> share
				<FacebookIcon size={15} round />
				<TwitterShareButton url={'http://localhost:3000/'}>
					<TwitterIcon size={15} round />
				</TwitterShareButton>
			</FacebookShareButton>
		</Container>
	);
}

export default shareFb;
