import PostPreview from '@/components/PostPreview';
import { getPublishedPosts } from '@api/post.api';
import { Icon } from '@iconify/react';
import { Button } from 'flowbite-react';
import { FC, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

type Props = {};

export default function PostListPage({}: Props) {
  const {
    data: postPages,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isLoadingPosts,
  } = useInfiniteQuery({
    queryKey: 'list-posts',
    queryFn: ({ pageParam = 1 }) =>
      getPublishedPosts({
        page: pageParam,
        pageSize: 12,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.nextPage) return lastPage.nextPage;
      return undefined;
    },
  });

  const reachedEnd = useMemo(
    () => !postPages?.pages?.[postPages.pages.length - 1]?.nextPage,
    [postPages],
  );

  if (!postPages) return <div>Loading...</div>;

  return (
    <>
      <Banner />
      {isLoadingPosts && 'Loading...'}
      {postPages && (
        <div className="w-full px-2 gap-8 flex flex-col">
          {postPages.pages.map((paginatedPosts) => {
            return paginatedPosts.values.map((post) => {
              return <PostPreview key={post.id} {...post} horizontal withSecondaryText />;
            });
          })}
        </div>
      )}
      <div className="mt-10 flex justify-center">
        {!reachedEnd && (
          <Button
            color="dark"
            className="group"
            onClick={() => fetchNextPage()}
            isProcessing={isFetchingNextPage}
          >
            {!isFetchingNextPage && (
              <Icon
                icon="ph:arrow-fat-line-down-bold"
                className="mr-2 group-hover:translate-y-1 transition-all"
              />
            )}
            View more
          </Button>
        )}
      </div>
    </>
  );
}

const Banner: FC = ({}) => {
  return (
    <div className="rounded flex flex-col md:flex-row mb-4 items-center justify-between mt-6 relative bg-gradient-to-r from-[#303030] via-purple-700 to-purple-600 mx-2">
      <div className=" layout flex flex-col max-w-[586px] py-6 px-8">
        <span className="font-playfair title text-white font-bold text-3xl mb-2">Latest news</span>
        <span className="text-white font-playfair">
          Stay up-to-date with the latest sport news from our best writers.
        </span>
      </div>
      <div className="md:max-w-[400px] h-full">
        <img
          src="https://img.vietcetera.com/uploads/images/assets/user-need/tom-lai-la.png"
          alt=""
          className="block w-full h-full"
        />
      </div>
    </div>
  );
};
