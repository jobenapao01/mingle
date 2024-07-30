'use client';
import './styles.css';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

import UserAvatar from '@/components/navigation/UserAvatar';
import { useSession } from '@/providers/SessionProvider';
import { useSubmitPost } from '@/services/mutations/posts';
import LoadingButton from '@/components/LoadingButton';

const PostEditor = () => {
	const { user } = useSession();
	const { mutate: submitPost, isPending } = useSubmitPost();

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				bold: false,
				italic: false,
			}),
			Placeholder.configure({
				placeholder: "What's on your mind?",
			}),
		],
		editorProps: {
			attributes: {
				class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
			},
		},
	});

	const input = editor?.getText({ blockSeparator: '\n' }) || '';

	const onSubmit = async () => {
		submitPost(input, {
			onSuccess: () => {
				editor?.commands.clearContent();
			},
		});
	};

	return (
		<div className='flex flex-col gap-5 rounded-2xl bg-primary-foreground p-5 shadow-sm'>
			<div className='flex gap-5'>
				<UserAvatar
					avatarUrl={user?.avatarUrl}
					className='hidden sm:inline'
				/>
				<EditorContent
					editor={editor}
					className='w-full max-h-[20rem] overflow-y-auto bg-primary-foreground rounded-2xl px-5 py-3 border border-gray-400'
				/>
			</div>

			<div className='flex justify-end'>
				<LoadingButton
					onClick={onSubmit}
					isLoading={isPending}
					disabled={!input.trim()}
					className='min-w-20'
				>
					Post
				</LoadingButton>
			</div>
		</div>
	);
};
export default PostEditor;
