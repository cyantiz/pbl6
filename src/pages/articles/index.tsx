import PostCard from '@/components/PostCard';
import { PostStatus, getPosts } from '@/services/post.service';
import { getQueryObjectFromSearch } from '@/utils/query';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';

type Props = {};

export default function ArticleList({}: Props) {
  const location = useLocation();

  const query = getQueryObjectFromSearch({ search: location.search });

  const { data: posts } = useQuery('article-by-category', () =>
    getPosts({
      category: query.category,
      status: PostStatus.PUBLISHED,
    }),
  );

  if (!posts) return <div>Loading...</div>;

  return (
    <div>
      {posts?.map((post) => (
        <PostCard {...post} />
      ))}
    </div>
  );
}
