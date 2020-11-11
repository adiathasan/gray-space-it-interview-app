import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import './header.css';
import Loader from '../loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT_USER } from '../../constants/USER_CONSTANTS';
import { Avatar, Button, makeStyles } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles({
	register: {
		margin: '0 .5rem',
	},
	avatar: {
		margin: '0 .5rem',
		transform: 'scale(.95)',
		background: 'rgba(0, 0, 0, .5)',
		cursor: 'pointer',
		boxShadow: '0 0 10px -2px rgba(0, 0, 0, .5)',
	},
});

const Header = () => {
	const classes = useStyles();
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
			<Toolbar>
				<Typography variant='h5' className='title'>
					<NavLink to='/' exact>
						CodeBlog
					</NavLink>
				</Typography>

				{user ? (
					<>
						<Avatar className={classes.avatar}>
							<AccountCircleIcon />
						</Avatar>
						<Typography variant='body1'>
							<Button
								onClick={() => logoutUser()}
								variant='contained'
								color='primary'>
								Logout
							</Button>
						</Typography>
					</>
				) : (
					<>
						<Typography variant='body1' className={classes.register}>
							<NavLink to='/register'>
								<Button variant='contained' color='primary'>
									Register
								</Button>
							</NavLink>
						</Typography>
						<Typography variant='body1'>
							<NavLink to='/login'>
								<Button variant='contained' color='primary'>
									Login
								</Button>
							</NavLink>
						</Typography>
					</>
				)}
			</Toolbar>
		</div>
	);
};

export default Header;
