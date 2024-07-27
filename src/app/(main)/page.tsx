import { PostEditor, Post } from '@/components';
import prisma from '@/lib/prisma';
import { postDataInclude } from '@/types';
import TrendingSidebar from './_components/TrendingSidebar';

export default async function Home() {
	const posts = await prisma.post.findMany({
		include: postDataInclude,
		orderBy: {
			createAt: 'desc',
		},
	});
	return (
		<main className='w-full min-w-0 flex ga-5'>
			<div className='w-full min-w-0 space-y-5'>
				<PostEditor />
				{posts.map((post) => (
					<Post
						post={post}
						key={post.id}
					/>
				))}
			</div>
			<TrendingSidebar />
		</main>
	);
}
