import api from '@/services/axios';
import { FollowerInfo, UserData } from '@/types';

export const getFollowerInfo = async (userId: string) => {
	const { data } = await api.get<FollowerInfo>(`/api/users/${userId}/followers`);

	return data;
};

export const postFollowerInfo = async (userId: string) => {
	const { data } = await api.post(`/api/users/${userId}/followers`);
	return data;
};

export const deleteFollowerInfo = async (userId: string) => {
	await api.delete(`/api/users/${userId}/followers`);
};

export const getUser = async (username: string) => {
	const { data } = await api.get<UserData>(`/api/users/username/${username}`);

	return data;
};
