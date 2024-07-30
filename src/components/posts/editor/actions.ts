'use server';

import { validateRequest } from '@/auth';
import { createPostScheme } from '@/lib/validation';
import prisma from '@/lib/prisma';
import { postDataInclude } from '@/types';

export async function submitPost(input: string) {
	const { user } = await validateRequest();

	if (!user) throw new Error('Unauthorized');

	const { content } = createPostScheme.parse({ content: input });

	const newPost = await prisma.post.create({
		data: {
			content,
			userId: user.id,
		},
		include: postDataInclude,
	});

	return newPost;
}
