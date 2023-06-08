const url = 'http://localhost:8000';

export const PostDrowing = async ({ picture }) => {
	try {
		const res = await fetch(`${url}/drowing`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ picture }),
		});

		return res.json();
	} catch (error) {
		console.log('noe har gått galt');
	}
};

export const NewUser = async ({
	name,
	email,
	password,
}) => {
	try {
		const result = await fetch(`${url}/users`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ name, email, password }),
		});
		return result.json();
	} catch (error) {
		console.log('something went wrong in your code!!');
	}
};

export const postLogin = async ({ email, password }) => {
	try {
		const result = await fetch(`${url}/login`, {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
		return result.json();
	} catch (error) {
		console.log('something went wrong in your login!');
	}
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

export const DeleteData = id => {
	fetch(`${url}/${id}`, {
		method: 'DELETE',
	}).then(data => {
		return data;
	});
};
