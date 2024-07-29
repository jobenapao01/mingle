import { PostEditor, ForYouFeed } from '@/components';
import TrendingSidebar from './_components/TrendingSidebar';

export default function Home() {
	return (
		<main className='w-full min-w-0 flex ga-5'>
			<div className='w-full min-w-0 space-y-5'>
				<PostEditor />
				<ForYouFeed />
			</div>
			<TrendingSidebar />
		</main>
	);
}
