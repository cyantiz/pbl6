import { FC, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export type AppCurtainProps = {
  // Define your props here if needed
};

const AppCurtain: FC<AppCurtainProps> = ({}) => {
  const curtainRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const hideCurtain = async () => {
      if (location.pathname === '/posts/by-search') {
        curtainRef.current && curtainRef.current.style.setProperty('display', 'none');
      }

      await new Promise((resolve) => setTimeout(resolve, 700));
      curtainRef.current && curtainRef.current.style.setProperty('left', '-100%');

      await new Promise((resolve) => setTimeout(resolve, 1400));
      curtainRef.current && curtainRef.current.style.setProperty('display', 'none');
    };

    hideCurtain();
  }, []);

  return (
    <div
      ref={curtainRef}
      className="__curtain__ fixed z-[99999] transition-all duration-[700ms] w-screen h-screen top-0 left-0 bg-white flex justify-center items-center"
    >
      <span className="font-playfair text-7xl font-bold">Sportivefy</span>
    </div>
  );
};

export default AppCurtain;
