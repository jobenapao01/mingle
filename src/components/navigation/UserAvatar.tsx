import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CircleUserRound } from 'lucide-react';

type UserAvatarProps = {
	avatarUrl?: string | null | undefined;
	className?: string;
	size?: number;
};

const UserAvatar = ({ avatarUrl, className, size }: UserAvatarProps) => {
	return (
		<Avatar className={cn(className)}>
			<AvatarImage
				src={avatarUrl || ''}
				alt='User avatar'
				width={size ?? 48}
				height={size ?? 48}
			/>
			<AvatarFallback>
				<CircleUserRound
					className='text-muted-foreground size-full dark:text-gray-500'
					width={size ?? 48}
					height={size ?? 48}
				/>
			</AvatarFallback>
		</Avatar>
	);
};

export default UserAvatar;
