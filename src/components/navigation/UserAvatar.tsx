import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CircleUserRound } from 'lucide-react';

type UserAvatarProps = {
	avatarUrl?: string | null | undefined;
	className?: string;
};

const UserAvatar = ({ avatarUrl, className }: UserAvatarProps) => {
	return (
		<Avatar className={cn(className)}>
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
