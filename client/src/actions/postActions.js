import { instanceOfAxiosPosts } from '../config/Axios';
import { LOADER_REQUEST, LOADER_SUCCESS } from '../constants/LOADER_CONSTANTS';
import {
	GET_POST_BY_ID_FAILUER,
	GET_POST_BY_ID_SUCCESS,
} from '../constants/POSTS_CONSTANTS';
import { ERROR_RESET } from '../constants/USER_CONSTANTS';

export const getPostByIdAction = (blogId) => async (dispatch) => {
	dispatch({ type: LOADER_REQUEST });
	try {
		const { data } = await instanceOfAxiosPosts.get(`/posts/${blogId}`);
		const user = await (
			await instanceOfAxiosPosts.get(`/users/${data?.userId}`)
		).data;
		const comments = await (
			await instanceOfAxiosPosts.get(`/posts/${blogId}/comments`)
		).data;
		dispatch({
			type: GET_POST_BY_ID_SUCCESS,
			payload: { data, comments, user },
		});
		dispatch({ type: LOADER_SUCCESS });
	} catch (error) {
		dispatch({ type: LOADER_SUCCESS });
		dispatch({
			type: GET_POST_BY_ID_FAILUER,
			payload: 'Oops! Post Not Found',
		});
		setTimeout(() => {
			dispatch({ type: ERROR_RESET });
		}, 3000);
	}
};
