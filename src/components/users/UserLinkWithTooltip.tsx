'use client';

import { useGetUser } from '@/services/queries/users';
import Link from 'next/link';
import { PropsWithChildren } from 'react';
import UserTooltip from './UserTooltip';

type UserLinkWithTooltipProps = {
	username: string;
};

const UserLinkWithTooltip = ({
	username,
	children,
}: PropsWithChildren<UserLinkWithTooltipProps>) => {
	const { data } = useGetUser(username);

	if (!data) {
		return (
			<Link
				href={`/users/${username}`}
				className='text-primary hover:underline'
			>
				{children}
			</Link>
		);
	}

	return (
		<UserTooltip user={data}>
			<Link
				href={`/users/${username}`}
				className='text-primary hover:underline'
			>
				{children}
			</Link>
		</UserTooltip>
	);
};

export default UserLinkWithTooltip;
