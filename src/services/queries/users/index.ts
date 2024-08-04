import { getFollowerInfo } from '@/services/api/users';
import { FollowerInfo } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const useFollowerInfoQuery = (userId: string, initialState: FollowerInfo) => {
	return useQuery({
		queryKey: ['follower-info', userId],
		queryFn: () => getFollowerInfo(userId),
		initialData: initialState,
		staleTime: Infinity,
	});
};
