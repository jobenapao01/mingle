import { validateRequest } from '@/auth';
import { postDataInclude } from '@/types';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const { user } = await validateRequest();

		if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

		const posts = await prisma?.post.findMany({
			include: postDataInclude,
			orderBy: {
				createAt: 'desc',
			},
		});

		return NextResponse.json(posts);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
