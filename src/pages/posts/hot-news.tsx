import CategoryLabel from '@/components/CategoryLabel';
import PostPreview, { PostCredit, PostTitle } from '@/components/PostPreview';
import { getMediaUrl } from '@api/media.api';
import { ExtendedPostModel, getPopularPosts } from '@api/post.api';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export type HotNewsPostsPageProps = {
  // Define your props here if needed
};

const HotNewsPostsPage: FC<HotNewsPostsPageProps> = ({}) => {
  const { data: posts, isLoading } = useQuery(
    'popular-posts',
    () => getPopularPosts({ limit: 3 * 3 + 2 }),
    {
      refetchOnWindowFocus: false,
    },
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      {posts && (
        <div px-2>
          <React.Fragment>
            <Banner />
            <div>
              <TwoFirstPosts firstPost={posts[0]} secondPost={posts[1]} />
              <div className="mt-10 grid gap-2 md:grid-cols-2 lg:gap-2 xl:grid-cols-3">
                {posts.slice(2).map((post) => (
                  <PostPreview {...post} />
                ))}
              </div>
              <div className="mt-10 flex justify-center">
                <a
                  className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300"
                  href="/archive"
                >
                  <span>View all Posts</span>
                </a>
              </div>
            </div>
          </React.Fragment>
        </div>
      )}
    </>
  );
};

export type TwoFirstPostsProps = {
  firstPost: ExtendedPostModel;
  secondPost: ExtendedPostModel;
};

const TwoFirstPosts: FC<TwoFirstPostsProps> = ({ firstPost, secondPost }) => {
  const posts = [firstPost, secondPost];

  return (
    <>
      <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
        {posts.map((post) => (
          <div className="p-2 group cursor-pointer bg-white rounded-md hover:shadow-2xl">
            <div className="overflow-hidden rounded-md transition-all dark:bg-gray-800">
              <Link
                className="relative block aspect-video overflow-hidden"
                to={`/posts/${post.slug}`}
              >
                <img
                  alt="Thumbnail"
                  decoding="async"
                  data-nimg="fill"
                  className="object-cover transition-all w-full h-full hover:scale-105"
                  sizes="(max-width: 768px) 30vw, 33vw"
                  src={getMediaUrl(post.thumbnailMedia ?? post.medias?.at(0))}
                />
              </Link>
            </div>
            <div className="py-4">
              <CategoryLabel category={post.category} />
              <PostTitle title={post.title} />
              <PostCredit author={post.author} createdAt={post.createdAt} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HotNewsPostsPage;

const Banner: FC = ({}) => {
  return (
    <div className="rounded flex flex-col md:flex-row mb-4 items-center justify-between mt-6 relative bg-gradient-to-r from-[#303030] via-orange-700 to-orange-600 mx-2">
      <div className=" layout flex flex-col max-w-[586px] py-6 px-8">
        <span className="font-playfair title text-white font-bold text-3xl mb-2">Hot news</span>
        <span className="text-white font-playfair">The most popular news in the last 7 days</span>
      </div>
      <div className="md:max-w-[400px] h-full">
        <img
          src="https://img.vietcetera.com/uploads/images/assets/user-need/xin-chut-dong-luc.png"
          alt=""
          className="block w-full h-full"
        />
      </div>
    </div>
  );
};
