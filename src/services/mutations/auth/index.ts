import { logout } from '@/app/(auth)/actions';
import { login } from '@/app/(auth)/login/actions';
import { signUp } from '@/app/(auth)/sign-up/actions';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useLogout = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.clear();
		},
		onError: (error) => {
			console.log(error);
			toast.error('Something went wrong. Please try again later.');
		},
	});
};
