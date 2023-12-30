import { searchPosts } from '@/api/post.api';
import PostPreview from '@/components/PostPreview';
import { getQueryObjectFromSearch } from '@/utils/query';
import { Input, Spin } from 'antd';
import { FC } from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

type SearchErrorType = 'UNKNOWN_ERR' | 'NEED_PROVIDE_TEXT' | 'NOT_SPORT_RELEVANT';

type Props = {};

export default function PostListBySearchPage({}: Props) {
  const location = useLocation();

  const query = getQueryObjectFromSearch({ search: location.search });

  let { searchText } = (query as {
    searchText: string;
  }) ?? {
    searchText: '',
  };

  if (!searchText || !searchText.length) {
    return <PleaseSearchAgain type="NEED_PROVIDE_TEXT" />;
  }
  const {
    data: posts,
    isLoading: isLoadingPosts,
    error,
  } = useQuery('posts-by-search', () => searchPosts(searchText), {
    refetchOnWindowFocus: false,
    retry: false,
  });
  console.log('error', error);

  if (isLoadingPosts) return <LoadingSearchResult />;

  if (error) {
    console.log('case error');
    const errorMessage = (error as Error).message as SearchErrorType;
    return <PleaseSearchAgain type={errorMessage} />;
  }

  if (!posts && !isLoadingPosts) {
    const errorMessage = (error as Error).message as SearchErrorType;
    return <PleaseSearchAgain type={errorMessage} />;
  }

  return (
    <>
      <div className="mb-2">
        <span className="">{posts.filter(Boolean).length} results for</span>
        <span className="font-playfair font-bold"> "{searchText}"</span>
      </div>
      {posts && (
        <div className="w-full px-2 gap-8 flex flex-col">
          {posts.map((post) => {
            if (!post) return null;
            return <PostPreview key={post.id} {...post} horizontal withSecondaryText />;
          })}
        </div>
      )}
    </>
  );
}

const LoadingSearchResult: FC = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-4 w-full h-full">
      <Spin size="large" />
      <span>Loading result</span>
    </div>
  );
};

export type PleaseSearchAgainProps = {
  type: SearchErrorType;
};

const MESSAGE_BY_TYPE: Record<SearchErrorType, [string, string]> = {
  UNKNOWN_ERR: ['Unknown error', 'Please try again later!'],
  NEED_PROVIDE_TEXT: [
    "Wait, you haven't enter anything!",
    'Please enter your search information in the search box and try again!',
  ],
  NOT_SPORT_RELEVANT: ['Your search is not relevant to sport', 'Please try again!'],
};
const PleaseSearchAgain: FC<PleaseSearchAgainProps> = ({ type = 'UNKNOWN_ERR' }) => {
  return (
    <div className="lg:px-24 lg:py-0 md:py-6 md:px-44 px-4 py-4 items-center flex justify-center flex-col-reverse 2xl:flex-row md:gap-12 gap-4">
      <div className="xl:pt-8 w-full xl:w-1/2 relative pb-12 lg:pb-0">
        <div className="relative">
          <div className="absolute">
            <div className="">
              <h1 className="my-2 text-gray-800 font-bold text-2xl">{MESSAGE_BY_TYPE[type][0]}</h1>
              <p className="my-2 text-gray-800">{MESSAGE_BY_TYPE[type][1]}</p>
              <Input.Search
                placeholder="What do you want to read?"
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
        <img className="h-[200px] lg:h-[400px]" src="https://i.ibb.co/ck1SGFJ/Group.png" />
      </div>
    </div>
  );
};
