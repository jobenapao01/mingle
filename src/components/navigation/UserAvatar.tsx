import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CircleUserRound } from 'lucide-react';

type UserAvatarProps = {
	avatarUrl?: string | null | undefined;
};

const UserAvatar = ({ avatarUrl }: UserAvatarProps) => {
	return (
		<Avatar>
			<AvatarImage
				src={avatarUrl || ''}
				alt='User avatar'
			/>
			<AvatarFallback>
				<CircleUserRound className='text-muted-foreground size-full dark:text-gray-500' />
			</AvatarFallback>
		</Avatar>
	);
};

export default UserAvatar;
