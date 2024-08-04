import { Prisma } from '@prisma/client';

export const getUserDataSelect = (loggedInUserId: string) => {
	return {
		id: true,
		username: true,
		avatarUrl: true,
		displayName: true,
		bio: true,
		createAt: true,
		followers: {
			where: {
				followerId: loggedInUserId,
			},
			select: {
				followerId: true,
			},
		},
		_count: {
			select: {
				followers: true,
				posts: true,
			},
		},
	} satisfies Prisma.UserSelect;
};

export type UserData = Prisma.UserGetPayload<{ select: ReturnType<typeof getUserDataSelect> }>;

export const getPostDataInclude = (loggedInUserId: string) => {
	return {
		user: {
			select: getUserDataSelect(loggedInUserId),
		},
	} satisfies Prisma.PostInclude;
};

export type PostData = Prisma.PostGetPayload<{ include: ReturnType<typeof getPostDataInclude> }>;

export type PostsPage = {
	posts: PostData[];
	nextCursor: string | null;
};

export type FollowerInfo = {
	followers: number;
	isFollowedByUser: boolean;
};
