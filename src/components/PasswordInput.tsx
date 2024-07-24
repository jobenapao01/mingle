'use client';
import React, { useState } from 'react';
import { Input, InputProps } from './ui/input';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const [showPassword, setShowPassword] = useState(false);
		return (
			<div className='relative'>
				<Input
					type={showPassword ? 'text' : 'password'}
					className={cn('pe-10', className)}
					ref={ref}
					{...props}
				/>
				<button
					type='button'
					onClick={() => setShowPassword(!showPassword)}
					className='absolute right-3 top-1/2 -translate-y-1/2 transform text-muted-foreground'
					title={showPassword ? 'Hide Password' : 'Show Password'}
				>
					{showPassword ? <EyeOff /> : <Eye />}
				</button>
			</div>
		);
	}
);

PasswordInput.displayName = 'PasswordInput';
export default PasswordInput;
