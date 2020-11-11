import React, { useState } from 'react';
import './home.css';
import { useQuery } from 'react-query';
import { instanceOfAxiosPosts } from '../../config/Axios';
import { Link } from 'react-router-dom';
import Form from '../../components/form/Form';
import SkeletonCustome from '../../components/skeleton/SkeletonCustome';

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
				<SkeletonCustome total={10} width={600} height={118} type='rect' />
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
									src='https://rissputra.files.wordpress.com/2017/09/hard-work-beats-talent.jpg'
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
