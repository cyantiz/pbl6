import { $get, $post } from '@/utils/axios';
import axios from 'axios';
import { Role } from './auth.api';
import { PaginationResponse } from './pagination';

export interface IUserModel {
  id: number;
  username: string;
  avatarUrl: string;
  bannedAt: Date;
  verifiedAt: Date;
  createdAt: Date;
  role: Role;
  name: string;
  email: string;
  isVerified: boolean;
}

export type GetMyVotedPostIdsRespDto = {
  upvotedPostIds: number[];
  downvotedPostIds: number[];
};

export type ILimitedUserModel = Pick<IUserModel, 'id' | 'username' | 'avatarUrl' | 'name'>;

export async function getTopContributors(params?: {
  limit?: number;
}): Promise<ILimitedUserModel[]> {
  const { limit = 5 } = params || {};
  return $get('/users/top-contributors', { params: { limit } }).then((res) => res.data);
}

export const getMyVotedPostIds = async (): Promise<GetMyVotedPostIdsRespDto> => {
  return $get(`/users/my-voted`).then((resp) => resp.data);
};

export const adminGetAllUsers = async (params?: {
  page?: number;
  pageSize?: number;
  partialName?: string;
}): Promise<PaginationResponse<IUserModel>> => {
  const { page = 1, pageSize = 10, partialName } = params || {};
  return $get(`/users/account-mgt/users`, {
    params: { page, pageSize, partialName },
  }).then((resp) => resp.data);
};

export const adminGetAllEditors = async (params?: {
  page?: number;
  pageSize?: number;
  partialName?: string;
}): Promise<PaginationResponse<IUserModel>> => {
  const { page = 1, pageSize = 10, partialName } = params || {};
  return $get(`/users/account-mgt/editors`, {
    params: { page, pageSize, partialName },
  }).then((resp) => resp.data);
};

export const banUser = async (username: string): Promise<void> => {
  return $post(`/users/account-mgt/ban`, {
    username,
  }).then((resp) => resp.data);
};

export const unbanUser = async (username: string): Promise<void> => {
  return $post(`/users/account-mgt/unban`, {
    username,
  }).then((resp) => resp.data);
};

export const promoteEditor = async (username: string): Promise<void> => {
  return $post(`/users/account-mgt/promote-editor`, {
    username,
  }).then((resp) => resp.data);
};

export const removeEditorRights = async (username: string): Promise<void> => {
  return $post(`/users/account-mgt/remove-editor-rights`, {
    username,
  }).then((resp) => resp.data);
};

export const getGeoLocation = async (): Promise<{
  country_code: string;
  country_name: string;
  city: string | null;
  postal: number | null;
  latitude: number;
  longitude: number;
  IPv4: string | null;
  state: string | null;
}> => {
  return axios.get(`https://geolocation-db.com/json/`).then((resp) => resp.data);
};
