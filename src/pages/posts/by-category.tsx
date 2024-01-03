import PostPreview from '@/components/PostPreview';
import { getQueryObjectFromSearch } from '@/utils/query';
import { getCategoryBySlug } from '@api/category.api';
import { getPublishedPosts } from '@api/post.api';
import { Icon } from '@iconify/react';
import { Button } from 'flowbite-react';
import { useMemo } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { redirect, useLocation } from 'react-router-dom';

type Props = {};

export default function PostListByCategoryPage({}: Props) {
  const location = useLocation();

  const query = getQueryObjectFromSearch({ search: location.search });

  if (!query.category || !query.category.length) redirect('/');

  const { data: categoryObj, isLoading: isLoadingCategory } = useQuery('category-by-slug', () =>
    getCategoryBySlug(query.category as string),
  );

  const {
    data: postPages,
    fetchNextPage,
    isFetchingNextPage,
    isLoading: isLoadingPosts,
  } = useInfiniteQuery({
    queryKey: ['posts-by-category', query.category],
    queryFn: ({ pageParam = 1 }) =>
      getPublishedPosts({
        page: pageParam,
        pageSize: 4,
        category: query.category as string,
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.nextPage) return lastPage.nextPage;
      return undefined;
    },
  });

  const reachedEnd = useMemo(
    () => !postPages?.pages?.[postPages.pages?.length - 1]?.nextPage,
    [postPages],
  );

  if (isLoadingCategory) return <div>Loading...</div>;
  if (!categoryObj?.id) {
    window.location.replace('/');
    return <div>Redirecting...</div>;
  }

  return (
    <>
      <div className="flex w-full flex-wrap justify-center">
        {isLoadingPosts && 'Loading...'}
        {postPages && (
          <div className="w-full px-2 gap-8 flex flex-col">
            {postPages?.pages?.map((paginatedPosts) => {
              return paginatedPosts.values.map((post) => {
                return <PostPreview key={post.id} {...post} horizontal />;
              });
            })}
          </div>
        )}
      </div>
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
