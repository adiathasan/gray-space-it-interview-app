import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './login.css';
import { Button, TextField, Typography } from '@material-ui/core';
import Message from '../../components/message/Message';
import { useSelector, useDispatch } from 'react-redux';
import { userLoginAction } from '../../actions/userActions';
import validator from 'validator';
import { Helmet } from 'react-helmet';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [alertMessage, setAlertMessage] = useState(null);
	const [messageType, setMessageType] = useState(null);
	const [validateEmail, setValidateEmail] = useState(true);
	const [validatePassword, setValidatePassword] = useState(true);

	const { user, error } = useSelector((state) => state.userInfo);

	const history = useHistory();

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validatePassword && validateEmail) {
			dispatch(userLoginAction({ email, password }));
		} else {
			setAlertMessage(`Oops! email or password is empty`);
			setMessageType('error');
			setTimeout(() => {
				setAlertMessage(null);
			}, 8000);
		}
	};

	const redirect = history.location.search
		? history.location.search.split('=')[1]
		: '/';

	useEffect(() => {
		if (user) {
			history.push(redirect);
		}
		if (error) {
			setAlertMessage(error);
			setMessageType('error');
			setTimeout(() => {
				setAlertMessage(null);
			}, 8000);
		}
	}, [user, history, redirect, error]);

	useEffect(() => {
		if (email === '') {
			setValidateEmail(true);
		} else {
			setValidateEmail(validator.isEmail(email));
		}
		if (password.length >= 6) {
			setValidatePassword(true);
		} else {
			setValidatePassword(false);
		}
	}, [password, email]);

	return (
		<>
			{alertMessage && <Message message={alertMessage} type={messageType} />}
			<div className='login'>
				<Helmet>
					<title>CodeBlog | Login</title>
				</Helmet>
				<form
					className='login__form'
					noValidate
					autoComplete='off'
					onSubmit={handleSubmit}>
					<Typography variant='h5' color='primary'>
						Login
					</Typography>

					<TextField
						error={!validateEmail}
						fullWidth
						className='login__input'
						label='Email'
						required
						variant='outlined'
						color='primary'
						type='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>

					<TextField
						error={!validatePassword}
						fullWidth
						className='login__input'
						label='Password'
						required
						variant='outlined'
						color='primary'
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>

					<Button fullWidth variant='contained' color='primary' type='submit'>
						submit
					</Button>
				</form>
			</div>
		</>
	);
};

export default LoginScreen;
