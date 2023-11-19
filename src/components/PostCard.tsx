import { IPostModel } from '@/services/post.service';
import { getFormattedDate } from '@/utils/datetime';

type Props = {} & IPostModel;

export default function PostCard({ title, createdAt, categoryName }: Props) {
  return (
    <div className="bg-white overflow-hidden shadow-xl rounded-lg border-black w-1/3">
      <img
        src="https://images.unsplash.com/photo-1573748240263-a4e9c57a7fcd"
        alt="People"
        className="w-full object-cover h-32 sm:h-48 md:h-64"
      />
      <div className="p-4 md:p-6">
        <p className="text-blue-500 font-semibold text-xs mb-1 leading-none">{categoryName}</p>
        <h3 className="font-semibold mb-2 text-xl leading-tight sm:leading-normal">{title}</h3>
        <div className="text-sm flex items-center">
          <p className="leading-none">{getFormattedDate(createdAt)}</p>
        </div>
      </div>
    </div>
  );
}
