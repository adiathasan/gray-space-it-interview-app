import * as loderTypes from '../constants/LOADER_CONSTANTS';

export const loaderReducer = (state = { isLoading: false }, action) => {
	switch (action.type) {
		case loderTypes.LOADER_REQUEST:
			return {
				...state,
				isLoading: true,
			};
		case loderTypes.LOADER_SUCCESS:
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
};
