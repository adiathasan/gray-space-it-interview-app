import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './login.css';
import { Button, TextField, Typography } from '@material-ui/core';
import Message from '../../components/message/Message';
import { useSelector, useDispatch } from 'react-redux';
import { userLoginAction } from '../../actions/userActions';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [alertMessage, setAlertMessage] = useState(null);
	const [messageType, setMessageType] = useState(null);

	const { user } = useSelector((state) => state.userInfo);

	const history = useHistory();

	console.log(user);

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email === '' || password === '') {
			setAlertMessage(`Oops! email or password is empty`);
			setMessageType('error');
			setTimeout(() => {
				setAlertMessage(null);
			}, 6000);
		} else {
			dispatch(userLoginAction({ email, password }));
		}
	};

	const redirect = history.location.search
		? history.location.search.split('=')[1]
		: '/';

	useEffect(() => {
		if (user) {
			history.push(redirect);
		}
	}, [user, history, redirect]);

	return (
		<>
			{alertMessage && <Message message={alertMessage} type={messageType} />}
			<div className='login'>
				<form
					className='login__form'
					noValidate
					autoComplete='off'
					onSubmit={handleSubmit}>
					<Typography variant='h5' color='primary'>
						Login
					</Typography>

					<TextField
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
