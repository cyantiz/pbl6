import Divider from '@/components/Divider';
import { FULL_DATETIME_FORMAT, getFormattedDate } from '@/utils/datetime';
import { Icon } from '@iconify/react';
import { FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

const PopularNews: FC = () => {
  return (
    <div>
      <h1 className="text-center text-xl font-bold text-gray-400 md:text-right uppercase">
        Popular news
      </h1>
      <br />

      <div className="flex flex-col gap-2 lg:gap-1">
        <PopularNew
          title="Lorem ipsum dolor sit amet"
          postId="123-456-789"
          views={100}
          createdAt={new Date()}
        />
        <Divider />
        <PopularNew
          title="Lorem ipsum dolor sit amet"
          postId="123-456-789"
          views={100}
          createdAt={new Date()}
        />
        <Divider />
        <PopularNew
          title="Lorem ipsum dolor sit amet"
          postId="123-456-789"
          views={100}
          createdAt={new Date()}
        />
      </div>
    </div>
  );
};

type PopularNewProps = {
  postId: string;
  title: string;
  views: number;
  createdAt: Date | number | string;
};

const PopularNew: FC<PopularNewProps> = ({ title, postId, views, createdAt }) => {
  const createdAtString = useMemo(() => {
    if (typeof createdAt === 'string') return createdAt;

    return getFormattedDate(createdAt, FULL_DATETIME_FORMAT);
  }, [createdAt]);

  return (
    <Link
      to={`/posts/${postId}`}
      className="flex gap-1 py-2 px-4 justify-between group cursor-pointer hover:bg-black hover:text-white transition-all"
    >
      <div className="flex flex-col gap-1 w-full">
        <h1 className="md:text-lg lg:text-2xl font-medium">{title}</h1>
        <div className="flex flex-col lg:flex-row justify-between pr-8">
          <span className="flex gap-2 items-center">
            <Icon icon="ph:eye-bold" />
            {views}
          </span>
          <span>{createdAtString}</span>
        </div>
      </div>
      <div className="flex items-center">
        <Icon icon="ph:arrow-right-bold" className="group-hover:translate-x-2 transition-all" />
      </div>
    </Link>
  );
};

export default PopularNews;
