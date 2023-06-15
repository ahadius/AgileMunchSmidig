import { useState } from 'react';
import { UseAuthUser } from './userAuth.js';
import { loggin } from '../store/constansTypes/constantTypes.js';

export const useLogin = () => {
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(null);
	const { dispatch } = UseAuthUser();
	const url = 'http://localhost:8000';

	const Log = async (email, password) => {
		setIsLoading(true);
		setError(null);

		const response = await fetch(`${url}/login`, {
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
			localStorage.setItem('user', JSON.stringify(json));

			dispatch({ type: loggin, payload: json });

			setIsLoading(false);
		}
	};

	return { Log, isLoading, error };
};
