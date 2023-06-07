const url = 'http://localhost:8000';

export const NewUser = async ({
	username,
	password,
	telefon,
}) => {
	try {
		const result = await fetch(`${url}/users`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ username, password, telefon }),
		});
		return result.json();
	} catch (error) {
		console.log('something went wrong in your code!!');
	}
};

export const userLogin = async () => {
	const response = await fetch(`${url}/login`);
	console.log(response);
	const data = await response.json();
	console.log(data);
	return data;
};

export const DeleteData = id => {
	fetch(`${url}/${id}`, {
		method: 'DELETE',
	}).then(data => {
		return data;
	});
};
export const GetData = async () => {
	const response = await fetch(`${url}/dishes`, {
		headers: {
			Authorization:
				`Bearer ` + localStorage.getItem('token'),
		},
	});

	const data = await response.json();
	return data;
};
/*export const PostProduct = async ({
	name,
	price,
	text,
}) => {
	try {
		const res = await fetch(`${url}/products`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ name, price, text }),
		});

		return res.json();
	} catch (error) {
		console.log('noe har gått galt');
	}
};
*/
