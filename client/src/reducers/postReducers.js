import * as postTypes from '../constants/POSTS_CONSTANTS';
import { ERROR_RESET } from '../constants/USER_CONSTANTS';

export const postByIdReducer = (
	state = { post: null, error: null },
	action
) => {
	switch (action.type) {
		case postTypes.GET_POST_BY_ID_SUCCESS:
			return {
				...state,
				post: action.payload,
			};
		case postTypes.GET_POST_BY_ID_FAILUER:
			return {
				post: null,
				error: action.payload,
			};
		case ERROR_RESET:
			return {
				post: null,
				error: null,
			};
		default:
			return state;
	}
};
