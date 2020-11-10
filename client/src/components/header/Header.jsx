import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import './header.css';
import Loader from '../loader/Loader';
import Message from '../message/Message';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT_USER } from '../../constants/USER_CONSTANTS';
import { Button } from '@material-ui/core';

const Header = () => {
	const [isHeaderActive, setIsHeaderActive] = useState(false);

	const { isLoading } = useSelector((state) => state.loader);

	const dispatch = useDispatch();

	const { user } = useSelector((state) => state.userInfo);

	window.addEventListener('scroll', () => {
		if (window.scrollY >= 45) {
			setIsHeaderActive(true);
		} else {
			setIsHeaderActive(false);
		}
	});

	const logoutUser = (e) => {
		dispatch({ type: LOGOUT_USER });
	};

	return (
		<div className={isHeaderActive ? 'headerActive' : 'root'}>
			{isLoading ? <Loader /> : ''}
			<Message message='testing buddy' />
			<Toolbar>
				<Typography variant='h5' className='title'>
					<NavLink to='/'>CodeBlog</NavLink>
				</Typography>

				{user ? (
					<Typography variant='body1'>
						<Button
							onClick={() => logoutUser()}
							variant='contained'
							color='primary'>
							Logout
						</Button>
					</Typography>
				) : (
					<>
						<Typography variant='body1'>
							<NavLink to='/register'>Register</NavLink>
						</Typography>
						<Typography variant='body1'>
							<NavLink to='/login'>Login</NavLink>
						</Typography>
					</>
				)}
			</Toolbar>
		</div>
	);
};

export default Header;
