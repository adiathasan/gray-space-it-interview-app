import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './reducers/userReducers';
import { loaderReducer } from './reducers/loaderReducer';
import { postByIdReducer } from './reducers/postReducers';

const reducer = combineReducers({
	userInfo: userReducer,
	loader: loaderReducer,
	postById: postByIdReducer,
});

const userInfoFromLocalStorage = localStorage.getItem('user')
	? JSON.parse(localStorage.getItem('user'))
	: null;

const initState = {
	userInfo: {
		user: userInfoFromLocalStorage,
	},
};

export const store = createStore(
	reducer,
	initState,
	composeWithDevTools(applyMiddleware(thunk))
);
