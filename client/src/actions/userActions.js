import { instanceOfAxios } from '../config/Axios';
import jwtDecode from 'jwt-decode';
import { LOADER_REQUEST, LOADER_SUCCESS } from '../constants/LOADER_CONSTANTS';
import {
	LOGIN_USER_FAILURE,
	LOGIN_USER_SUCCESS,
	SIGNUP_USER_FAILURE,
} from '../constants/USER_CONSTANTS';

export const userLoginAction = (credentials) => async (dispatch) => {
	dispatch({ type: LOADER_REQUEST });
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await instanceOfAxios.post('/token/', credentials, config);
		const decodedData = jwtDecode(data.access);
		dispatch({ type: LOADER_SUCCESS });
		dispatch({ type: LOGIN_USER_SUCCESS, payload: decodedData });
		localStorage.setItem('user', JSON.stringify(decodedData));
	} catch (error) {
		dispatch({ type: LOADER_SUCCESS });
		dispatch({
			type: LOGIN_USER_FAILURE,
			payload: 'Invalid Email or Password',
		});
	}
};

export const userRegsterAction = (credentials) => async (dispatch) => {
	dispatch({ type: LOADER_REQUEST });
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await instanceOfAxios.post('/users/', credentials, config);
		console.log(data);
		dispatch(
			userLoginAction({ email: data.email, password: credentials.password })
		);
	} catch (error) {
		console.log(error);
		dispatch({ type: LOADER_SUCCESS });
		dispatch({
			type: SIGNUP_USER_FAILURE,
			payload: 'Invalid Email or Password',
		});
	}
};
