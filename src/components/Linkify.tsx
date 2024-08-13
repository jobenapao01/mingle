import Link from 'next/link';
import { LinkIt, LinkItUrl } from 'react-linkify-it';
import UserLinkWithTooltip from './users/UserLinkWithTooltip';

type LinkifyProps = {
	children: React.ReactNode;
};

const Linkify = ({ children }: LinkifyProps) => {
	return (
		<LinkifyUsername>
			<LinkifyHashtag>
				<LinkifyUrl>{children}</LinkifyUrl>
			</LinkifyHashtag>
		</LinkifyUsername>
	);
};

export default Linkify;

function LinkifyUrl({ children }: LinkifyProps) {
	return <LinkItUrl className='text-primary hover:underline'>{children}</LinkItUrl>;
}

function LinkifyUsername({ children }: LinkifyProps) {
	return (
		<LinkIt
			regex={/(@[a-zA-Z0-9_-]+)/}
			component={(match, key) => (
				<UserLinkWithTooltip
					username={match.slice(1)}
					key={key}
				>
					{match}
				</UserLinkWithTooltip>
			)}
		>
			{children}
		</LinkIt>
	);
}

function LinkifyHashtag({ children }: LinkifyProps) {
	return (
		<LinkIt
			regex={/(#[a-zA-Z0-9]+)/}
			component={(match, key) => (
				<Link
					href={`/hashtag/${match.slice(1)}`}
					className='text-primary hover:underline'
				>
					{match}
				</Link>
			)}
		>
			{children}
		</LinkIt>
	);
}
