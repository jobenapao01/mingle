'use server';
import { lucia } from '@/auth';
import prisma from '@/lib/prisma';

import { loginSchema, LoginValues } from '@/lib/validation';
import { verify } from '@node-rs/argon2';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect';

export async function login(credentials: LoginValues): Promise<{ error: string }> {
	try {
		const { username, password } = loginSchema.parse(credentials);

		const userExists = await prisma.user.findFirst({
			where: {
				username: {
					equals: username,
					mode: 'insensitive',
				},
			},
		});

		if (!userExists || !userExists.hashedPassword) {
			return {
				error: 'Invalid Credentials',
			};
		}

		const validPassword = await verify(userExists.hashedPassword, password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});

		if (!validPassword) {
			return {
				error: 'Invalid Credentials',
			};
		}

		const session = await lucia.createSession(userExists.id, {});
		const sessionCookie = await lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

		return redirect('/');
	} catch (error) {
		if (isRedirectError(error)) throw error;
		console.log(error);
		return {
			error: 'Something went wrong',
		};
	}
}
