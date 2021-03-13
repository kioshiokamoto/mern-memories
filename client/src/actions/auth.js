import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {
	try {
		//login user
		const { data } = await api.signin(formData);

		dispatch({ type: AUTH, data });
		
		history.push('/');
	} catch (error) {
		console.log(error.message);
	}
};
export const signup = (formData, history) => async (dispatch) => {
	try {
		//register user
		const { data } = await api.signup(formData);

		dispatch({ type: AUTH, data });

		history.push('/');
	} catch (error) {
		console.log(error.message);
	}
};
