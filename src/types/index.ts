import { Prisma } from '@prisma/client';

export const postDataInclude = {
	user: {
		select: {
			username: true,
			avatarUrl: true,
			displayName: true,
		},
	},
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{ include: typeof postDataInclude }>;
