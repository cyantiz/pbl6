import { jwtDecode } from 'jwt-decode';
import { $post } from '../utils/axios';
import { IUserModel } from './user.service';

export enum Role {
  USER = 'USER',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

export type AuthPayload = {
  id: number;
  email: string;
  name: string;
  role: Role;
  username: string;
  iat: number;
  exp: number;
};

type LoginResp = {
  accessToken: string;
  refreshToken: string;
};

type RegisterResp = {
  accessToken: string;
  refreshToken: string;
};

const apiPrefix = '/auth';

export const login = async (params: { username: string; password: string }): Promise<LoginResp> => {
  return $post<LoginResp>(`${apiPrefix}/login`, {
    ...params,
  }).then((resp) => resp.data);
};

export const register = async (
  params: Pick<IUserModel, 'name' | 'email'> & { password: string },
): Promise<RegisterResp> => {
  return $post<RegisterResp>(`${apiPrefix}/register`, {
    ...params,
  }).then((resp) => resp.data);
};

export const decodeAuthTokenPayload = (params: { token: string }) => {
  const { token } = params;
  const result = jwtDecode<AuthPayload>(token);

  return result ?? {};
};
