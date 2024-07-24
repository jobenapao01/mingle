import { Metadata } from 'next';
import Image from 'next/image';

import signupImage from '/public/assets/sign-up.svg';
import Link from 'next/link';
import { SignUpForm } from '@/components';

export const metadata: Metadata = {
	title: 'Sign Up',
};

type Props = {};

const SignUpPage = ({}: Props) => {
	return (
		<main className='flex h-dvh items-center justify-center p-5'>
			<div className='flex h-full max-h-[40rem] w-full max-w-[64rem] rounded-2xl overflow-hidden bg-card shadow-2xl'>
				<div className='md:w-1/2 w-full space-y-10 overflow-y-auto p-10'>
					<div className='space-y-1 text-center '>
						<h1 className='text-3xl font-bold'>Sign up to mingle</h1>
						<p className='text-muted-foreground'>
							A place where <span className='italic'>you</span> can find a friend.
						</p>
					</div>
					<div className='space-y-5'>
						<SignUpForm />
						<Link
							href='/login'
							className='block text-center hover:underline'
						>
							Already have an account? Log in
						</Link>
					</div>
				</div>
				<div className='w-1/2 hidden shadow-2xl md:flex items-center justify-center'>
					<Image
						src={signupImage}
						alt='Sign up'
						priority
						className='object-contain size-full'
					/>
				</div>
			</div>
		</main>
	);
};

export default SignUpPage;
