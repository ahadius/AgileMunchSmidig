const url = 'http://localhost:8000';

export const PostDrowing = async ({ image }) => {
	try {
		const res = await fetch(`${url}/uploading`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({ base64: image }),
		});
		return res.json();
	} catch (error) {
		console.log('noe har gått galt');
	}
};

export const GetData = async () => {
	const response = await fetch(`${url}/uploading`);
	const data = await response.json();
	return data;
};

export const DeleteData = id => {
	fetch(`${url}/${id}`, {
		method: 'DELETE',
	}).then(data => {
		return data;
	});
};
