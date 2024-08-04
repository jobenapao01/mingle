import { validateRequest } from '@/auth';
import { getUserDataSelect } from '@/types';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import TrendingSidebar from '../../_components/TrendingSidebar';
import UserProfile from './_components/UserProfile';
import UserPostFeed from '@/components/posts/feed/UserPostFeed';

type ProfilePageProps = {
	params: { username: string };
};

//to avoid multiple get user request
const getUser = cache(async (username: string, loggedInUserId: string) => {
	const user = await prisma?.user.findFirst({
		where: {
			username: {
				equals: username,
				mode: 'insensitive',
			},
		},
		select: getUserDataSelect(loggedInUserId),
	});

	if (!user) notFound();

	return user;
});

export const generateMetadata = async ({
	params: { username },
}: ProfilePageProps): Promise<Metadata> => {
	const { user: loggedInUser } = await validateRequest();

	if (!loggedInUser) return {};

	const user = await getUser(username, loggedInUser.id);

	return {
		title: `${user.displayName} (@${user.username})`,
	};
};

const ProfilePage = async ({ params: { username } }: ProfilePageProps) => {
	const { user: loggedInUser } = await validateRequest();

	if (!loggedInUser) {
		return <p className='text-center font-bold'>You&apos;re not authorized to view this page.</p>;
	}

	const user = await getUser(username, loggedInUser.id);

	return (
		<main className='flex w-full min-w-0 gap-5'>
			<div className='w-full min-w-0 space-y-5'>
				<UserProfile
					user={user}
					loggedInUserId={loggedInUser.id}
				/>
				<div className='rounded-2xl bg-primary-foreground p-5 shadow-sm'>
					<h2 className='text-center text-2xl font-bold'>{user.displayName}&apos;s posts</h2>
				</div>
				<UserPostFeed userId={user.id} />
			</div>
			<TrendingSidebar />
		</main>
	);
};

export default ProfilePage;
