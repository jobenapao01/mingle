'use client';

import { PostData } from '@/types';
import Link from 'next/link';
import UserAvatar from '../navigation/UserAvatar';
import { formatRelativeDate } from '@/lib/utils';
import PostMoreButton from './PostMoreButton';
import { useSession } from '@/providers/SessionProvider';
import Linkify from '../Linkify';
import UserTooltip from '../users/UserTooltip';

type PostProps = {
	post: PostData;
};

const Post = ({ post }: PostProps) => {
	const { user } = useSession();
	return (
		<article className='space-y-3 rounded-2xl bg-primary-foreground p-5 shadow-md border group/post'>
			<div className='flex justify-between gap-3'>
				<div className='flex flex-wrap gap-3'>
					<UserTooltip user={post.user}>
						<Link href={`/users/${post.user.username}`}>
							<UserAvatar avatarUrl={post.user.avatarUrl} />
						</Link>
					</UserTooltip>

					<div>
						<UserTooltip user={post.user}>
							<Link
								href={`/users/${post.user.username}`}
								className='block font-medium hover:underline'
							>
								{post.user.displayName}
							</Link>
						</UserTooltip>

						<Link
							href={`/posts/${post.id}`}
							className='block text-sm text-muted-foreground hover:underline'
						>
							{formatRelativeDate(post.createAt)}
						</Link>
					</div>
				</div>
				{post.user.id === user.id && (
					<PostMoreButton
						post={post}
						className='opacity-0 transition-opacity group-hover/post:opacity-100'
					/>
				)}
			</div>
			<Linkify>
				<div className='whitespace-pre-line break-words space-y-3'>{post.content}</div>
			</Linkify>
		</article>
	);
};

export default Post;
