import { getForYouPost } from '@/services/api/posts';
import { PostData } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useForYouFeed = () => {
	return useQuery<PostData[]>({
		queryKey: ['post-feed', 'for-you'],
		queryFn: getForYouPost,
	});
};
