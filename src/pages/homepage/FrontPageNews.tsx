import { cutoff } from '@/utils/string';
import { Icon } from '@iconify/react';
import { FC, useEffect, useState } from 'react';

type FrontPageNews = {
  title: string;
  thumbnailUrl: string;
  secondaryTitle: string;
};

const FrontPageNews: FC = () => {
  const [frontPageNews, setFrontPageNews] = useState<FrontPageNews>();

  const { title, thumbnailUrl, secondaryTitle } = frontPageNews ?? {};

  useEffect(() => {
    // Fetch data here

    setFrontPageNews({
      title: 'Match of the year is coming!!',
      thumbnailUrl:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Cristiano_Ronaldo_and_Lionel_Messi_-_Portugal_vs_Argentina%2C_9th_February_2011.jpg/1200px-Cristiano_Ronaldo_and_Lionel_Messi_-_Portugal_vs_Argentina%2C_9th_February_2011.jpg',
      secondaryTitle:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde consectetur corporis earum corrupti repudiandae quam esse, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde consectetur corporis earum corrupti repudiandae quam esse, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde consectetur corporis earum corrupti repudiandae quam esse, adipisicing elit. Unde consectetur corporis earum corrupti repudiandae quam esse, adipisicing elit. Unde consectetur corporis earum corrupti repudiandae quam esse',
    });
  }, []);

  return frontPageNews ? (
    <div className="flex flex-col xl:flex-row flex-1 gap-2 h-min">
      <div className="relative flex flex-row xl:flex-col gap-2 justify-between w-full xl:w-4/12 z-[2]">
        <h1 className="w-full text-center md:text-start text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold drop-shadow-lg text-black leading-[110%]">
          {title}
        </h1>
        <p className="bigger-screen__secondary-text text-gray-600 w-5/6 hidden xl:block">
          {cutoff(secondaryTitle, 180)}
        </p>
      </div>
      <div className="relative z-[1] w-full xl:w-1/2 h-min">
        <img
          className="object-cover w-full aspect-[4/3] md:aspect-[5/4] xl:aspect-[11/16]"
          src={thumbnailUrl}
          alt={'front-page-news-img'}
        />
        <div className="absolute w-full h-full bg-gradient-to-t from-black via-black to-[rgba(0,0,0,0)] opacity-40 bottom-0"></div>
        <div className="small-screen__secondary-text xl:hidden absolute bottom-16 text-sm text-white w-2/3 p-4 lg:p-8">
          {cutoff(secondaryTitle, 100)}
        </div>
        <ContinueReadingButton />
      </div>
    </div>
  ) : (
    <div className="flex">
      <h1 className="text-xl text-bold">Loading...</h1>
    </div>
  );
};

const ContinueReadingButton: FC = () => (
  <div className="absolute bottom-0 uppercase bg-black text-white p-4 pl-2 flex gap-3 group cursor-pointer">
    <span className="font-medium text-xs">Continue reading</span>
    <Icon className="group-hover:translate-x-1 transition-all" icon="ph:arrow-right-bold" />
  </div>
);

export default FrontPageNews;
