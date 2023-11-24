import { $get } from '../utils/axios';
import { ICategoryModel } from './category.service';
import { IMediaModel } from './media.service';

export enum PostStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  DELETED = 'DELETED',
  DENIED = 'DENIED',
  PUBLISHED = 'PUBLISHED',
}

export interface IPostModel {
  id: number;
  title: string;
  body: string;
  secondaryText?: string;
  userId: number;
  status: PostStatus;
  createdAt: Date;
  deletedAt: Date;
  upvote: number;
  downvote: number;
  categoryId: number;
  categoryName: number;
}

export type PostAuthor = {
  id: number;
  username: string;
  name: string;
};

export type ExtendedPostModel = IPostModel & {
  category: ICategoryModel;
  author: PostAuthor;
  visitCount: number;
  thumbnailMedia: IMediaModel;
};

export type GetPostsQuery = {
  limit?: number;
  page?: number;
  sort?: string;
  status: PostStatus | PostStatus[];
  category?: string | string[];
};

const MODEL_PREFIX = '/post';

export const getPosts = async (query: GetPostsQuery): Promise<IPostModel[]> => {
  return $get(`${MODEL_PREFIX}`, {
    params: {
      ...query,
    },
  }).then((resp) => resp.data);
};

export const getPopularPost = async (params: { limit: number }): Promise<ExtendedPostModel[]> => {
  return $get(`${MODEL_PREFIX}/popular`, {
    params,
  }).then((resp) => resp.data);
};

export const getFrontPagePost = async (): Promise<ExtendedPostModel> => {
  return $get(`${MODEL_PREFIX}/front-page`).then((resp) => resp.data);
};
