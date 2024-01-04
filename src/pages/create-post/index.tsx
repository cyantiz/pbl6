import { getGeneratedContentFromTitle } from '@/api/ai.api';
import { CloudUploadOutlined, SaveOutlined } from '@ant-design/icons';
import { getAllCategories } from '@api/category.api';
import { PostStatus, createPost } from '@api/post.api';
import { Icon } from '@iconify/react';
import { Breadcrumb, Button, Form, FormInstance, Input, Select, Tooltip } from 'antd';
import classNames from 'classnames';
import { FC, useRef, useState } from 'react';
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
  const formRef = useRef<FormInstance>(null);

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const onSubmit = async ({ title, categoryId }: IFormInputs) => {
    if (!thumbnailFile) {
      Swal.fire({
        title: 'Error',
        text: 'Thumbnail is required',
        icon: 'error',
      }).then(() => {
        window.location.replace('/posts/mine');
      });

      return;
    }

    mutateCreatePost({
      title,
      body: content,
      categoryId,
      thumbnailFile: thumbnailFile,
      status: PostStatus.PUBLISHED,
    });
  };

  const handleSaveDraft = async () => {
    try {
      console.log('save draft');
      formRef.current && (await formRef.current.validateFields());
      console.log(formRef.current?.getFieldsValue());
    } catch (error: any) {
      throw {
        message: error?.errorFields?.at(0)?.errors?.at(0) ?? 'Please fill all required fields',
      };
    }
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
        text: error?.message ?? "Can't create post right now, please refresh and try again",
        icon: 'error',
      });
    },
    retry: false,
  });

  const { mutate: mutateGenerateContentFromTitle, isLoading: isLoadingGenerateContentFromTitle } =
    useMutation(() => getGeneratedContentFromTitle(title), {
      onSuccess: (data: string) => {
        setContent(data);
      },
      onError: (error: any) => {
        Swal.fire({
          title: 'Error',
          text: error?.response.data.error ?? 'Something went wrong, please try again later',
          icon: 'error',
        });
      },
    });

  return (
    <div>
      <Form
        ref={formRef}
        className="create-post-form flex flex-col gap-2 max-w-3xl mx-auto"
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
        <Breadcrumb
          items={[
            {
              title: 'Trang chủ',
            },
            {
              title: <a href="">Biên tập</a>,
            },
            {
              title: 'Tạo bài viết',
            },
          ]}
        />

        <h1 className="create-post-form__title font-playfair">Tạo bài viết mới</h1>

        <div>
          <Form.Item<string>
            label="Tiêu đề"
            name="title"
            rules={[{ required: true, message: 'Xin vui lòng nhập tiêu đề!' }]}
          >
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
          </Form.Item>
        </div>
        <div>
          <Tooltip title={title.split(' ').length > 6 ? '' : 'Tiêu đề phải có ít nhất 6 từ'}>
            <Button
              disabled={!(title.split(' ').length > 6)}
              onClick={() => mutateGenerateContentFromTitle()}
              loading={isLoadingGenerateContentFromTitle}
            >
              <div
                className={classNames([
                  isLoadingGenerateContentFromTitle ? 'opacity-0' : '',
                  'flex gap-2 items-center',
                ])}
              >
                <Icon icon="ph:magic-wand" />
                Sinh nội dung từ tiêu đề!
              </div>
            </Button>
          </Tooltip>
        </div>
        <QuillBody content={content} onChange={(newValue) => setContent(newValue)} />

        <div>
          <p className="pb-2 m-0">Ảnh xem trước</p>
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

        <div>
          <Form.Item
            label="Chuyên mục"
            name="categoryId"
            required
            rules={[{ required: true, message: 'Xin hãy chọn chuyên mục!' }]}
          >
            <Select
              className="w-96"
              id="categoryId"
              defaultActiveFirstOption={true}
              options={categories?.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </Form.Item>
        </div>

        <div className="mb-4">
          <Form.Item label="Nội dung xem trước" name="secondaryText" required={false}>
            <Input.TextArea />
          </Form.Item>
        </div>

        <div className="flex justify-start gap-4">
          <PreviewPost title={title} content={content} />
          <Button
            onClick={async (e) => {
              e.preventDefault();
              handleSaveDraft();
            }}
            type="dashed"
            loading={isLoadingCreatePost}
          >
            <SaveOutlined />
            Lưu nháp
          </Button>
          <Button htmlType="submit" type="primary" loading={isLoadingCreatePost}>
            <CloudUploadOutlined />
            Đăng bài viết
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreatePostPage;
