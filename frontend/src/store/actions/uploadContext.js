import { createContext, useReducer } from 'react';
import { ImageReduser } from '../reducers/uploadReducer.js';
export const UploadContext = createContext();

const initialState = {
	img: [],
};

export const ImageContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(
		ImageReduser,
		initialState
	);
	console.log('uploadContext state is ', state);
	return (
		<UploadContext.Provider value={{ ...state, dispatch }}>
			{children}
		</UploadContext.Provider>
	);
};
