import { deleteFollowerInfo, postFollowerInfo } from '@/services/api/users';
import { FollowerInfo } from '@/types';
import { QueryKey, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useFollowerInfoMutation = (userId: string, data: FollowerInfo) => {
	const queryClient = useQueryClient();
	const queryKey: QueryKey = ['follower-info', userId];

	return useMutation({
		mutationFn: () =>
			data.isFollowedByUser ? deleteFollowerInfo(userId) : postFollowerInfo(userId),
		//optimistic update
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });

			const prevState = queryClient.getQueryData<FollowerInfo>(queryKey);

			//modify the cache
			queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
				followers: (prevState?.followers || 0) + (prevState?.isFollowedByUser ? -1 : 1),
				isFollowedByUser: !prevState?.isFollowedByUser,
			}));

			return { prevState };
		},
		onError: (error, variables, context) => {
			queryClient.setQueryData(queryKey, context?.prevState);
			console.log(error);
			toast.error('Something went wrong');
		},
	});
};
