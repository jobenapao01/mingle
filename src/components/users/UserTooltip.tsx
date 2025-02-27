'use client';

import { useSession } from '@/providers/SessionProvider';
import { FollowerInfo, UserData } from '@/types';
import { PropsWithChildren } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import Link from 'next/link';
import UserAvatar from '../navigation/UserAvatar';
import FollowButton from './FollowButton';
import Linkify from '../Linkify';
import FollowerCount from './FollowerCount';

type UserTooltipProps = {
	user: UserData;
};

const UserTooltip = ({ user, children }: PropsWithChildren<UserTooltipProps>) => {
	const { user: loggedInUser } = useSession();

	const followerState: FollowerInfo = {
		followers: user._count.followers,
		isFollowedByUser: !!user.followers.some(({ followerId }) => followerId === loggedInUser.id),
	};

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>{children}</TooltipTrigger>
				<TooltipContent>
					<div className='flex max-w-80 flex-col gap-3 break-words px-1 py-2.5 lg:min-w-52'>
						<div className='flex items-center justify-between gap-2'>
							<Link href={`/users/${user.username}`}>
								<UserAvatar
									avatarUrl={user.avatarUrl}
									size={70}
								/>
							</Link>
							{loggedInUser.id !== user.id && (
								<FollowButton
									userId={user.id}
									initialState={followerState}
								/>
							)}
						</div>
						<div>
							<Link href={`/users/${user.username}`}>
								<div className='text-lg font-semibold hover:underline'>{user.displayName}</div>
								<div className='text-muted-foreground'>@{user.username}</div>
							</Link>
						</div>
						{user.bio && (
							<Linkify>
								<div className='line-clamp-4 whitespace-pre-line'>{user.bio}</div>
							</Linkify>
						)}
						<FollowerCount
							userId={user.id}
							initialState={followerState}
						/>
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default UserTooltip;
