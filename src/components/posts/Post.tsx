import { PostData } from '@/types';
import Link from 'next/link';
import UserAvatar from '../navigation/UserAvatar';
import { formatRelativeDate } from '@/lib/utils';

type PostProps = {
	post: PostData;
};

const Post = ({ post }: PostProps) => {
	return (
		<article className='space-y-3 rounded-2xl bg-primary-foreground p-5 shadow-md border'>
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

			<div className='whitespace-pre-line break-words space-y-3'>{post.content}</div>
		</article>
	);
};

export default Post;
