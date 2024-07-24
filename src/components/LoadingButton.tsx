import { cn } from '@/lib/utils';
import { Button, ButtonProps } from './ui/button';
import { Loader2 } from 'lucide-react';

interface LoadingButtonProps extends ButtonProps {
	isLoading: boolean;
}

const LoadingButton = ({
	isLoading,
	disabled,
	className,
	children,
	...props
}: LoadingButtonProps) => {
	return (
		<Button
			disabled={isLoading || disabled}
			className={cn('flex items-center gap-2', className)}
			{...props}
		>
			{isLoading && <Loader2 className='size-5 animate-spin' />}
			{children}
		</Button>
	);
};

export default LoadingButton;
