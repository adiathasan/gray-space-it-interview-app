import React, { useEffect, useState } from 'react';
import './blogDetails.css';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {
	Avatar,
	Button,
	IconButton,
	makeStyles,
	Tooltip,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import StarIcon from '@material-ui/icons/Star';
import Form from '../../components/form/Form';
import SkeletonCustome from '../../components/skeleton/SkeletonCustome';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostByIdAction } from '../../actions/postActions';
import { Skeleton } from '@material-ui/lab';
import Message from '../../components/message/Message';

const useStyles = makeStyles({
	avatar: {
		margin: '0 .5rem',
		marginLeft: '-.2rem',
		transform: 'scale(.95)',
		background: '#044868',
		cursor: 'pointer',
		boxShadow: '0 0 10px -7px rgba(0, 0, 0, .5)',
	},
});

const BlogDetailsScreen = () => {
	const classes = useStyles();
	const [alertMessage, setAlertMessage] = useState(null);
	const [messageType, setMessageType] = useState(null);
	const { blogId } = useParams();

	const dispatch = useDispatch();

	const { isLoading } = useSelector((state) => state.loader);

	const { post, error } = useSelector((state) => state.postById);

	useEffect(() => {
		if (error) {
			setAlertMessage(error);
			setMessageType('error');
			setTimeout(() => {
				setAlertMessage(null);
			}, 8000);
		}
	}, [error]);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
		});
	}, []);

	useEffect(() => {
		dispatch(getPostByIdAction(blogId));
	}, [blogId, dispatch]);

	return isLoading || error || !post ? (
		<div className='blogDetails p-x'>
			{alertMessage && <Message message={alertMessage} type={messageType} />}

			<header>
				<SkeletonCustome total={1} type='rect' width={600} height={70} />
				<section>
					<div className='section__left'>
						<Skeleton variant='circle' width={50} height={50} />
						<div className='section__leftDetails'>
							<SkeletonCustome total={1} type='rect' width={300} height={50} />
						</div>
					</div>
				</section>
			</header>
			<main>
				<SkeletonCustome total={1} type='rect' width={600} height={200} />

				<div className='main__body'>
					<SkeletonCustome total={1} type='rect' width={600} height={200} />
				</div>
			</main>
			<div className='comment'>
				<SkeletonCustome total={5} type='rect' width={600} height={70} />
			</div>
		</div>
	) : (
		<div className='blogDetails p-x'>
			<header>
				<h1>{post.data?.title}</h1>
				<section>
					<div className='section__left'>
						<Avatar className={classes.avatar}>
							<AccountCircleIcon />
						</Avatar>
						<div className='section__leftDetails'>
							<div className='section__leftDetailsTop'>
								<p>{post.user?.name}</p>
								<Button color='primary' variant='outlined' size='small'>
									Follow
								</Button>
							</div>
							<div className='section__leftDetailsBottom'>
								<span>
									Jul 5 . 3 min read <StarIcon />
								</span>
							</div>
						</div>
					</div>
					<div className='section__right'>
						<IconButton>
							<TwitterIcon />
						</IconButton>
						<IconButton>
							<LinkedInIcon />
						</IconButton>
						<IconButton>
							<BookmarkBorderIcon />
						</IconButton>
						<IconButton>
							<MoreHorizIcon />
						</IconButton>
					</div>
				</section>
			</header>
			<main>
				<img
					src='https://www.educative.io/api/page/5436540852371456/image/download/4965476405870592'
					alt='next.js'
				/>
				<div className='main__body'>
					<p>{post.data?.body}</p>
				</div>
			</main>
			<div className='comment'>
				<Form placeholder='commnet on the post' />
				{post.comments?.map((commnet) => (
					<div key={commnet.id} className='commnet__all'>
						<Tooltip title={commnet.email}>
							<Avatar className={classes.avatar}>
								<AccountCircleIcon />
							</Avatar>
						</Tooltip>
						<p>{commnet.body}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default BlogDetailsScreen;
