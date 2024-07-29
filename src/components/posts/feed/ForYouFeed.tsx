'use client';

import { useForYouFeed } from '@/services/queries/posts';
import Post from '../Post';
import { Loader2 } from 'lucide-react';

const ForYouFeed = () => {
	const { data: posts, isError, isPending, isSuccess } = useForYouFeed();

	if (isPending) {
		return <Loader2 className='mx-auto animate-spin' />;
	}

	if (isError) {
		return (
			<p className='text-center text-destructive'>An error occurred while loading the posts.</p>
		);
	}

	return (
		<>
			{posts.map((post) => (
				<Post
					key={post.id}
					post={post}
				/>
			))}
		</>
	);
};

export default ForYouFeed;
