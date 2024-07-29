export const getForYouPost = async () => {
	const res = await fetch('/api/posts/for-you');

	if (!res.ok) throw new Error(`Request failed with status code: ${res.status}`);

	return res.json();
};
