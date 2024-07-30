'use client';

import { useDeletePost } from '@/services/mutations/posts';
import { PostData } from '@/types';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog';
import { Trash2 } from 'lucide-react';
import LoadingButton from '../LoadingButton';
import { Button } from '../ui/button';

type DeletePostModalProps = {
	post: PostData;
	isOpen: boolean;
	onClose: () => void;
};

const DeletePostModal = ({ isOpen, onClose, post }: DeletePostModalProps) => {
	const { mutate: deletePost, isPending } = useDeletePost();
	const handleOpenChange = (isOpen: boolean) => {
		if (!isOpen || !isPending) {
			onClose();
		}
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={handleOpenChange}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete Post?</DialogTitle>
				</DialogHeader>

				<DialogDescription>
					Are you sure you want to delete this post? This action cannot be undone.
				</DialogDescription>

				<DialogFooter>
					<LoadingButton
						variant='destructive'
						isLoading={isPending}
						onClick={() => deletePost(post.id, { onSuccess: onClose })}
					>
						Delete
					</LoadingButton>
					<Button
						variant='ghost'
						onClick={onClose}
						disabled={isPending}
					>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeletePostModal;
