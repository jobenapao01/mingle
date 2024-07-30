import { validateRequest } from '@/auth';
import { UserAvatar } from '@/components';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { userDataSelect } from '@/types';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const WhoToFollow = async () => {
	const { user } = await validateRequest();

	if (!user) return null;

	const usersToFollow = await prisma.user.findMany({
		where: {
			NOT: {
				id: user?.id,
			},
		},
		select: userDataSelect,
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
						href={user.username}
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
					<Button>
						<Plus className='size-4 mr-2' />
						Follow
					</Button>
				</div>
			))}
		</div>
	);
};

export default WhoToFollow;
