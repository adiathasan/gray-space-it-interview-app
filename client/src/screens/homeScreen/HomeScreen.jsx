import React, { useState } from 'react';
import './home.css';
import { useQuery } from 'react-query';
import { instanceOfAxiosPosts } from '../../config/Axios';
import { Link } from 'react-router-dom';
import Form from '../../components/form/Form';
import { Skeleton } from '@material-ui/lab';

const truncateString = (str, num) => {
	if (str.length <= num) {
		return str;
	}
	// Return str truncated with '...' concatenated to the end of str.
	return str.slice(0, num) + '...';
};

const HomeScreen = () => {
	const [startPost, setStartPost] = useState(0);
	const [limitPost, setLimitPost] = useState(10);

	const handleInfiniteScroll = (e) => {
		const target = e.target;
		const triggerHeight = target.scrollTop + target.offsetHeight;
		if (triggerHeight >= target.scrollHeight) {
			setStartPost(0);
			setLimitPost(limitPost + 10);
		}
	};
	const postsQuery = async () => {
		const { data } = await instanceOfAxiosPosts.get(
			`/posts?_start=${startPost}&_limit=${limitPost}`
		);
		return data;
	};
	const { status, data } = useQuery('posts', postsQuery, {
		refetchInterval: 0,
	});
	return (
		<div className='home p-x' onScroll={handleInfiniteScroll}>
			{status === 'loading' ? (
				<>
					{Array(10)
						.fill('', 1, 10)
						.map((a, i) => (
							<Skeleton
								key={i}
								style={{
									maxWidth: '100%',
									margin: '1rem auto',
									borderRadius: '10px',
								}}
								animation='wave'
								variant='rect'
								width={600}
								height={118}
							/>
						))}
				</>
			) : (
				<>
					<Form placeholder={"What's on your mind!"} />
					<>
						{data?.map((post) => (
							<Link
								key={post.id}
								to={`/blogs/${post.id}`}
								className='home__blog'>
								<img
									src='https://images.unsplash.com/photo-1564865878688-9a244444042a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'
									alt='blog_image'
								/>
								<div className='home__blogRight'>
									<h2>{post.title}</h2>
									<p>{truncateString(post.body, 100)}</p>
								</div>
							</Link>
						))}
					</>
				</>
			)}
		</div>
	);
};

export default HomeScreen;
