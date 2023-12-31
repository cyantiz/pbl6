import Divider from '@/components/Divider';
import { FULL_DATETIME_FORMAT, getFormattedDate } from '@/utils/datetime';
import { FireTwoTone } from '@ant-design/icons';
import { getMediaUrl } from '@api/media.api';
import { ExtendedPostModel, getPopularPosts } from '@api/post.api';
import { Icon } from '@iconify/react';
import { FC, Fragment, useMemo } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

const HomePageHotNews: FC = () => {
  const { isLoading, data: popularPosts } = useQuery<ExtendedPostModel[]>(
    'popular-posts',
    () => getPopularPosts({ limit: 20 }),
    {
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-center text-xl font-bold text-orange-500 md:text-right uppercase">
        <FireTwoTone twoToneColor="#FF8A4C" /> HOT NOW
      </h1>

      <div
        style={{
          // height: 'calc(100vh - 152px)',
          overflowY: 'auto',
        }}
        className="max-md:!h-auto"
      >
        <div className="flex flex-col gap-2 lg:gap-1">
          {popularPosts?.map((post, index, arr) => (
            <Fragment key={post.id}>
              <PopularNew
                title={post.title}
                secondaryText={post.secondaryText}
                slug={post.slug}
                thumbnailUrl={getMediaUrl(post.thumbnailMedia ?? post.medias?.at(0))}
                views={post.visitCount}
                createdAt={post.createdAt}
              />
              {index !== arr.length - 1 && <Divider width="half" />}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

type PopularNewProps = {
  title: string;
  slug: string;
  secondaryText?: string;
  views: number;
  thumbnailUrl?: string;
  createdAt: Date | number | string;
};

const PopularNew: FC<PopularNewProps> = ({
  title,
  slug,
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
      to={`/posts/${slug}`}
      className="popular-news flex py-2 px-4 justify-between group cursor-pointer transition-all hover:h-96 h-48 xl:h-24 xl:hover:h-48 bg-green-100 hover:text-white hover:bg-green-900 relative rounded-sm overflow-hidden"
    >
      {thumbnailUrl && (
        <img
          src={thumbnailUrl}
          className="object-cover absolute bottom-0 w-full h-full left-0 opacity-20 group-hover:opacity-50 z-1"
        ></img>
      )}
      <div className="flex flex-col gap-1 flex-1 justify-between w-full relative z-2">
        <h1 className="text-lg md:text-lg lg:text-xl font-bold font-playfair">{title}</h1>
        <div className="hidden group-hover:line-clamp-3 font-playfair">{secondaryText}</div>
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

export default HomePageHotNews;
