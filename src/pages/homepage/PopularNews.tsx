import Divider from '@/components/Divider';
import { getMediaUrl } from '@/services/media.service';
import { ExtendedPostModel, getPopularPost } from '@/services/post.service';
import { FULL_DATETIME_FORMAT, getFormattedDate } from '@/utils/datetime';
import { Icon } from '@iconify/react';
import { FC, Fragment, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const PopularNews: FC = () => {
  const { isLoading, data: popularPosts } = useQuery<ExtendedPostModel[]>(
    'popular-posts',
    () => getPopularPost({ limit: 5 }),
    {
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-center text-xl font-bold text-gray-400 md:text-right uppercase">
        Popular news
      </h1>
      <br />

      <div className="flex flex-col gap-2 lg:gap-1">
        {popularPosts?.map((post, index, arr) => (
          <Fragment key={post.id}>
            <PopularNew
              title={post.title}
              secondaryText={post.secondaryText}
              postId={post.id}
              thumbnailUrl={getMediaUrl(post.thumbnailMedia)}
              views={post.visitCount}
              createdAt={post.createdAt}
            />
            {index !== arr.length - 1 && <Divider width="half" />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

type PopularNewProps = {
  postId: number;
  title: string;
  secondaryText?: string;
  views: number;
  thumbnailUrl?: string;
  createdAt: Date | number | string;
};

const PopularNew: FC<PopularNewProps> = ({
  title,
  postId,
  secondaryText,
  views,
  createdAt,
  thumbnailUrl,
}) => {
  const createdAtString = useMemo(
    () => getFormattedDate(createdAt, FULL_DATETIME_FORMAT),
    [createdAt],
  );

  return (
    <Link
      to={`/posts/${postId}`}
      className="popular-news flex py-2 px-4 justify-between group cursor-pointer transition-all hover:h-48 h-24 bg-green-100 hover:text-white hover:bg-green-900 relative rounded-md overflow-hidden"
    >
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          className="object-cover absolute bottom-0 w-full h-full left-0 opacity-20 group-hover:opacity-50 z-1"
        ></img>
      )}
      <div className="flex flex-col gap-1 flex-1 justify-between w-full relative z-2">
        <h1 className="md:text-lg lg:text-xl font-bold">{title}</h1>
        <div className="hidden group-hover:line-clamp-3">{secondaryText}</div>
        <div className="flex flex-col text-sm font-medium lg:flex-row">
          <span className="flex gap-2 items-center w-24">
            <Icon icon="ph:eye-bold" />
            {views}
          </span>
          <span>{createdAtString}</span>
        </div>
      </div>
      <div className="flex items-start">
        <Icon icon="ph:arrow-right-bold" className="group-hover:translate-x-2 transition-all" />
      </div>
    </Link>
  );
};

export default PopularNews;
