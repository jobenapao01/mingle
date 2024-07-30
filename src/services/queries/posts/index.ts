import { getForYouPost } from '@/services/api/posts';
import { PostData } from '@/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const useForYouFeed = () => {
	return useInfiniteQuery({
		queryKey: ['post-feed', 'for-you'],
		queryFn: getForYouPost,
		initialPageParam: null as string | null,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
	});
};
