import PostPreview from '@/components/PostPreview';
import { getMyPosts } from '@/services/post.service';
import { useQuery } from 'react-query';

type Props = {};

export default function MyPostsPage({}: Props) {
  const { data: posts, isLoading: isLoadingPosts } = useQuery(
    'posts-by-search',
    () => getMyPosts(),
    {
      refetchOnWindowFocus: false,
    },
  );

  if (!posts || !posts.length) return <div>Loading...</div>;

  return (
    <>
      {isLoadingPosts && 'Loading...'}
      {posts && (
        <>
          <div className="w-full text-center">
            <h1>My posts</h1>
            <div>Post that you have created</div>
          </div>
          <div className="w-full px-2 gap-8 flex flex-col">
            {posts.map((post) => {
              return <PostPreview key={post.id} {...post} horizontal withSecondaryText />;
            })}
          </div>
        </>
      )}
    </>
  );
}
