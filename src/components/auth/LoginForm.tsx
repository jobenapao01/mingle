'use client';

import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useState, useTransition } from 'react';
import { loginSchema, LoginValues } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/app/(auth)/login/actions';
import { Input } from '../ui/input';
import { LoadingButton, PasswordInput } from '@/components';

const LoginForm = () => {
	const [error, setError] = useState<string>();

	const [isPending, startTransition] = useTransition();

	const form = useForm<LoginValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit = (values: LoginValues) => {
		setError(undefined);
		startTransition(async () => {
			const { error } = await login(values);

			if (error) setError(error);
		});
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-3 flex flex-col'
			>
				{error && <p className='text-destructive text-center'>{error}</p>}
				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder='Username'
									type='text'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<PasswordInput
									placeholder='Password'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<LoadingButton
					isLoading={isPending}
					type='submit'
					className='space-y-4'
				>
					Login
				</LoadingButton>
			</form>
		</Form>
	);
};

export default LoginForm;
