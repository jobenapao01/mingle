import { validateRequest } from '@/auth';
import { Navbar } from '@/components';
import SessionProvider from '@/providers/SessionProvider';
import { redirect } from 'next/navigation';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await validateRequest();

	if (!session.user) redirect('/login');

	return (
		<SessionProvider value={session}>
			<div className='flex min-h-dvh flex-col'>
				<Navbar />
				<main className='max-w-7xl mx-auto p-5'>{children}</main>
			</div>
		</SessionProvider>
	);
};

export default AuthLayout;
