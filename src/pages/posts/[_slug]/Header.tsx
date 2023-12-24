import { getFormattedDate } from '@/utils/datetime';
import { ExtendedPostModel } from '@api/post.api';
import { FC } from 'react';

export const PostDetailHeader: FC<Pick<ExtendedPostModel, 'title' | 'createdAt' | 'author'>> = ({
  title,
  createdAt,
  author,
}) => {
  return (
    <header className="mb-4 lg:mb-6 not-format">
      <address className="flex items-center mb-6 not-italic">
        <div className="inline-flex items mr-3 text-sm font-sans text-gray-900 dark:text-white">
          <img className="mr-4 w-16 h-16 rounded-full" src={author.avatarUrl} alt={author.name} />
          <div>
            <a href="#" rel="author" className="text-xl font-bold text-gray-900 dark:text-white">
              {author.name}
            </a>
            <p className="text-base text-gray-500 dark:text-gray-400 m-0">
              Editor, Lorem Ipsum at Dolor Sit Amet
            </p>
            <p className="text-base text-gray-500 dark:text-gray-400 m-0">
              <time
                dateTime={getFormattedDate(createdAt, 'dd-MM-YYYY')}
                title={getFormattedDate(createdAt, 'MMM d, yyyy')}
              >
                {getFormattedDate(createdAt, 'MMM d, yyyy')}
              </time>
            </p>
          </div>
        </div>
      </address>
      <h1 className="font-playfair mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
        {title}
      </h1>
    </header>
  );
};
