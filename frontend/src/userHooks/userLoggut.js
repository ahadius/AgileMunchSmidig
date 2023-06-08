import { UseAuthUser } from '../userHooks/userAuth.js';
import { logout } from '../store/constansTypes/constantTypes.js';
export const UseLogout = () => {
	const { dispatch } = UseAuthUser();
	const LogOutFuc = () => {
		localStorage.removeItem('user');
		dispatch({ type: logout });
	};
	return { LogOutFuc };
};
