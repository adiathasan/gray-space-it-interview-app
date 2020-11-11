import * as userTypes from '../constants/USER_CONSTANTS';

export const userReducer = (state = { user: null, error: null }, action) => {
	switch (action.type) {
		case userTypes.SIGNUP_USER_SUCCESS:
			return {
				...state,
			};
		case userTypes.SIGNUP_USER_FAILURE:
			return {
				...state,
				error: action.payload,
			};
		case userTypes.LOGIN_USER_SUCCESS:
			return {
				...state,
				user: action.payload,
			};
		case userTypes.LOGIN_USER_FAILURE:
			return {
				...state,
				error: action.payload,
			};
		case userTypes.ERROR_RESET:
			return {
				...state,
				error: null,
			};
		case userTypes.LOGOUT_USER:
			localStorage.removeItem('user');
			return {
				user: null,
				error: null,
			};

		default:
			return state;
	}
};
