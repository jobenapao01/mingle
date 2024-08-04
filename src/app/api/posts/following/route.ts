import { validateRequest } from '@/auth';
import { getPostDataInclude, PostsPage } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const cursor = req.nextUrl.searchParams.get('cursor') || undefined;
		const pageSize = 10;

		const { user } = await validateRequest();

		if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const posts = await prisma?.post.findMany({
			where: {
				user: {
					followers: {
						some: {
							followerId: user.id,
						},
					},
				},
			},
			orderBy: {
				createAt: 'desc',
			},
			take: pageSize + 1,
			cursor: cursor ? { id: cursor } : undefined,
			include: getPostDataInclude(user.id),
		});

		if (posts === undefined) return;

		const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

		const data: PostsPage = {
			posts: posts?.slice(0, pageSize),
			nextCursor,
		};

		return NextResponse.json(data);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
