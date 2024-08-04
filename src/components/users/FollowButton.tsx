'use client';

import { useFollowerInfoQuery } from '@/services/queries/users';
import { FollowerInfo } from '@/types';
import { Button } from '../ui/button';
import { useFollowerInfoMutation } from '@/services/mutations/users';

type FollowButtonProps = {
	userId: string;
	initialState: FollowerInfo;
};

const FollowButton = ({ userId, initialState }: FollowButtonProps) => {
	const { data } = useFollowerInfoQuery(userId, initialState);
	const { mutate: follow } = useFollowerInfoMutation(userId, data);

	return (
		<Button
			variant={data.isFollowedByUser ? 'secondary' : 'default'}
			onClick={() => follow()}
		>
			{data.isFollowedByUser ? 'Unfollow' : 'Follow'}
		</Button>
	);
};

export default FollowButton;
