'use client';

import { useRouter } from 'next/navigation';
import { Input } from '../ui/input';
import { SearchIcon } from 'lucide-react';

type Props = {};

const SearchField = ({}: Props) => {
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget;
		const search = (form.search as HTMLInputElement).value.trim();

		if (!search) return;

		router.push(`/search?q=${encodeURIComponent(search)}`);
	};

	return (
		<form
			onSubmit={handleSubmit}
			method='GET'
			action='/search'
		>
			<div className='relative'>
				<Input
					name='search'
					placeholder='Search'
					className='pe-10'
				/>
				<SearchIcon className='absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground' />
			</div>
		</form>
	);
};

export default SearchField;
