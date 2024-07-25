'use client';

import { useSession } from '@/providers/SessionProvider';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { UserAvatar } from '@/components';
import { CircleUserRound, LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { logout } from '@/app/(auth)/actions';
import { cn } from '@/lib/utils';

type UserButtonProps = {
	className?: string;
};

const UserButton = ({ className }: UserButtonProps) => {
	const { user } = useSession();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className={cn('flex-none rounded-full', className)}>
					<UserAvatar avatarUrl={user?.avatarUrl} />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='w-fit p-6'>
				<DropdownMenuLabel>
					<div className='mb-4 flex flex-col items-center gap-2 bg-primary-foreground rounded-lg'>
						<p className=''>Welcome back @{user?.username} </p>
						<span className='text-xs text-secondary-foreground'>
							{user?.googleId || user?.email}
						</span>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<DropdownMenuItem>
					<Link
						href={`/users/${user?.username}`}
						className='flex'
					>
						<CircleUserRound
							className='mr-2'
							size={15}
						/>
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />

				<DropdownMenuItem
					className='flex gap-x-2 cursor-pointer'
					onClick={() => {
						logout();
					}}
				>
					<LogOutIcon size={15} /> Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserButton;
