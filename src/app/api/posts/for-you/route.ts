import { validateRequest } from '@/auth';
import { postDataInclude, PostsPage } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	try {
		const cursor = req.nextUrl.searchParams.get('cursor') || undefined;
		console.log('cursor', cursor);

		const pageSize = 10;

		const { user } = await validateRequest();

		if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const posts = await prisma?.post.findMany({
			include: postDataInclude,
			orderBy: {
				createAt: 'desc',
			},
			take: pageSize + 1,
			cursor: cursor
				? {
						id: cursor,
				  }
				: undefined,
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
