import { getMediaUrl } from '@/services/media.service';
import { ExtendedPostModel, PostStatus } from '@/services/post.service';
import { getFormattedDate } from '@/utils/datetime';
import { Icon } from '@iconify/react';
import { Badge } from 'flowbite-react';
import { Link } from 'react-router-dom';

type Props = {
  showStatus?: boolean;
} & ExtendedPostModel;

const mapStatus2BadgeColor: Record<PostStatus, string> = {
  [PostStatus.DRAFT]: 'gray',
  [PostStatus.DENIED]: 'failure',
  [PostStatus.PUBLISHED]: 'success',
  [PostStatus.DELETED]: 'failure',
};

export default function PostCard({
  slug,
  title,
  secondaryText,
  status,
  createdAt,
  category,
  visitCount,
  thumbnailMedia,
  showStatus = false,
}: Props) {
  return (
    <Link
      to={status === PostStatus.PUBLISHED ? `/posts/${slug}` : '#'}
      className="w-full lg:w-1/2 p-2"
    >
      <div className="bg-white overflow-hidden shadow-xl rounded-lg border-black group cursor-pointer">
        <div className="w-full h-32 sm:h-48 md:h-64 overflow-hidden">
          <img
            src={getMediaUrl(thumbnailMedia)}
            alt="Post-Thumbnail"
            className="object-cover w-full h-full group-hover:scale-110 transition-all"
          />
        </div>
        <div className="p-2 md:p-4">
          <p className="flex gap-4 items-center mb-4">
            <span className="text-blue-500 font-semibold text-xs leading-none">
              {category.name}
            </span>
            {showStatus && (
              <Badge size="xs" color={mapStatus2BadgeColor[status]} className="w-fit">
                {status}
              </Badge>
            )}
          </p>
          <h3 className="font-semibold mb-1 text-lg leading-tight sm:leading-normal">{title}</h3>
          <p className="line-clamp-2 mb-3 text-gray-500">{secondaryText}</p>

          <div className="text-sm flex gap-2 text-gray-500">
            <p className="leading-none flex gap-2 mr-2">
              <Icon icon="ph:eye-bold" /> {visitCount}
            </p>
            <p className="leading-none">{getFormattedDate(createdAt)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
