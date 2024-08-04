'use client';
import { formatNumber } from '@/lib/utils';
import { useFollowerInfoQuery } from '@/services/queries/users';
import { FollowerInfo } from '@/types';

type FollowerCountProps = {
	userId: string;
	initialState: FollowerInfo;
};

const FollowerCount = ({ userId, initialState }: FollowerCountProps) => {
	const { data } = useFollowerInfoQuery(userId, initialState);

	return (
		<span>
			Followers: <span className='font-semibold'>{formatNumber(data.followers)}</span>
		</span>
	);
};

export default FollowerCount;
