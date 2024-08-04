'use client';

import { useForYouFeedQuery, useUserPostFeedQuery } from '@/services/queries/posts';
import Post from '../Post';
import { Loader2 } from 'lucide-react';
import InfiniteScrollingContainer from '@/components/InfiniteScrollingContainer';
import PostsSkeleton from '../PostsSkeleton';

type UserPostFeedProps = {
	userId: string;
};

const UserPostFeed = ({ userId }: UserPostFeedProps) => {
	const {
		data,
		isError,
		isPending,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		isSuccess,
	} = useUserPostFeedQuery(userId);

	const posts = data?.pages.flatMap((page) => page.posts) || [];
	console.log(posts);

	if (isPending) {
		return <PostsSkeleton />;
	}

	if (isSuccess && !posts.length && !hasNextPage) {
		return (
			<p className='text-center text-muted-foreground'>This user has not posted anything yet.</p>
		);
	}

	if (isError) {
		return (
			<p className='text-center text-destructive'>An error occurred while loading the posts.</p>
		);
	}

	return (
		<InfiniteScrollingContainer
			className='space-y-5'
			onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
		>
			{posts.map((post) => (
				<Post
					key={post.id}
					post={post}
				/>
			))}
			{isFetchingNextPage && <Loader2 className='mx-auto animate-spin my-3' />}
		</InfiniteScrollingContainer>
	);
};

export default UserPostFeed;
