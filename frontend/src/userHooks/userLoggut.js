import { UseAuthUser } from './userAuth.js';
import { logout } from '../store/constansTypes/constantTypes.js';

export const useLogout = () => {
	const { dispatch } = UseAuthUser();

	const Logout = () => {
		// remove user from storage
		localStorage.removeItem('user');

		// dispatch logout action
		dispatch({ type: logout });
	};

	return { Logout };
};
