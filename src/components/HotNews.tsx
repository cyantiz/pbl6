import { getMediaUrl } from '@api/media.api';
import { ExtendedPostModel } from '@api/post.api';
import { Icon } from '@iconify/react';
import { FC } from 'react';

export type HotNewsProps = {
  // Define your props here if needed
} & ExtendedPostModel;

const HotNews: FC<HotNewsProps> = ({ title, secondaryText, thumbnailMedia }) => {
  return (
    <section className="mb-32">
      <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div className="flex flex-wrap items-center">
          <div className="hidden shrink-0 grow-0 basis-auto lg:flex lg:w-6/12 xl:w-4/12">
            <img
              src={getMediaUrl(thumbnailMedia)}
              alt={thumbnailMedia.alt ?? 'Hot news image'}
              className="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
            />
          </div>
          <div className="w-full shrink-0 grow-0 basis-auto lg:w-6/12 xl:w-8/12">
            <div className="px-6 py-12 md:px-12">
              <h2 className="mb-4 text-2xl font-bold">{title}</h2>
              <p className="mb-6 flex items-center font-bold uppercase text-danger dark:text-danger-500">
                <Icon icon="ph:circle-fill" className="mr-2 h-2 w-2" />
                Hot news
              </p>
              {secondaryText?.split('\n').map((text, index) => (
                <p key={index} className="mb-6 text-neutral-500 dark:text-neutral-300">
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotNews;
