'use server';

import { signUpSchema, SignUpValues } from '@/lib/validation';
import { hash } from '@node-rs/argon2';
import { generateIdFromEntropySize } from 'lucia';
import prisma from '@/lib/prisma';
import { lucia } from '@/auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect';

export async function signUp(credentials: SignUpValues): Promise<{ error: string }> {
	try {
		const { email, password, username } = signUpSchema.parse(credentials);

		const hashedPassword = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1,
		});

		const userId = generateIdFromEntropySize(10);

		const usernameExists = await prisma.user.findFirst({
			where: {
				username: {
					equals: username,
					mode: 'insensitive',
				},
			},
		});

		if (usernameExists) {
			return {
				error: 'Username has already been taken',
			};
		}

		const emailExists = await prisma.user.findFirst({
			where: {
				email: {
					equals: email,
					mode: 'insensitive',
				},
			},
		});

		if (emailExists) {
			return {
				error: 'Email has already been taken',
			};
		}

		await prisma.user.create({
			data: {
				id: userId,
				username,
				displayName: username,
				email,
				hashedPassword,
			},
		});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = await lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

		return redirect('/');
	} catch (error) {
		//Redirect error
		if (isRedirectError(error)) throw error;
		console.error(error);
		return {
			error: 'Something went wrong. Please try again',
		};
	}
}
