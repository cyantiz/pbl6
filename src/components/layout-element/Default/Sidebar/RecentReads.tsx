import { getMediaUrl } from '@/api/media.api';
import { getRecentReads } from '@/api/post.api';
import { Icon } from '@iconify/react';
import { FC } from 'react';
import { useQuery } from 'react-query';

export type RecentReadsProps = {
  // Define your props here if needed
};

const RecentReads: FC<RecentReadsProps> = ({}) => {
  const { data: recentReads, isLoading: isLoadingRecentReads } = useQuery(
    'recent-reads',
    () => getRecentReads({ limit: 10 }),
    {
      refetchOnWindowFocus: false,
      refetchInterval: 1000 * 60 * 1,
    },
  );

  return (
    <div className="__sidebar__top-contributors w-64">
      <div className="__sidebar__top-contributors__title flex items-center gap-2 mb-4">
        <Icon icon="ph:read-cv-logo" className="text-lg text-yellow-500" />
        <div className="text-base uppercase font-bold text-blue-600">Đã đọc gần đây</div>
      </div>
      <div className="flex flex-col gap-2 ml-3">
        {recentReads?.values?.map((post, index) => (
          <div
            key={index}
            className="flex gap-3 items-center hover:text-blue-500 cursor-pointer"
            onClick={() => {
              window.open(`/posts/${post.slug}`, '_blank');
            }}
          >
            <div className="avatar-container !w-8 !h-8 overflow-hidden rounded">
              <img
                className="w-full h-full object-cover"
                src={getMediaUrl(post.thumbnailMedia ?? post.medias?.at(0))}
                alt="#"
              />
            </div>
            <span className="flex-1 text-sm overflow-hidden text-ellipsis line-clamp-1">
              {post.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentReads;
