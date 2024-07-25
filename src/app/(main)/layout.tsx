import { validateRequest } from '@/auth';
import { Navbar } from '@/components';
import MenuBar from '@/components/navigation/MenuBar';
import SessionProvider from '@/providers/SessionProvider';
import { redirect } from 'next/navigation';

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
	const session = await validateRequest();

	if (!session.user) redirect('/login');

	return (
		<SessionProvider value={session}>
			<div className='flex min-h-dvh flex-col'>
				<Navbar />

				<main className='max-w-7xl mx-auto p-5 flex w-full grow gap-5'>
					<MenuBar className='sticky top-[5.25rem] h-fit hidden sm:block flex-none space-y-3 rounded-2xl bg-primary-foreground px-3 py-5 lg:px-5 shadow-sm xl:w-80' />
					{children}
				</main>
				<MenuBar className='sticky bottom-0 flex w-full justify-center gap-5 border-t bg-primary-foreground p-3 sm:hidden' />
			</div>
		</SessionProvider>
	);
};

export default AuthLayout;
