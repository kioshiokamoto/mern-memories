import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, FETCH_BY_SEARCH } from '../constants/actionTypes';

//Posts === a un state
// eslint-disable-next-line import/no-anonymous-default-export
export default (posts = [], action) => {
	switch (action.type) {
		case FETCH_ALL:
			return action.payload;
		case FETCH_BY_SEARCH:
			return action.payload;
		case CREATE:
			return [...posts, action.payload];
		case UPDATE:
		case LIKE:
			return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
		case DELETE:
			return posts.filter((post) => post._id !== action.payload);
		default:
			return posts;
	}
};
