import { validateRequest } from '@/auth';
import { FollowButton, UserAvatar } from '@/components';
import prisma from '@/lib/prisma';
import { getUserDataSelect } from '@/types';
import Link from 'next/link';

const WhoToFollow = async () => {
	const { user } = await validateRequest();

	if (!user) return null;

	const usersToFollow = await prisma.user.findMany({
		where: {
			NOT: {
				id: user?.id,
			},
			followers: {
				none: {
					followerId: user.id,
				},
			},
		},
		select: getUserDataSelect(user.id),
		take: 5,
	});

	return (
		<div className='space-y-5 rounded-2xl bg-primary-foreground p-5 shadow-md border dark:border-none'>
			<div className='text-xl font-bold'>Who to follow</div>
			{usersToFollow.map((user) => (
				<div
					key={user.id}
					className='flex items-center justify-between gap-3'
				>
					<Link
						href={`/users/${user.username}`}
						className='flex items-center gap-3'
					>
						<UserAvatar
							avatarUrl={user.avatarUrl}
							className='flex-none'
						/>
						<div>
							<p className='line-clamp-1 break-all font-semibold hover:underline'>
								{user.displayName}
							</p>
							<p className='line-clamp-1 break-all text-muted-foreground'>@{user.username}</p>
						</div>
					</Link>
					<FollowButton
						userId={user.id}
						initialState={{
							followers: user._count.followers,
							isFollowedByUser: user.followers.some(({ followerId }) => followerId === user.id),
						}}
					/>
				</div>
			))}
		</div>
	);
};

export default WhoToFollow;
