import { IMediaModel, getMediaUrl } from '@/services/media.service';
import { getPostBySlug } from '@/services/post.service';
import { Carousel } from 'antd';
import { FC } from 'react';
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

        <PostCarousel medias={post.medias} />
        <div className="post__body prose dark:prose-dark">
          <div dangerouslySetInnerHTML={{ __html: post.body }} />
        </div>
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
