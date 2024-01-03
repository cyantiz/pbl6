import { getPublishedPosts } from '@/api/post.api';
import PostPreview from '@/components/PostPreview';
import { Button } from 'antd';
import { FC } from 'react';
import { useQuery } from 'react-query';

export type HomePageLatestNewsProps = {
  // Define your props here if needed
};

const HomePageLatestNews: FC<HomePageLatestNewsProps> = ({}) => {
  const { data: posts } = useQuery({
    queryKey: 'homepage-latest-news',
    queryFn: () => getPublishedPosts({ page: 1, pageSize: 5 }),
  });

  return (
    posts?.values && (
      <div className="w-full gap-4 flex flex-col">
        {posts.values?.map((post) => {
          return <PostPreview key={post.id} {...post} horizontal withSecondaryText />;
        })}
        <Button type="primary" className="w-full">
          Xem thêm
        </Button>
      </div>
    )
  );
};

export default HomePageLatestNews;
