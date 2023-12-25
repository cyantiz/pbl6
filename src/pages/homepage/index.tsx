import { FC } from 'react';
import FrontPageNews from './FrontPageNews';
import HomePageHotNews from './HomePageHotNews';

export type HomePageProps = {
  // Define your props here if needed
};

const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <div className="home-page">
      <div className="home-page__first_section w-full h-min gap-12 lg:gap-4 flex flex-wrap">
        <div className="flex flex-col flex-1 h-min pl-2">
          <FrontPageNews />
        </div>
        <div className="w-full md:w-1/3">
          <HomePageHotNews />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
