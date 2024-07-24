import { LoginForm } from '@/components';
import { Metadata } from 'next';
import Link from 'next/link';
import loginImage from '/public/assets/login.svg';
import Image from 'next/image';

export const metadata: Metadata = {
	title: 'Login',
};

const LoginPage = () => {
	return (
		<main className='flex h-dvh items-center justify-center p-5'>
			<div className='flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-y-hidden rounded-2xl bg-card shadow-xl'>
				<div className='w-full space-y-10 overflow-y-auto p-10 md:w-1/2'>
					<h1 className='text-center text-3xl font-bold'>Login to mingle</h1>
					<div className='space-y-5'>
						<LoginForm />
						<Link
							href='/sign-up'
							className='block text-center hover:underline'
						>
							Don&apos;t have an account? Sign up
						</Link>
					</div>
				</div>
				<div className='w-1/2 hidden shadow-2xl md:flex items-center justify-center'>
					<Image
						src={loginImage}
						alt='Login'
						priority
						className='object-cover'
					/>
				</div>
			</div>
		</main>
	);
};

export default LoginPage;
