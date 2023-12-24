import { PostStatus } from '@/api/post.api';

export const PostStatusColorMap: Record<PostStatus, string> = {
  [PostStatus.DRAFT]: '#222F3D',
  [PostStatus.PUBLISHED]: '#3FB27F',
  [PostStatus.DENIED]: '#E84B3C',
  [PostStatus.DELETED]: '#E84B3C',
};
