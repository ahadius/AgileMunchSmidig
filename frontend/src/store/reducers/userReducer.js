import {
	logout,
	loggin,
} from '../constansTypes/constantTypes.js';
export const UserReduser = (state, action) => {
	switch (action.type) {
		case loggin:
			return {
				user: action.payload,
			};
		case logout:
			return {
				user: { user: null },
			};
		default:
			return state;
	}
};
