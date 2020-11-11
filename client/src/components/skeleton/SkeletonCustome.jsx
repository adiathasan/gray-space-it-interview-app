import { Skeleton } from '@material-ui/lab';
import React from 'react';

const SkeletonCustome = ({ total, width, height, type }) => {
	return Array(10)
		.fill('', 1, total + 1)
		.map((_, i) => (
			<Skeleton
				key={i}
				style={{
					maxWidth: '100%',
					margin: '1rem auto',
					borderRadius: '10px',
				}}
				animation='wave'
				variant={type}
				width={width}
				height={height}
			/>
		));
};

export default SkeletonCustome;
