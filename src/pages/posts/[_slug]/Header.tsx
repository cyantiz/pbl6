import { useAuthStore } from '@/store';
import { getFormattedDate } from '@/utils/datetime';
import { ExtendedPostModel, downvotePost, upvotePost } from '@api/post.api';
import { Icon } from '@iconify/react';
import { Button } from 'antd';
import { FC, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { shallow } from 'zustand/shallow';

export const PostDetailHeader: FC<
  Pick<
    ExtendedPostModel,
    'id' | 'title' | 'createdAt' | 'author' | 'upvote' | 'downvote' | 'visitCount'
  >
> = ({ id, title, createdAt, author, upvote, downvote, visitCount }) => {
  const [_upvote, set_Upvote] = useState(upvote);
  const [_downvote, set_Downvote] = useState(downvote);

  const { upvotedPostIds, downvotedPostIds, authUser, toggleUpvote, toggleDownvote } = useAuthStore(
    (store) => ({
      upvotedPostIds: store.upvotedPostIds,
      downvotedPostIds: store.downvotedPostIds,
      authUser: store.authUser,
      toggleUpvote: store.toggleUpvote,
      toggleDownvote: store.toggleDownvote,
    }),
    shallow,
  );

  const upvoted = useMemo(() => {
    return upvotedPostIds.includes(id);
  }, [upvotedPostIds]);

  const downvoted = useMemo(() => {
    return downvotedPostIds.includes(id);
  }, [downvotedPostIds]);

  const handleUpvote = async () => {
    if (!authUser?.id) Swal.fire('Please login to vote');

    try {
      await upvotePost(id);

      if (downvoted) {
        toggleDownvote(id);
        set_Downvote((_downvote) => _downvote - 1);
      }
      set_Upvote((_upvote) => _upvote + (upvoted ? -1 : 1));

      toggleUpvote(id);
    } catch (error) {
      Swal.fire('Error', 'Cannot upvote this post, please try again later', 'error');
    }
  };

  const handleDownvote = () => {
    if (!authUser?.id) Swal.fire('Please login to vote');

    try {
      downvotePost(id);

      if (upvoted) {
        toggleUpvote(id);
        set_Upvote((_upvote) => _upvote - 1);
      }
      set_Downvote((_downvote) => _downvote + (downvoted ? -1 : 1));
      toggleDownvote(id);
    } catch (error) {
      Swal.fire('Error', 'Cannot downvote this post, please try again later', 'error');
    }
  };

  return (
    <header className="mb-4 lg:mb-6 not-format">
      <h1 className="font-playfair mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
        {title}
      </h1>
      <div className="flex flex-col lg:flex-row  justify-between lg:items-center max-lg:gap-3">
        <address className="flex items-center not-italic">
          <div className="inline-flex items items-center gap-2 text-sm font-sans text-gray-900 dark:text-white">
            <img className="mr-1 w-8 h-8 rounded-full" src={author.avatarUrl} alt={author.name} />
            <div>
              <a href="#" rel="author" className="text-sm font-bold dark:text-white text-blue-700">
                {author.name}
              </a>
            </div>
          </div>
        </address>

        <div className="flex gap-4 items-center max-lg:justify-between">
          <p className="text-sm text-gray-500  dark:text-gray-400 m-0">
            Written on{' '}
            <time
              dateTime={getFormattedDate(createdAt, 'dd-MM-YYYY')}
              title={getFormattedDate(createdAt, 'MMM d, yyyy')}
            >
              {getFormattedDate(createdAt, 'MMM d, yyyy')}
            </time>
          </p>

          <Button type="link" className="max-lg:!hidden">
            <span className="!flex gap-2 text-sm items-center font-medium uppercase">
              <Icon icon="ph:link-bold" className="text-base" />
              <span>Copy Link</span>
            </span>
          </Button>

          <div className="flex gap-3">
            <Views count={visitCount} />
            <Upvote onClick={handleUpvote} upvoted={upvoted} count={_upvote} />
            <Downvote onClick={handleDownvote} downvoted={downvoted} count={_downvote} />
          </div>
        </div>
      </div>
    </header>
  );
};

const Views = ({ count }: { count: number }) => {
  return (
    <div className="upvote flex items-center gap-1 group cursor-pointer">
      <Icon icon="ph:eye-duotone" className="text-base" />
      {count}
    </div>
  );
};

const Upvote = ({
  onClick,
  upvoted,
  count,
}: {
  onClick: () => void;
  upvoted: boolean;
  count: number;
}) => {
  return (
    <div
      className="upvote flex items-center hover:text-green-500 gap-1 group cursor-pointer"
      onClick={onClick}
      style={
        upvoted
          ? {
              color: 'rgb(14 159 110)',
            }
          : {}
      }
    >
      <Icon icon="ph:arrow-fat-up-duotone" className="text-base" />
      {count}
    </div>
  );
};

const Downvote = ({
  onClick,
  downvoted,
  count,
}: {
  onClick: () => void;
  downvoted: boolean;
  count: number;
}) => {
  return (
    <div
      className="downvote flex items-center gap-1  hover:text-red-500 group cursor-pointer"
      onClick={onClick}
      style={
        downvoted
          ? {
              color: 'rgb(240 82 82)',
            }
          : {}
      }
    >
      <Icon icon="ph:arrow-fat-down-duotone" className="text-base" />
      {count}
    </div>
  );
};
