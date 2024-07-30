'use client';

import { PostData } from '@/types';
import { useState } from 'react';
import DeletePostModal from '../modals/DeletePostModal';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { MoreHorizontal, Trash2 } from 'lucide-react';

type PostMoreButtonProps = {
	post: PostData;
	className?: string;
};

const PostMoreButton = ({ post, className }: PostMoreButtonProps) => {
	const [showDeleteDialog, setShowDeleteDialog] = useState(false);
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger
					asChild
					className={className}
				>
					<Button
						size='icon'
						variant='ghost'
					>
						<MoreHorizontal className='size-4 text-muted-foreground' />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem
						className='cursor-pointer'
						onClick={() => setShowDeleteDialog(true)}
					>
						<span className='text-rose-500 flex items-center gap-3'>
							<Trash2 className='size-4' /> Delete
						</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DeletePostModal
				isOpen={showDeleteDialog}
				onClose={() => setShowDeleteDialog(!showDeleteDialog)}
				post={post}
			/>
		</>
	);
};

export default PostMoreButton;
