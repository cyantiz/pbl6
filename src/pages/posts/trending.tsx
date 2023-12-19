import CategoryLabel from '@/components/CategoryLabel';
import Container from '@/components/Container';
import PostPreview, { PostCredit, PostTitle } from '@/components/PostPreview';
import { getMediaUrl } from '@/services/media.service';
import { ExtendedPostModel, getPopularPosts } from '@/services/post.service';
import React, { FC } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export type TrendingPostsPageProps = {
  // Define your props here if needed
};

const TrendingPostsPage: FC<TrendingPostsPageProps> = ({}) => {
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
        <Container large={true}>
          <React.Fragment>
            <Container large>
              <div className="w-full text-center mb-8">
                <h1 className="text-center text-xl font-bold text-black uppercase">
                  Trending news
                </h1>
                <span>The most popular news in the last 7 days</span>
              </div>
              <TwoFirstPosts firstPost={posts[0]} secondPost={posts[1]} />
              <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3">
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
            </Container>
          </React.Fragment>
        </Container>
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
    <div className="grid gap-10 md:grid-cols-2 lg:gap-10">
      {posts.map((post) => (
        <div className="group cursor-pointer">
          <div className="overflow-hidden rounded-md bg-gray-100 transition-all dark:bg-gray-800">
            <Link className="relative block aspect-video" to={`/posts/${post.slug}`}>
              <img
                alt="Thumbnail"
                decoding="async"
                data-nimg="fill"
                className="object-cover transition-all w-full h-full inset-0 hover:scale-105"
                sizes="(max-width: 768px) 30vw, 33vw"
                src={getMediaUrl(post.thumbnailMedia ?? post.medias?.at(0))}
              />
            </Link>
          </div>
          <div className="">
            <div>
              <CategoryLabel category={post.category} />
              <PostTitle title={post.title} />
              <PostCredit author={post.author} createdAt={post.createdAt} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingPostsPage;
