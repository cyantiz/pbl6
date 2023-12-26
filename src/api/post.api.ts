import { $post } from '@/utils/axios';
import { $get } from '../utils/axios';
import { ICategoryModel } from './category.api';
import { IMediaModel } from './media.api';
import { PaginationResponse } from './pagination';

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
  medias: IMediaModel[];
};

type CommentAuthorModel = PostAuthorModel;

export interface ICommentModel {
  id: number;
  text: string;
  postId?: number;
  parentCommentId?: number;
  upvote: number;
  downvote?: number;
  createdAt: Date;
  parentComment?: ICommentModel;
  childComments?: ICommentModel[];
  author: CommentAuthorModel;
}

export type GetPublishedPostsQuery = {
  pageSize?: number;
  page?: number;
  sort?: string;
  category?: string | string[];
};

export type CreatePostDto = {
  title: string;
  body: string;
  categoryId: number;
  thumbnailFile: File;
  status: PostStatus;
};

const MODEL_PREFIX = 'post';

export const getPublishedPosts = async (
  query: GetPublishedPostsQuery,
): Promise<PaginationResponse<ExtendedPostModel>> => {
  return $get(`${MODEL_PREFIX}/published`, {
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
  formData.append('status', data.status);

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

export const getMyPosts = async (): Promise<PaginationResponse<ExtendedPostModel>> => {
  return $get(`${MODEL_PREFIX}/mine`).then((resp) => resp.data);
};

export const searchPosts = async (text: string): Promise<ExtendedPostModel[]> => {
  return $get(`${MODEL_PREFIX}/search`, {
    params: {
      searchText: text,
    },
  }).then((resp) => resp.data);
};

export const upvotePost = async (id: number): Promise<void> => {
  return $post(`${MODEL_PREFIX}/${id}/upvote`).then((resp) => resp.data);
};

export const downvotePost = async (id: number): Promise<void> => {
  return $post(`${MODEL_PREFIX}/${id}/downvote`).then((resp) => resp.data);
};

export const getPostComments = async (params: {
  postId: number;
  page: number;
  pageSize: number;
}): Promise<PaginationResponse<ICommentModel>> => {
  const { postId, page, pageSize } = params;
  return $get(`${MODEL_PREFIX}/${postId}/comments`, {
    params: {
      page,
      pageSize,
    },
  }).then((resp) => resp.data);
};

export const commentToPost = async (params: { postId: number; text: string }): Promise<void> => {
  const { postId, text } = params;
  return $post(`${MODEL_PREFIX}/${postId}/comments`, {
    comment: text,
  }).then((resp) => resp.data);
};
