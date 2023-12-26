import { ICommentModel } from '@/api/post.api';
import { getFormattedDate } from '@/utils/datetime';
import { ArrowDownOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC } from 'react';

export type CommentListProps = {
  comments: ICommentModel[];
  reachEnd?: boolean;
  fetchMoreBtnClick?: () => void;
  fetchMoreLoading?: boolean;
};

const CommentList: FC<CommentListProps> = ({
  comments,
  reachEnd,
  fetchMoreBtnClick,
  fetchMoreLoading,
}) => {
  return (
    <div className="flex flex-col gap-2 items-center">
      {comments.map((comment) => (
        <Comment key={comment.id} {...comment} />
      ))}

      {!reachEnd && (
        <Button
          type="primary"
          loading={fetchMoreLoading}
          onClick={() => {
            fetchMoreBtnClick && fetchMoreBtnClick();
          }}
        >
          <ArrowDownOutlined />
          Load more comments
        </Button>
      )}
    </div>
  );
};

export default CommentList;

export type CommentProps = ICommentModel;

const Comment: FC<CommentProps> = ({ author, createdAt, text }) => {
  return (
    <article className="w-full p-6 text-base border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center w-full">
          <div className="inline-flex items-center m-0 mr-3 text-sm text-gray-900 dark:text-white font-semibold">
            <img src={author.avatarUrl} className="mr-2 w-6 h-6 rounded-full" />
            <div className="flex gap-3">
              {author.name}
              <span className="text-gray-400"> @{author.username}</span>
            </div>
          </div>
          <p className="m-0 ml-auto text-sm text-gray-600 dark:text-gray-400">
            {getFormattedDate(createdAt)}
          </p>
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400 m-0">{text}</p>
    </article>
  );
};
