import Link from 'next/link';
import { SearchField, UserButton } from '@/components';

const Navbar = () => {
	return (
		<header className='sticky top-0 z-10 bg-primary-foreground shadow-md'>
			<div className='max-w-7xl mx-auto flex items-center justify-center flex-wrap gap-5 px-5 py-3'>
				<Link
					href='/'
					className='text-2xl font-bold text-primary'
				>
					mingle
				</Link>
				<SearchField />
				<UserButton className='sm:ms-auto' />
			</div>
		</header>
	);
};

export default Navbar;
