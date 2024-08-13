import { FollowButton, FollowerCount, Linkify, UserAvatar } from '@/components';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatNumber } from '@/lib/utils';
import { FollowerInfo, UserData } from '@/types';
import { formatDate } from 'date-fns';

type UserProfileProps = {
	user: UserData;
	loggedInUserId: string;
};

const UserProfile = async ({ loggedInUserId, user }: UserProfileProps) => {
	const followerInfo: FollowerInfo = {
		followers: user._count.followers,
		isFollowedByUser: user.followers.some(({ followerId }) => followerId === loggedInUserId),
	};

	return (
		<div className='h-fit w-full space-y-5 rounded-2xl bg-primary-foreground p-5 shadow-sm'>
			<UserAvatar
				avatarUrl={user.avatarUrl}
				className='mx-auto size-full max-w-full max-h-full rounded-full'
				size={250}
			/>
			<div className='flex flex-wrap gap-3 sm:flex-nowrap'>
				<div className='me-auto space-y-3'>
					<div className=''>
						<h1 className='text-3xl font-bold'>{user.displayName}</h1>
						<div className='text-muted-foreground'>@{user.username}</div>
					</div>
					<div className=''>Member since {formatDate(user.createAt, 'MMM dd, yyyy')}</div>
					<div className='flex items-center gap-3'>
						<span>
							Posts: <span className='font-semibold'>{formatNumber(user._count.posts)}</span>
						</span>
						<FollowerCount
							userId={user.id}
							initialState={followerInfo}
						/>
					</div>
				</div>
				{user.id === loggedInUserId ? (
					<Button>Edit Profile</Button>
				) : (
					<FollowButton
						userId={user.id}
						initialState={followerInfo}
					/>
				)}
			</div>
			{user.bio && (
				<>
					<Separator />
					<Linkify>
						<div className='whitespace-pre-line overflow-hidden break-words'>{user.bio}</div>
					</Linkify>
				</>
			)}
		</div>
	);
};

export default UserProfile;
