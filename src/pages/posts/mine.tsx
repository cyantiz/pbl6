import { IMediaModel, getMediaUrl } from '@/api/media.api';
import { PostStatusColorMap } from '@/utils/constant';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { PostStatus, deletePost, getMyPosts } from '@api/post.api';
import { Button, Image, Pagination, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useQuery } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

type Props = {};

export default function MyPostsPage({}: Props) {
  const {
    data: posts,
    isLoading: isLoadingPosts,
    refetch,
  } = useQuery('my-posts', () => getMyPosts(), {
    refetchOnWindowFocus: false,
  });
  const navigate = useNavigate();

  const cols: ColumnsType<any> = [
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnailMedia',
      key: 'thumbnail',
      width: 200,
      render: (thumbnailMedia: IMediaModel) => {
        const url = getMediaUrl(thumbnailMedia);
        return (
          <div className="aspect-video overflow-hidden">
            <Image src={url} width={'100%'} height={'100%'} className="object-cover" />
          </div>
        );
      },
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 232,
      render: (text: string, record: any) => (
        <div className="w-48 overflow-hidden text-ellipsis whitespace-nowrap">
          <Link to={`/posts/${record.slug}`}>{text}</Link>
        </div>
      ),
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      width: '120px',
      align: 'center',
      render: (status: PostStatus) => {
        return (
          <div
            className="py-1 px-2 font-bold text-xs text-white w-fit rounded"
            style={{
              backgroundColor: PostStatusColorMap[status],
            }}
          >
            {status}
          </div>
        );
      },
    },
    {
      title: 'Preview Text',
      dataIndex: 'secondaryText',
      key: 'secondaryText',
      render: (text: string) => {
        if (!text || !text?.length) {
          return <div className="text-gray-400 italic">No preview text</div>;
        }
        return <div className="w-48 overflow-hidden text-ellipsis whitespace-nowrap">{text}</div>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: '160px',
      align: 'center',
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              location.replace(`/edit-post/${record.id}`);
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            type="primary"
            danger
            onClick={async () => {
              await deletePost(record.id);
              refetch();
            }}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  if (!posts || !posts?.values) return <div>Loading...</div>;

  return (
    <>
      {isLoadingPosts && 'Loading...'}
      {posts && (
        <>
          <div className="w-full flex justify-between mb-4">
            <h2 className="font-playfair">Bài viết của tôi</h2>
            <Button type="primary" onClick={() => navigate('/create-post')}>
              <PlusCircleOutlined />
              Tạo bài viết mới
            </Button>
          </div>
          <div>
            <Table
              dataSource={posts.values}
              columns={cols}
              bordered
              rowKey="id"
              pagination={false}
              className="mb-2"
            />
            <div className="flex justify-center">
              <Pagination pageSize={posts.pageSize} total={posts.total} current={posts.page} />
            </div>
          </div>
        </>
      )}
    </>
  );
}
