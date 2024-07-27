import { Suspense } from 'react';

import { Loader2 } from 'lucide-react';
import WhoToFollow from './WhoToFollow';
import TrendingTopics from './TrendingTopics';

const TrendingSidebar = () => {
	return (
		<div className='sticky top-[5.25rem] hidden md:block lg:w-80 w-72 h-fit flex-none space-y-5 px-3'>
			<Suspense fallback={<Loader2 className='mx-auto animate-spin' />}>
				<WhoToFollow />
				<TrendingTopics />
			</Suspense>
		</div>
	);
};

export default TrendingSidebar;
