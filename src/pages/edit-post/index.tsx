import { getGeneratedContentFromTitle } from '@/api/ai.api';
import { getMediaUrl } from '@/api/media.api';
import { CloudUploadOutlined, SaveOutlined } from '@ant-design/icons';
import { getAllCategories } from '@api/category.api';
import { PostStatus, editPost, getPostById } from '@api/post.api';
import { Icon } from '@iconify/react';
import { Breadcrumb, Button, Form, FormInstance, Input, Select, Tooltip } from 'antd';
import classNames from 'classnames';
import { FC, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import PreviewPost from '../create-post/PreviewPost';
import PreviewThumbnail from '../create-post/PreviewThumbnail';
import QuillBody from '../create-post/QuillBody';
import { UploadThumbnail } from '../create-post/UploadThumbnail';

export type EditPostPageProps = {
  // Define your props here if needed
};

interface IFormInputs {
  title: string;
  categoryId: number;
  secondaryText: string;
}

const EditPostPage: FC<EditPostPageProps> = ({}) => {
  const { _postId } = useParams<{ _postId: string }>();
  const postId = parseInt(_postId ?? '0');

  useEffect(() => {
    async function fetchPost() {
      const post = await getPostById(postId);

      formRef.current?.setFieldsValue({
        title: post.title,
        categoryId: post.categoryId,
        secondaryText: post.secondaryText,
      });

      setContent(post.body);
      setTitle(post.title);
      setThumbnailFileUrl(getMediaUrl(post.thumbnailMedia));
    }

    fetchPost();
  }, []);

  const { data: categories } = useQuery('get-categories', () => getAllCategories(), {
    refetchOnWindowFocus: false,
  });
  const formRef = useRef<FormInstance>(null);

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailFileUrl, setThumbnailFileUrl] = useState<string | undefined>(undefined);

  const onSubmit = async ({ title, categoryId, secondaryText }: IFormInputs) => {
    if (!thumbnailFile && !thumbnailFileUrl) {
      Swal.fire({
        title: 'Error',
        text: 'Thumbnail is required',
        icon: 'error',
      }).then(() => {
        window.location.replace('/posts/mine');
      });

      return;
    }

    mutateEdit({
      id: postId,
      title,
      body: content,
      categoryId,
      thumbnailFile: thumbnailFile ? thumbnailFile : undefined,
      thumbnailFileUrl: thumbnailFileUrl,
      status: PostStatus.PUBLISHED,
      secondaryText,
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

  const { mutate: mutateEdit, isLoading: isLoadingEditPost } = useMutation(editPost, {
    onSuccess: (data) => {
      Swal.fire({
        title: 'Success',
        text: 'Update post successfully',
        icon: 'success',
      }).then(() => {
        window.location.replace('/posts/mine');
      });
    },
    onError: (error: any) => {
      Swal.fire({
        title: 'Error',
        text: error?.response.data.error ?? 'Something went wrong, please try again',
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
          {!thumbnailFile && !thumbnailFileUrl && (
            <UploadThumbnail
              onChange={(file) => {
                if (!file) return;
                setThumbnailFile(file);
              }}
            />
          )}
          {(thumbnailFile || thumbnailFileUrl) && (
            <PreviewThumbnail
              file={thumbnailFile}
              url={thumbnailFileUrl}
              onDeleteBtnClick={() => {
                setThumbnailFile(null);
                setThumbnailFileUrl(undefined);
              }}
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
            loading={isLoadingEditPost}
          >
            <SaveOutlined />
            Lưu nháp
          </Button>
          <Button htmlType="submit" type="primary" loading={isLoadingEditPost}>
            <CloudUploadOutlined />
            Cập nhật
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default EditPostPage;
