import { FC } from 'react';
import FrontPageNews from './FrontPageNews';
import PopularNews from './PopularNews';

export type HomePageProps = {
  // Define your props here if needed
};

const HomePage: FC<HomePageProps> = ({}) => {
  return (
    <div className="home-page">
      <div className="home-page__first_section w-full gap-12 lg:gap-4 flex flex-wrap py-8">
        <FrontPageNews />
        <div className="w-full md:w-1/3">
          <PopularNews />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
