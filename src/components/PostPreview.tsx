import { getFormattedDate } from '@/utils/datetime';
import { getMediaUrl } from '@api/media.api';
import { ExtendedPostModel, PostAuthorModel } from '@api/post.api';
import classNames from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import CategoryLabel from './CategoryLabel';

export type PostPreviewProps = ExtendedPostModel & {
  horizontal?: boolean;
  withSecondaryText?: boolean;
};

const PostPreview: FC<PostPreviewProps> = ({
  horizontal = false,
  withSecondaryText = false,
  ...post
}) => {
  return (
    <Link
      className={classNames(
        'group cursor-pointer p-3 flex rounded-md hover:shadow-2xl transition-all bg-white',
        horizontal ? 'flex-col md:h-[180px] xl:h-[240px] md:flex-row gap-4' : 'flex-col gap-2',
      )}
      to={`/posts/${post.slug}`}
    >
      <div
        className={classNames(
          'overflow-hidden rounded-md aspect-video bg-gray-100 transition-all dark:bg-gray-800',
          { 'h-full': horizontal },
        )}
      >
        <img
          alt="Thumbnail"
          loading="lazy"
          decoding="async"
          data-nimg="fill"
          className="object-cover transition-all w-full h-full inset-0 group-hover:scale-105"
          src={getMediaUrl(post?.thumbnailMedia ?? post.medias?.at(0))}
        />
      </div>
      <div className="flex flex-col flex-1">
        <CategoryLabel category={post.category} />
        <PostTitle title={post.title} />
        <PostCredit author={post.author} createdAt={post.createdAt} />
        {withSecondaryText && post.secondaryText && <SecondaryText text={post.secondaryText} />}
      </div>
    </Link>
  );
};

export type TitleProps = {
  title: string;
};

export const PostTitle: FC<TitleProps> = ({ title }) => {
  return (
    <h2 className="text-lg font-semibold leading-snug tracking-tight pt-2 dark:text-white">
      <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">
        {title}
      </span>
    </h2>
  );
};

export type PostCreditProps = {
  author: PostAuthorModel;
  createdAt: Date;
};

export const PostCredit: FC<PostCreditProps> = ({ createdAt, author }) => {
  return (
    <div className="pt-3 flex items-center space-x-3 text-gray-500 dark:text-gray-400">
      <Link to={`/author/${author.username}`}>
        <div className="flex items-center gap-3">
          <div className="relative h-5 w-5 flex-shrink-0">
            <img
              alt={author.name}
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              className="rounded-full object-cover w-full h-full inset-0"
              sizes="20px"
              src={author.avatarUrl}
            />
          </div>
          <span className="truncate text-sm">{author.name}</span>
        </div>
      </Link>
      <span className="text-xs text-gray-300 dark:text-gray-600">•</span>
      <time className="truncate text-sm" dateTime="2022-10-21T15:48:00.000Z">
        {getFormattedDate(createdAt)}
      </time>
    </div>
  );
};

export type SecondaryTextProps = {
  text: string;
};

const SecondaryText: FC<SecondaryTextProps> = ({ text }) => {
  return <div className="text-ellipsis overflow-hidden m-0 mt-4 w-full line-clamp-3">{text}</div>;
};

export default PostPreview;
