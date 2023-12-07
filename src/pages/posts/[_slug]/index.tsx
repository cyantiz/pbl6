import { getPostBySlug } from '@/services/post.service';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { PostDetailHeader } from './Header';
import './index.less';

type Props = {};

export default function PostDetailPage({}: Props) {
  const { _slug } = useParams();

  if (!_slug) return <div>Not found</div>;

  const { data: post, isLoading: isLoadingPost } = useQuery(
    'post-detail',
    () => getPostBySlug(_slug),
    {
      refetchOnWindowFocus: false,
    },
  );

  if (isLoadingPost || !post) return <div>Loading...</div>;

  // const { title, body, secondaryText, status, createdAt, author } = post;

  return (
    <div>
      <article className="post px-4 md:px-0 max-w-2xl lg:max-w-4xl mx-auto">
        <PostDetailHeader {...post} />
        <div className="post__body prose dark:prose-dark">
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
      </article>
    </div>
  );
}
