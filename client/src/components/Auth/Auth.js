import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router-dom'

import {signin, signup} from '../../actions/auth';

const initialState = {
	firstName:'',
	lastName:'',
	email:'',
	password:'',
	confirmPassword:''
}
const Auth = () => {
	const classes = useStyles();

	const [showPassword, setShowPassword] = useState(false);
	const [isSignup, setisSignup] = useState(false);
	const [formData, setFormData] = useState(initialState)

	const dispatch = useDispatch();
    const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		if(isSignup){
			dispatch(signup(formData,history));
		}else{
			dispatch(signin(formData,history));
		}

	};
	const handleChange = (e) => {
		setFormData({...formData, [e.target.name]:e.target.value})
	};
	const switchMode = () => {
		setisSignup((prevIsSignup) => !prevIsSignup);
		setShowPassword(false);
	};
	const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
	const googleSuccess = async (res) => {
		//console.log(res);
		const result = res?.profileObj;
		const token = res?.tokenId;
        
		try {
			dispatch({ type: 'AUTH', data: { result, token } });
            history.push('/')
		} catch (error) {
			console.log(error);
		}
	};
	const googleFailure = (err) => {
		console.log(err);
		console.log('Google SignIn was unsuccessful, try again later');
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignup && (
							<>
								<Input name="firstName" label="First Name" handleChange={handleChange} autofocus half />
								<Input name="lastName" label="Last Name" handleChange={handleChange} half />
							</>
						)}
						<Input name="email" label="Email Address" handleChange={handleChange} type="email" />
						<Input
							name="password"
							label="Password"
							handleChange={handleChange}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword}
						/>
						{isSignup && (
							<Input
								name="confirmPassword"
								label="Repeat password"
								handleChange={handleChange}
								type="password"
							/>
						)}
					</Grid>

					<Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
						{isSignup ? 'Sign Up' : 'Sign In'}
					</Button>
					<GoogleLogin
						clientId="452935593247-us3dsgpre2pckn9mevu0n6qvhr6nr4rf.apps.googleusercontent.com"
						render={(renderProps) => (
							<Button
								className={classes.googleButton}
								color="primary"
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
								variant="contained"
							>
								Google Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy="single_host_origin"
					/>
					<Grid container justify="flex-end">
						<Grid item>
							<Button onClick={switchMode}>
								{isSignup ? 'Already have an account? Sign In' : 'Dont have an account? Sign Up'}
							</Button>
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
