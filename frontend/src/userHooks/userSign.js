import { useState } from 'react';
import { UseUploadContext } from './useUploadConwxt.js';
import { loggin } from '../store/constansTypes/constantTypes.js';

export const UseSignup = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = UseUploadContext();
	const url = 'http://localhost:8000';

	const signup = async (email, password) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch(`${url}/users`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password }),
		});
		const json = await response.json();

		if (!response.ok) {
			setIsLoading(false);
			setError(json.error);
		}
		if (response.ok) {
			// save the user to local storage
			localStorage.setItem('user', JSON.stringify(json));

			// update the auth context
			dispatch({ type: loggin, payload: json });

			// update loading state
			setIsLoading(false);
		}
	};

	return { signup, isLoading, error };
};

export default UseSignup;
