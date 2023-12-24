import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Wallpaper from '../assets/img/login-page-img.jpg';

type Props = {
  //
};

const Auth: FC<Props> = ({}) => {
  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="w-full max-w xl:w-[512px] py-8 pl-12 pr-12 xl:pr-6 flex flex-col justify-between">
        <Link className="font-black text-4xl font-playfair" to="/">
          Sportivefy
        </Link>
        <div className="flex-1 flex w-full items-center">
          <Outlet />
        </div>
      </div>
      <div className="h-full flex-1 hidden xl:flex">
        <div className="h-full w-full p-8">
          <img className="h-full rounded-2xl w-full object-cover" src={Wallpaper} />
        </div>
      </div>
    </div>
  );
};

export default Auth;
