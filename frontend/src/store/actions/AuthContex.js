import {
	createContext,
	useReducer,
	useEffect,
} from 'react';
import { UserReduser } from '../reducers/userReducer.js';
import { loggin } from '../constansTypes/constantTypes.js';
export const AuthContext = createContext();

const initialState = {
	user: null,
};

export const UserContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(
		UserReduser,
		initialState
	);

	console.log('authoContext state is ', state);
	useEffect(() => {
		const users = JSON.parse(localStorage.getItem('user'));
		if (users) {
			dispatch({ type: loggin, payload: users });
		}
	}, []);

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
