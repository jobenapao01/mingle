import { unstable_cache } from 'next/cache';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { formatNumber } from '@/lib/utils';

//cache on production
const getTrendingTopics = unstable_cache(
	async () => {
		const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
		SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag,
		COUNT(*) AS count
		FROM posts
		GROUP BY (hashtag)
		ORDER BY count DESC, hashtag ASC
		LIMIT 5
	`;

		return result.map((row) => ({
			hashtag: row.hashtag,
			count: Number(row.count),
		}));
	},
	['trending_topics'],
	{
		revalidate: 3 * 60 * 60,
	}
);

const TrendingTopics = async () => {
	const trendingTopics = await getTrendingTopics();

	return (
		<div className='space-y-5 rounded-2xl bg-primary-foreground p-5 shadow-md border dark:border-none'>
			<div className='text-xl font-bold'>Trending Topics</div>
			{trendingTopics.map(({ hashtag, count }) => {
				const title = hashtag.split('#')[1];

				return (
					<Link
						key={title}
						href={`/hashtag/${title}`}
						className='block'
					>
						<p
							className='line-clamp-1 font-semibold break-all hover:underline'
							title={hashtag}
						>
							{hashtag}
						</p>

						<p className='text-sm text-muted-foreground'>
							{formatNumber(count)} {count === 1 ? 'post' : 'posts'}
						</p>
					</Link>
				);
			})}
		</div>
	);
};

export default TrendingTopics;
