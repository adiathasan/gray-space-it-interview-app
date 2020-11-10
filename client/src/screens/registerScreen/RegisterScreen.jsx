import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './register.css';
import { Button, TextField, Typography } from '@material-ui/core';
import Message from '../../components/message/Message';

const RegisterScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [alertMessage, setAlertMessage] = useState(null);
	const [messageType, setMessageType] = useState(null);

	// const router = useRouter();

	// const [LoginUser, LogoutUser] = useAuth();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(email, password);
		if (email === '' || password === '') {
			setAlertMessage(`Oops! email or password is empty`);
			setMessageType('error');
			setTimeout(() => {
				setAlertMessage(null);
			}, 6000);
		} else {
			// LoginUser({ email, password });
		}
	};

	// const {redirect} = useParams();

	// const redirect = redirect ? router.query.redirect : '/';

	// useEffect(() => {
	//   if (user) {
	//     router.push(redirect);
	//   }
	// }, [LogoutUser, user]);

	return (
		<>
			{alertMessage && <Message message={alertMessage} type={messageType} />}
			<div className='register'>
				<form
					className='register__form'
					noValidate
					autoComplete='off'
					onSubmit={handleSubmit}>
					<Typography variant='h5' color='primary'>
						Register
					</Typography>
					<TextField
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
