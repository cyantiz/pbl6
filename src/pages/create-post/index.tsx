import { getAllCategories } from '@/services/category.service';
import { createPost } from '@/services/post.service';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
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
  const {
    getValues: getFormValues,
    register: registerForm,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const { data: categories } = useQuery('get-categories', () => getAllCategories(), {
    refetchOnWindowFocus: false,
  });

  const [content, setContent] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

  const onSubmit = async ({ title, categoryId }: IFormInputs) => {
    if (!thumbnailFile) {
      Swal.fire({
        title: 'Error',
        text: 'Thumbnail is required',
        icon: 'error',
        // on button click -> redirect to main page
      });

      return;
    }

    const post = await mutateCreatePost({
      title,
      body: content,
      categoryId,
      thumbnailFile: thumbnailFile,
    });
  };

  const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } = useMutation(createPost, {
    onSuccess: (data) => {
      Swal.fire({
        title: 'Success',
        text: 'Create post successfully',
        icon: 'success',
      }).then(() => {
        window.location.replace('/my-posts');
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
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" value="Title" className="font-bold" />
          </div>
          <TextInput
            id="title"
            type="text"
            placeholder="Title"
            required
            {...registerForm('title', {
              required: true,
              pattern: /^[a-zA-Z0-9]{10,}$/,
            })}
          />
          {errors.title && errors.title.type === 'required' && (
            <p className="text-red-500">Title is required</p>
          )}
          {errors.title && errors.title.type === 'pattern' && (
            <p className="text-red-500">Title must be at least 10 characters</p>
          )}
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="title" aria-required={true} value="Category" className="font-bold" />
          </div>
          <Select
            id="categoryId"
            {...registerForm('categoryId', {
              required: true,
            })}
            required
          >
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <UploadThumbnail
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (!file) return;

              setThumbnailFile(file);
            }}
          />
          <PreviewThumbnail file={thumbnailFile} />
        </div>

        <QuillBody content={content} onChange={(newValue) => setContent(newValue)} />

        <div className="flex justify-end gap-4">
          <PreviewPost title={getFormValues().title} content={content} />
          <Button type="submit" color="dark" isProcessing={isLoadingCreatePost}>
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreatePostPage;
