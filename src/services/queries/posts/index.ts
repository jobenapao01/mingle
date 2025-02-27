import { getFollowingPost, getForYouPost, getUserPosts } from '@/services/api/posts';
import { PostData } from '@/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useForYouFeedQuery = () => {
	return useInfiniteQuery({
		queryKey: ['post-feed', 'for-you'],
		queryFn: getForYouPost,
		initialPageParam: null as string | null,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});
};

export const useFollowingFeedQuery = () => {
	return useInfiniteQuery({
		queryKey: ['post-feed', 'following'],
		queryFn: getFollowingPost,
		initialPageParam: null as string | null,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});
};

export const useUserPostFeedQuery = (userId: string) => {
	return useInfiniteQuery({
		queryKey: ['post-feed', 'user-posts', userId],
		queryFn: ({ pageParam }) => getUserPosts({ userId, pageParam }),
		initialPageParam: null as string | null,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});
};
