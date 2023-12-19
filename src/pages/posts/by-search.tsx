import PostPreview from '@/components/PostPreview';
import { searchPosts } from '@/services/post.service';
import { getQueryObjectFromSearch } from '@/utils/query';
import { Input } from 'antd';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

type Props = {};

export default function PostListBySearchPage({}: Props) {
  const location = useLocation();

  const query = getQueryObjectFromSearch({ search: location.search });

  let { searchText } = (query as {
    searchText: string;
  }) ?? {
    searchText: '',
  };

  if (!searchText || !searchText.length) return <NeedSearchText />;

  const { data: posts, isLoading: isLoadingPosts } = useQuery(
    'posts-by-search',
    () => searchPosts(searchText),
    {
      refetchOnWindowFocus: false,
    },
  );

  if (!posts) return <div>Loading...</div>;

  return (
    <>
      {isLoadingPosts && 'Loading...'}
      {posts && (
        <div className="w-full px-2 gap-8 flex flex-col">
          {posts.map((post) => {
            return <PostPreview key={post.id} {...post} horizontal withSecondaryText />;
          })}
        </div>
      )}
    </>
  );
}

export type NeedSearchTextProps = {
  // Define your props here if needed
};

const NeedSearchText: FC<NeedSearchTextProps> = ({}) => {
  return (
    <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
      <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">
                You haven't provide any information for searching!
              </h1>
              <p className="my-2 text-gray-800">
                Please enter your search information in the search box and try again!
              </p>
              <Input.Search
                placeholder="What do you to read?"
                enterButton="Search"
                size="large"
                onSearch={(value) => {
                  window.location.replace(`/posts/by-search?searchText=${value}`);
                }}
              />
            </div>
          </div>
          <div>
            <img src="https://i.ibb.co/G9DC8S0/404-2.png" />
          </div>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
};
