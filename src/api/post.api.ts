import { $delete, $post, $put } from '@/utils/axios';
import { getUserId } from '@/utils/common';
import { $get } from '../utils/axios';
import { ICategoryModel } from './category.api';
import { IMediaModel } from './media.api';
import { PaginationResponse } from './pagination';
import { getGeoLocation } from './user.api';

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
  secondaryText?: string;
};

export type UpdatePostDto = {
  id: number;
  title?: string;
  body?: string;
  categoryId?: number;
  thumbnailFile?: File;
  thumbnailFileUrl?: string;
  status?: PostStatus;
  secondaryText?: string;
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

export const createPost = async (params: CreatePostDto): Promise<IPostModel> => {
  const formData = new FormData();
  formData.append('filename', params.thumbnailFile);
  formData.append('title', params.title);
  formData.append('body', params.body);
  formData.append('categoryId', params.categoryId.toString());
  formData.append('status', params.status);
  params.secondaryText && formData.append('status', params.secondaryText);

  try {
    const { data } = await $post(`${MODEL_PREFIX}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    console.log('error in axios create post');
    throw error;
  }
};

export const editPost = async (data: UpdatePostDto): Promise<IPostModel> => {
  const formData = new FormData();
  if (!data.thumbnailFileUrl && data.thumbnailFile) {
    formData.append('filename', data.thumbnailFile);
  }
  data.title && formData.append('title', data.title);
  data.body && formData.append('body', data.body);
  data.categoryId && formData.append('categoryId', data.categoryId.toString());
  data.status && formData.append('status', data.status);
  data.secondaryText && formData.append('secondaryText', data.secondaryText);

  return $put(`${MODEL_PREFIX}/${data.id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }).then((resp) => resp.data);
};

export const deletePost = async (id: number): Promise<void> => {
  return $delete(`${MODEL_PREFIX}/${id}`).then((resp) => resp.data);
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

export const searchPostsByText = async (text: string): Promise<ExtendedPostModel[]> => {
  return $get(`${MODEL_PREFIX}/search-text`, {
    params: {
      searchText: text,
    },
  }).then((resp) => resp.data);
};

export const searchPostsByImage = async (image: File): Promise<ExtendedPostModel[]> => {
  const formData = new FormData();

  formData.append('filename', image);

  return $post(`${MODEL_PREFIX}/search-image`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
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

export const readPost = async (params: {
  postId: number;
  IP?: string;
  userId?: number;
  percentage?: number;
}): Promise<void> => {
  const { postId, IP, userId, percentage } = params;
  return $post(`${MODEL_PREFIX}/${postId}/read`, {
    userId,
    IP,
    percentage,
  }).then((resp) => resp.data);
};

export const getRecentReads = async (params: {
  limit: number;
}): Promise<PaginationResponse<ExtendedPostModel>> => {
  const { limit } = params;

  const userId = getUserId();
  const { IPv4 } = await getGeoLocation();

  return $get(`${MODEL_PREFIX}/read`, {
    params: {
      page: 1,
      pageSize: limit,
      userId,
      IP: IPv4,
    },
  }).then((resp) => resp.data);
};
