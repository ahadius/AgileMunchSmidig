import { UploadContext } from '../store/actions/uploadContext.js';
import { useContext } from 'react';
export const UseUploadContext = () => {
	const context = useContext(UploadContext);
	if (!context) {
		throw Error(
			'useDishes must best be inside the FoodContextProvider'
		);
	}
	return context;
};
