import { FC } from 'react';

export type FooterProps = {
  // Define your props here if needed
};

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className="rounded-lg mt-auto shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-12">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-12" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023 Sportivefy™ . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
