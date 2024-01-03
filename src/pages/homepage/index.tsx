import { FC } from 'react';
import FrontPageNews from './FrontPageNews';
import HomePageHotNews from './HomePageHotNews';
import HomePageLatestNews from './HomePageLatestNews';

export type HomePageProps = {
  // Define your props here if needed
};

const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <div className="home-page">
      <div className="home-page__first_section w-full h-min gap-12 lg:gap-4 flex flex-wrap">
        <div className="flex flex-col flex-1 h-min pl-2 gap-8">
          <FrontPageNews />
          <div className="hidden lg:block">
            <HomePageLatestNews />
          </div>
        </div>
        <div className="w-full 2xl:w-1/3">
          <HomePageHotNews />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
