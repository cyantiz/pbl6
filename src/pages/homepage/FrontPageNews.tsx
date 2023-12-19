import { getMediaUrl } from '@/services/media.service';
import { getFrontPagePost } from '@/services/post.service';
import { cutoff } from '@/utils/string';
import { Icon } from '@iconify/react';
import { Badge } from 'flowbite-react';
import { FC } from 'react';
import { useQuery } from 'react-query';

type FrontPageNews = {
  title: string;
  thumbnailUrl: string;
  secondaryTitle: string;
};

const FrontPageNews: FC = () => {
  const { data: frontPagePost, isLoading } = useQuery('frontPagePost', () => getFrontPagePost(), {
    refetchOnWindowFocus: false,
  });

  if (isLoading || !frontPagePost)
    return (
      <div className="flex">
        <h1 className="text-xl text-bold">Loading...</h1>
      </div>
    );

  const { title, thumbnailMedia, secondaryText, medias } = frontPagePost;
  const thumbnailUrl = getMediaUrl(thumbnailMedia ?? medias?.at(0));

  console.log('frontPagePost', frontPagePost);
  console.log('thumbnailUrl', thumbnailUrl);

  return (
    <div className="flex justify-center flex-col xl:flex-row flex-1 gap-2 h-min">
      <div className="relative flex flex-row xl:flex-col gap-2 justify-between w-full xl:w-4/12 z-[2]">
        <h1 className="w-full text-center md:text-start text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold drop-shadow-lg text-black leading-[110%]">
          {title}
        </h1>
        <p className="bigger-screen__secondary-text text-gray-600 w-5/6 hidden xl:block">
          {cutoff(secondaryText, 180)}
        </p>
      </div>
      <div className="relative z-[1] w-full xl:w-1/2 h-min overflow-hidden rounded-r-lg group">
        <img
          className="object-cover w-full aspect-[4/3] md:aspect-[5/4] xl:aspect-[11/16] group-hover:scale-110 transition-all"
          src={thumbnailUrl}
          alt={'front-page-news-img'}
        />
        <div className="absolute w-full h-full bg-gradient-to-t from-black via-green-900 to-green-900 opacity-40 bottom-0"></div>
        <div className="small-screen__secondary-text xl:hidden absolute bottom-16 text-sm text-white w-2/3 p-4 lg:p-8">
          {cutoff(secondaryText, 100)}
        </div>
        <Badge color="failure" className="absolute scale-100 top-2 left-2">
          Front-page
        </Badge>
        <ContinueReadingButton
          onClick={() => {
            window.location.href = `/posts/${frontPagePost.slug}`;
          }}
        />
      </div>
    </div>
  );
};

const ContinueReadingButton = ({ onClick }: { onClick: () => void }) => (
  <div
    className="absolute bottom-4 left-4 uppercase bg-green-400 text-white p-4 flex gap-3 group cursor-pointer rounded-3xl"
    onClick={onClick}
  >
    <span className="font-medium text-xs">Continue reading</span>
    <Icon className="group-hover:translate-x-1 transition-all" icon="ph:arrow-right-bold" />
  </div>
);

export default FrontPageNews;
