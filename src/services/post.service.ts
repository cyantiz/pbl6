import { $get } from '../utils/axios';

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
  userId: number;
  status: PostStatus;
  createdAt: Date;
  deletedAt: Date;
  upvote: number;
  downvote: number;
  categoryId: number;
  categoryName: number;
  authorUsername: string;
  authorName: string;
}

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
