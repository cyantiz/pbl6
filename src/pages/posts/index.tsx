import PostPreview from '@/components/PostPreview';
import { getPublishedPosts } from '@/services/post.service';
import { Icon } from '@iconify/react';
import { Button } from 'flowbite-react';
import { useMemo } from 'react';
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
