import { PostEditor, ForYouFeed } from '@/components';
import TrendingSidebar from './_components/TrendingSidebar';
import FollowingFeed from '@/components/posts/feed/FollowingFeed';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
	return (
		<main className='w-full min-w-0 flex ga-5'>
			<div className='w-full min-w-0 space-y-5'>
				<PostEditor />
				<Tabs
					defaultValue='for-you'
					className='space-y-6'
				>
					<TabsList>
						<TabsTrigger value='for-you'>For Your</TabsTrigger>
						<TabsTrigger value='following'>Following</TabsTrigger>
					</TabsList>
					<TabsContent value='for-you'>
						<ForYouFeed />
					</TabsContent>
					<TabsContent value='following'>
						<FollowingFeed />
					</TabsContent>
				</Tabs>
			</div>
			<TrendingSidebar />
		</main>
	);
}
