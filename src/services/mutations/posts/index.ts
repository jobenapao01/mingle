import { deletePost } from '@/components/posts/action';
import { submitPost } from '@/components/posts/editor/actions';
import { PostsPage } from '@/types';
import { InfiniteData, QueryFilters, useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
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

			//Invalidate query when post feed is empty
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

export const useDeletePost = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const pathname = usePathname();

	return useMutation({
		mutationFn: deletePost,
		onSuccess: async (deletedPost) => {
			const queryFilter: QueryFilters = { queryKey: ['post-feed'] };

			await queryClient.cancelQueries(queryFilter);

			queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(queryFilter, (oldData) => {
				if (!oldData) return;

				return {
					pageParams: oldData.pageParams,
					pages: oldData.pages.map((page) => ({
						nextCursor: page.nextCursor,
						posts: page.posts.filter((p) => p.id !== deletedPost?.id),
					})),
				};
			});

			toast.success('Post deleted.');

			if (pathname === `/posts/${deletedPost?.id}`)
				return router.push(`/users/${deletedPost?.user.username}`);
		},
		onError: (error) => {
			console.log(error);
			toast.error('Failed to delete post. Please try again later.');
		},
	});
};
