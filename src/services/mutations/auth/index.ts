import { logout } from '@/app/(auth)/actions';
import { login } from '@/app/(auth)/login/actions';
import { signUp } from '@/app/(auth)/sign-up/actions';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () => logout,
		onSuccess: () => {
			queryClient.clear();
		},
	});
};
