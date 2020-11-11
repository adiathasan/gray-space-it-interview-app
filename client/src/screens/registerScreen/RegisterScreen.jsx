import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './register.css';
import { Button, TextField, Typography } from '@material-ui/core';
import Message from '../../components/message/Message';
import { useSelector, useDispatch } from 'react-redux';
import validator from 'validator';
import { userRegsterAction } from '../../actions/userActions';
import { Helmet } from 'react-helmet';

const RegisterScreen = () => {
	const [email, setEmail] = useState('');
	const [validateEmail, setValidateEmail] = useState(true);
	const [password, setPassword] = useState('');
	const [validatePassword, setValidatePassword] = useState(true);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [validateConfirmPassword, setValidateConfirmPassword] = useState(true);
	const [alertMessage, setAlertMessage] = useState(null);
	const [messageType, setMessageType] = useState(null);

	const dispatch = useDispatch();

	const { user, error } = useSelector((state) => state.userInfo);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (validatePassword && validateConfirmPassword && validateEmail) {
			dispatch(userRegsterAction({ email, password }));
		} else {
			setAlertMessage(`Oops! Missing required fields`);
			setMessageType('error');
			setTimeout(() => {
				setAlertMessage(null);
			}, 8000);
		}
	};

	const history = useHistory();

	useEffect(() => {
		if (user) {
			history.push('/');
		}
		if (error) {
			setAlertMessage(error);
			setMessageType('error');
			setTimeout(() => {
				setAlertMessage(null);
			}, 8000);
		}
	}, [history, user, error]);

	useEffect(() => {
		if (email === '') {
			setValidateEmail(true);
		} else {
			setValidateEmail(validator.isEmail(email));
		}
		if (password.length >= 6) {
			setValidatePassword(true);
			if (validator.equals(password, confirmPassword)) {
				setValidatePassword(true);
				setValidateConfirmPassword(true);
			} else {
				setValidatePassword(false);
				setValidateConfirmPassword(false);
			}
		} else {
			setValidatePassword(false);
			setValidateConfirmPassword(false);
		}
	}, [password, confirmPassword, email]);

	return (
		<>
			{alertMessage && <Message message={alertMessage} type={messageType} />}
			<div className='register'>
				<Helmet>
					<title>CodeBlog | Register</title>
				</Helmet>
				<form
					className='register__form'
					noValidate
					autoComplete='off'
					onSubmit={handleSubmit}>
					<Typography variant='h5' color='primary'>
						Register
					</Typography>
					<TextField
						error={!validateEmail}
						fullWidth
						className='register__input'
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
						className='register__input'
						label='Password'
						required
						variant='outlined'
						color='primary'
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
					<TextField
						error={!validateConfirmPassword}
						fullWidth
						className='register__input'
						label='Confirm Password'
						required
						variant='outlined'
						color='primary'
						type='password'
						onChange={(e) => setConfirmPassword(e.target.value)}
						value={confirmPassword}
					/>

					<Button fullWidth variant='contained' color='primary' type='submit'>
						submit
					</Button>
				</form>
			</div>
		</>
	);
};

export default RegisterScreen;
