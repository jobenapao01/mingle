'use client';

import { signUpSchema, SignUpValues } from '@/lib/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { useState, useTransition } from 'react';
import { LoadingButton, PasswordInput } from '@/components';

import { signUp } from '@/app/(auth)/sign-up/actions';

const SignUpForm = () => {
	const [error, setError] = useState<string>();

	const [isPending, startTransition] = useTransition();

	const form = useForm<SignUpValues>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: '',
			password: '',
			username: '',
		},
	});

	const onSubmit = (values: SignUpValues) => {
		setError(undefined);
		startTransition(async () => {
			const { error } = await signUp(values);
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
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder='Email'
									type='email'
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
					className='space-y-4'
					type='submit'
					isLoading={isPending}
				>
					Create Account
				</LoadingButton>
			</form>
		</Form>
	);
};

export default SignUpForm;
