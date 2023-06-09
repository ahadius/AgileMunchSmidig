import { UseAuthUser } from '../userHooks/userAuth.js';
import { logout } from '../store/constansTypes/constantTypes.js';
export const UseLogout = () => {
	const { dispatch } = UseAuthUser();
	const LogFuc = () => {
		localStorage.removeItem('user');
		localStorage.clear();
		dispatch({ type: logout });
	};
	return { LogFuc };
};
