import React from 'react';
import {
	FacebookShareButton,
	FacebookIcon,
} from 'react-share';

const Share = ({ description }) => {
	const url = description;

	return (
		<div>
			<FacebookShareButton
				url={url}
				quote={'Munch museum!'}>
				{' '}
				Share
				<FacebookIcon size={32} round />
			</FacebookShareButton>
		</div>
	);
};

export default Share;
