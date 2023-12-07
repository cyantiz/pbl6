import { getMediaUrl } from '@/services/media.service';
import { ExtendedPostModel, PostAuthorModel } from '@/services/post.service';
import { getFormattedDate } from '@/utils/datetime';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import CategoryLabel from './CategoryLabel';

export type PostPreviewProps = ExtendedPostModel;

const PostPreview: FC<PostPreviewProps> = ({ ...post }) => {
  return (
    <div className="group cursor-pointer">
      <div className="overflow-hidden rounded-md bg-gray-100 transition-all dark:bg-gray-800">
        <Link to={`/posts/${post.slug}`}>
          <img
            alt="Thumbnail"
            loading="lazy"
            decoding="async"
            data-nimg="fill"
            className="object-cover transition-all w-full h-full inset-0 hover:scale-105"
            sizes="(max-width: 768px) 30vw, 33vw"
            src={getMediaUrl(post.thumbnailMedia)}
          />
        </Link>
      </div>
      <div className="">
        <div>
          <CategoryLabel category={post.category} />
          <PostTitle title={post.title} />
          <PostCredit author={post.author} createdAt={post.createdAt} />
        </div>
      </div>
    </div>
  );
};

export type TitleProps = {
  title: string;
};

export const PostTitle: FC<TitleProps> = ({ title }) => {
  return (
    <h2 className="text-lg font-semibold leading-snug tracking-tight pt-2 dark:text-white">
      <a href="/post/architectural-engineering-wonders-of-the-modern-era-for-your-inspiration">
        <span className="bg-gradient-to-r from-green-200 to-green-100 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px] dark:from-purple-800 dark:to-purple-900">
          {title}
        </span>
      </a>
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
export default PostPreview;
