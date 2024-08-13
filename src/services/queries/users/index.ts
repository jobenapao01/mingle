import { getFollowerInfo, getUser } from '@/services/api/users';
import { FollowerInfo } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useFollowerInfoQuery = (userId: string, initialState: FollowerInfo) => {
	return useQuery({
		queryKey: ['follower-info', userId],
		queryFn: () => getFollowerInfo(userId),
		initialData: initialState,
		staleTime: Infinity,
	});
};

export const useGetUser = (username: string) => {
	return useQuery({
		queryKey: ['user-data', username],
		queryFn: () => getUser(username),
		retry(failureCount, error) {
			if (error instanceof AxiosError && error?.response?.status === 404) {
				return false;
			}
			return failureCount < 3;
		},
		staleTime: Infinity,
	});
};
