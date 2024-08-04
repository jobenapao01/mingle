import api from '@/services/axios';
import { PostsPage } from '@/types';

export const getForYouPost = async ({ pageParam }: { pageParam: string | null }) => {
	const { data } = await api.get<PostsPage>('/api/posts/for-you', {
		params: {
			cursor: pageParam,
		},
	});

	return data;
};

export const getFollowingPost = async ({ pageParam }: { pageParam: string | null }) => {
	const { data } = await api.get<PostsPage>(`/api/posts/following`, {
		params: {
			cursor: pageParam,
		},
	});

	return data;
};
