import {
	set_Image,
	create_Image,
} from '../constansTypes/constantTypes.js';
export const ImageReduser = (state, action) => {
	switch (action.type) {
		case set_Image:
			return {
				img: action.payload,
			};
		case create_Image:
			return {
				img: [action.payload, ...state.img],
			};
		default:
			return state;
	}
};
