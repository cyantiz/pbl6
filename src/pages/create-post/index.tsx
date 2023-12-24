import { getAllCategories } from '@api/category.api';
import { PostStatus, createPost } from '@api/post.api';
import { Breadcrumb, Button, Form, Input, Select } from 'antd';
import { FC, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import Swal from 'sweetalert2';
import PreviewPost from './PreviewPost';
import PreviewThumbnail from './PreviewThumbnail';
import QuillBody from './QuillBody';
import { UploadThumbnail } from './UploadThumbnail';

export type CreatePostPageProps = {
  // Define your props here if needed
};

interface IFormInputs {
  title: string;
  categoryId: number;
}

const CreatePostPage: FC<CreatePostPageProps> = ({}) => {
  const { data: categories } = useQuery('get-categories', () => getAllCategories(), {
    refetchOnWindowFocus: false,
  });

  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [content, setContent] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const onSubmit = async ({ title, categoryId }: IFormInputs) => {
    console.log('title', title);
    console.log('categoryId', categoryId);

    if (!thumbnailFile) {
      Swal.fire({
        title: 'Error',
        text: 'Thumbnail is required',
        icon: 'error',
        // on button click -> redirect to main page
      }).then(() => {
        window.location.replace('/posts/mine');
      });

      return;
    }

    const post = await mutateCreatePost({
      title,
      body: content,
      categoryId,
      thumbnailFile: thumbnailFile,
      status: PostStatus.PUBLISHED,
    });
  };

  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } = useMutation(createPost, {
    onSuccess: (data) => {
      Swal.fire({
        title: 'Success',
        text: 'Create post successfully',
        icon: 'success',
      }).then(() => {
        window.location.replace('/posts/mine');
      });
    },
    onError: (error: any) => {
      Swal.fire({
        title: 'Error',
        text:
          error?.response.data.error ?? "Can't create post right now, please refresh and try again",
        icon: 'error',
      });
    },
  });

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: 'Home',
          },
          {
            title: <a href="">Editor</a>,
          },
          {
            title: 'Create Post',
          },
        ]}
      />

      <Form
        className="flex flex-col gap-6 max-w-3xl mx-auto"
        layout="vertical"
        onFinish={onSubmit}
        onFinishFailed={() => {
          Swal.fire({
            title: 'Error',
            text: 'Please fill all required fields',
            icon: 'error',
          });
        }}
      >
        <div>
          <Form.Item<string>
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input title!' }]}
          >
            <Input
              size="large"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Title"
            />
          </Form.Item>
        </div>

        <div>
          <Form.Item
            label="Category"
            name="categoryId"
            required
            rules={[{ required: true, message: 'Please select category!' }]}
          >
            <Select
              className="w-96"
              id="categoryId"
              defaultActiveFirstOption={true}
              value={categoryId}
              onChange={(opt) => {
                setCategoryId(opt as number);
              }}
              options={categories?.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </Form.Item>
        </div>

        <div>
          <p className="pb-2 m-0">Thumbnail</p>
          {!thumbnailFile && (
            <UploadThumbnail
              onChange={(file) => {
                if (!file) return;
                setThumbnailFile(file);
              }}
            />
          )}
          {thumbnailFile && (
            <PreviewThumbnail
              file={thumbnailFile}
              onDeleteBtnClick={() => setThumbnailFile(null)}
            />
          )}
        </div>

        <QuillBody content={content} onChange={(newValue) => setContent(newValue)} />

        <div className="flex justify-end gap-4">
          <PreviewPost title={title} content={content} />
          <Button htmlType="submit" size="large" loading={isLoadingCreatePost}>
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CreatePostPage;
