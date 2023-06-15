import { AuthContext } from '../store/actions/AuthContex.js';
import { useContext } from 'react';
export const UseAuthUser = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw Error(
			'AuthUser must best be inside the FoodContextProvider'
		);
	}
	return context;
};
