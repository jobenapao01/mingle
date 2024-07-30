import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { formatDate, formatDistanceToNowStrict } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatRelativeDate(from: Date) {
	const currentDate = new Date();

	//check if within 24 hours
	if (currentDate.getTime() - new Date(from).getTime() < 24 * 60 * 60 * 1000) {
		return formatDistanceToNowStrict(from, { addSuffix: true });
	} else {
		//check if 1year
		if (currentDate.getFullYear() === new Date(from).getFullYear()) {
			return formatDate(from, 'MMM d');
		}

		return formatDate(from, 'MMM d, yyy');
	}
}

//format for large numbers 1000 format to 1k
export function formatNumber(n: number): string {
	return Intl.NumberFormat('en-US', {
		notation: 'compact',
		maximumFractionDigits: 1,
	}).format(n);
}
