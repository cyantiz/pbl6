import { getPostComments } from '@/api/post.api';
import { Divider } from 'antd';
import { FC, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

export type PostCommentSectionProps = {
  postId: number;
};

const PostCommentSection: FC<PostCommentSectionProps> = ({ postId }) => {
  const {
    data: commentPages,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isLoadingComments,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['paginated-comments-by-post', postId],
    queryFn: ({ pageParam = 1 }) =>
      getPostComments({
        postId,
        page: pageParam,
        pageSize: 4,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.nextPage) return lastPage.nextPage;
      return undefined;
    },
  });

  const reachedEnd = useMemo(
    () => !commentPages?.pages?.[commentPages.pages.length - 1]?.nextPage,
    [commentPages],
  );

  return (
    <div className="__comment-section__ w-full flex flex-col pt-8 pb-16">
      <div
        className="comment-section__title
        font-playfair font-bold text-2xl text-gray-800 dark:text-gray-100 mb-8"
      >
        Bình luận
      </div>
      <CommentInput postId={postId} afterComment={() => refetch()} />
      <Divider />

      <CommentList
        comments={commentPages?.pages.flatMap((page) => page.values) || []}
        reachEnd={reachedEnd}
        fetchMoreBtnClick={() => fetchNextPage()}
        fetchMoreLoading={isFetchingNextPage || isLoadingComments}
      />
    </div>
  );
};

export default PostCommentSection;
