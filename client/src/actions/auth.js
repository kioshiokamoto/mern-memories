import { AUTH } from '../constants/actionTypes'
import * as api from '../api';

export const signin = (formData, history)=> async (dispatch) => {
	try {
		//login user

        history.push('/');
		
	} catch (error) {
		console.log(error.message);
	}
};
export const signup = (formData, history)=> async (dispatch) => {
	try {
		//register user

        history.push('/');
		
	} catch (error) {
		console.log(error.message);
	}
};