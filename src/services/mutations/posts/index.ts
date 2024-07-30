import { submitPost } from '@/components/posts/editor/actions';
import { PostsPage } from '@/types';
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useSubmitPost = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: submitPost,
		onSuccess: async (newPost) => {
			const queryFilter: QueryFilters = { queryKey: ['post-feed', 'for-you'] };

			//stop any running queries
			await queryClient.cancelQueries(queryFilter);

			//set the data in the cache directly
			queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(queryFilter, (oldData) => {
				const firstPage = oldData?.pages[0];

				if (firstPage) {
					return {
						pageParams: oldData.pageParams,
						pages: [
							{
								posts: [newPost, ...firstPage.posts],
								nextCursor: firstPage.nextCursor,
							},
							...oldData.pages.slice(0),
						],
					};
				}
			});

			queryClient.invalidateQueries({
				queryKey: queryFilter.queryKey,
				predicate(query) {
					return !query.state.data;
				},
			});

			toast.success('Post created.');
		},
		onError: (error) => {
			console.log(error);
			toast.error('Failed to post. Please try again');
		},
	});
};
