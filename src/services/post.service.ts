import { $post } from '@/utils/axios';
import { $get } from '../utils/axios';
import { ICategoryModel } from './category.service';
import { IMediaModel } from './media.service';
import { PaginationResponse } from './pagination.service';

export enum PostStatus {
  DRAFT = 'DRAFT',
  DELETED = 'DELETED',
  DENIED = 'DENIED',
  PUBLISHED = 'PUBLISHED',
}

export interface IPostModel {
  id: number;
  title: string;
  slug: string;
  body: string;
  secondaryText?: string;
  userId: number;
  status: PostStatus;
  createdAt: Date;
  publishedAt: Date;
  deletedAt: Date;
  upvote: number;
  downvote: number;
  categoryId: number;
  thumbnailMediaId: number;
}

export type PostAuthorModel = {
  id: number;
  username: string;
  name: string;
  avatarUrl: string;
};

export type ExtendedPostModel = IPostModel & {
  category: ICategoryModel;
  author: PostAuthorModel;
  visitCount: number;
  thumbnailMedia: IMediaModel;
};

export type GetPostsQuery = {
  pageSize?: number;
  page?: number;
  sort?: string;
  status: PostStatus | PostStatus[];
  category?: string | string[];
};

export type CreatePostDto = {
  title: string;
  body: string;
  categoryId: number;
  thumbnailFile: File;
};

const MODEL_PREFIX = 'post';

export const getPosts = async (
  query: GetPostsQuery,
): Promise<PaginationResponse<ExtendedPostModel>> => {
  return $get(`${MODEL_PREFIX}`, {
    params: {
      ...query,
    },
  }).then((resp) => resp.data);
};

export const getPopularPosts = async (params: { limit: number }): Promise<ExtendedPostModel[]> => {
  return $get(`${MODEL_PREFIX}/popular`, {
    params,
  }).then((resp) => resp.data);
};

export const getFrontPagePost = async (): Promise<ExtendedPostModel> => {
  return $get(`${MODEL_PREFIX}/front-page`).then((resp) => resp.data);
};

export const createPost = async (data: CreatePostDto): Promise<IPostModel> => {
  const formData = new FormData();
  formData.append('filename', data.thumbnailFile);
  formData.append('title', data.title);
  formData.append('body', data.body);
  formData.append('categoryId', data.categoryId.toString());

  return $post(`${MODEL_PREFIX}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((resp) => resp.data);
};

export const getPostById = async (id: number): Promise<ExtendedPostModel> => {
  return $get(`${MODEL_PREFIX}/${id}`).then((resp) => resp.data);
};

export const getPostBySlug = async (slug: string): Promise<ExtendedPostModel> => {
  return $get(`${MODEL_PREFIX}/slug/${slug}`).then((resp) => resp.data);
};
