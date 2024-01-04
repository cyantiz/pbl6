import PostCommentSection from '@/components/Comment/PostCommentSection';
import { getUserId } from '@/utils/common';
import { IMediaModel, getMediaUrl } from '@api/media.api';
import { getPostBySlug, readPost } from '@api/post.api';
import { Breadcrumb, Carousel, Divider } from 'antd';
import { FC, useEffect } from 'react';
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

  useEffect(() => {
    const markReadPost = async () => {
      if (!post) return;

      // const { IPv4 } = await getGeoLocation();
      const userId = getUserId();

      if (!userId) return;

      readPost({
        postId: post.id,
        // IP: IPv4 ? IPv4 : undefined,
        userId: userId ? userId : undefined,
      });
    };
    markReadPost();
  }, [post]);

  if (isLoadingPost || !post) return <div>Loading...</div>;

  // const { title, body, secondaryText, status, createdAt, author } = post;

  return (
    <div>
      <article className="post px-4 md:px-0 max-w-2xl lg:max-w-3xl mx-auto">
        <div className="mb-8">
          <Breadcrumb
            items={[
              {
                title: <a href="/">Home</a>,
              },
              {
                title: <a href="/category-list">All categories</a>,
              },
              {
                title: (
                  <a href={`/posts/by-category?category=${post.category.slug}`}>
                    {post.category.name}
                  </a>
                ),
              },
              {
                title: post.title,
              },
            ]}
          />
        </div>

        <PostDetailHeader {...post} />

        <PostCarousel medias={post.medias} />
        <div className="post__body prose dark:prose-dark">
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
        <Divider />
        <PostCommentSection postId={post.id} />
      </article>
    </div>
  );
}

export type PostCarouselProps = {
  medias: IMediaModel[];
};

const PostCarousel: FC<PostCarouselProps> = ({ medias }) => {
  return (
    <Carousel dotPosition="top">
      {medias.length > 0 &&
        medias.map((media) => (
          <>
            <div className="w-full aspect-video overflow-hidden">
              <img src={getMediaUrl(media)} className="h-full mx-auto object-cover" />
            </div>
            <div className="w-full italic text-center h-12 px-6 mt-2">{media.alt}</div>
          </>
        ))}
    </Carousel>
  );
};
