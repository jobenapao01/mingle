'use client';
import { cn } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';

interface InfiniteScrollingContainerProps extends React.PropsWithChildren {
	onBottomReached: () => void;
	className?: string;
}

const InfiniteScrollingContainer = ({
	onBottomReached,
	children,
	className,
}: InfiniteScrollingContainerProps) => {
	const { ref } = useInView({
		rootMargin: '200px',
		onChange(inView) {
			if (inView) {
				onBottomReached();
			}
		},
	});

	return (
		<div className={cn(className)}>
			{children}
			<div ref={ref} />
		</div>
	);
};

export default InfiniteScrollingContainer;
