'use client';

import { PostData } from '@/types';
import Link from 'next/link';
import UserAvatar from '../navigation/UserAvatar';
import { formatRelativeDate } from '@/lib/utils';
import PostMoreButton from './PostMoreButton';
import { useSession } from '@/providers/SessionProvider';

type PostProps = {
	post: PostData;
};

const Post = ({ post }: PostProps) => {
	const { user } = useSession();
	return (
		<article className='space-y-3 rounded-2xl bg-primary-foreground p-5 shadow-md border group/post'>
			<div className='flex justify-between gap-3'>
				<div className='flex flex-wrap gap-3'>
					<Link href={`/users/${post.user.username}`}>
						<UserAvatar avatarUrl={post.user.avatarUrl} />
					</Link>

					<div>
						<Link
							href={`/users/${post.user.username}`}
							className='block font-medium hover:underline'
						>
							{post.user.displayName}
						</Link>

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
			<div className='whitespace-pre-line break-words space-y-3'>{post.content}</div>
		</article>
	);
};

export default Post;
