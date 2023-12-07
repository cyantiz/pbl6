import PostCard from '@/components/PostCard';
import { PostStatus, getPosts } from '@/services/post.service';
import { useQuery } from 'react-query';

type Props = {};

export default function PostListPage({}: Props) {
  // const location = useLocation();

  // const query = getQueryObjectFromSearch({ search: location.search });

  const { data: posts } = useQuery('get-all-posts', () =>
    getPosts({
      status: PostStatus.PUBLISHED,
    }),
  );

  if (!posts) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap justify-center">
      {posts?.map((post) => (
        <PostCard {...post} />
      ))}
    </div>
  );
}
