'use client';

import { useSession } from '@/providers/SessionProvider';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { UserAvatar } from '@/components';
import { Check, CircleUserRound, LogOutIcon, Monitor, Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { logout } from '@/app/(auth)/actions';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

type UserButtonProps = {
	className?: string;
};

const UserButton = ({ className }: UserButtonProps) => {
	const { user } = useSession();

	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className={cn('flex-none rounded-full', className)}>
					<UserAvatar avatarUrl={user?.avatarUrl} />
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className='w-fit p-6'>
				<DropdownMenuLabel>
					<div className='mb-4 flex flex-col items-center gap-2 rounded-lg'>
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
						<CircleUserRound className='mr-2 size-4' />
						Profile
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />

				<DropdownMenuSub>
					<DropdownMenuSubTrigger className='cursor-pointer'>
						<Monitor className='mr-2 size-4' />
						Theme
					</DropdownMenuSubTrigger>

					<DropdownMenuPortal>
						<DropdownMenuSubContent>
							<DropdownMenuItem
								onClick={() => setTheme('system')}
								className='cursor-pointer'
							>
								<Monitor className='mr-2 size-4' />
								System Default
								{theme === 'system' && <Check className='ms-2 size-4' />}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTheme('light')}
								className='cursor-pointer'
							>
								<Sun className='mr-2 size-4' />
								Light
								{theme === 'light' && <Check className='ms-2 size-4' />}
							</DropdownMenuItem>
							<DropdownMenuItem
								onClick={() => setTheme('dark')}
								className='cursor-pointer'
							>
								<Moon className='mr-2 size-4' />
								Dark
								{theme === 'dark' && <Check className='ms-2 size-4' />}
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>

				<DropdownMenuSeparator />

				<DropdownMenuItem
					className='flex gap-x-2 cursor-pointer'
					onClick={() => {
						logout();
					}}
				>
					<LogOutIcon className='mr-2 size-4' /> Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserButton;
