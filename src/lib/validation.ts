import { z } from 'zod';

const requiredString = z.string().trim().min(1, { message: 'Required' });

export const signUpSchema = z.object({
	email: requiredString.email({ message: 'Invalid email' }),
	username: requiredString.regex(/^[a-zA-Z0-9_-]+$/, {
		message: 'Only letters,numbers, -, and _ are allowed',
	}),
	password: requiredString.min(8, { message: 'Must be atleast 8 characters' }),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
	username: requiredString,
	password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;
