import React from 'react';
import PostSkeleton from './PostSkeleton';

const PostsSkeleton = () => {
	return (
		<div className='space-y-5'>
			<PostSkeleton />
			<PostSkeleton />
			<PostSkeleton />
		</div>
	);
};

export default PostsSkeleton;
