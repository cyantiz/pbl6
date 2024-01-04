import { searchPostsByImage } from '@/api/post.api';
import PostPreview from '@/components/PostPreview';
import { CloseOutlined, FileImageOutlined, LoadingOutlined } from '@ant-design/icons';
import { Button, Image, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { FC, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

export type PostsBySearchImageProps = {};

const PostsBySearchImage: FC<PostsBySearchImageProps> = ({}) => {
  const [file, setFile] = useState<File | undefined>(undefined);

  const {
    data: posts,
    isLoading: isLoadingPosts,
    error,
    refetch,
  } = useQuery(
    'posts-by-search-image',
    () => {
      if (!file) return undefined;
      return searchPostsByImage(file);
    },
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: false,
      onError: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      },
    },
  );

  useEffect(() => {
    console.log('useEffect');
    if (file) {
      refetch();
    }
  }, [file]);

  return (
    <>
      {isLoadingPosts && (
        <div className="w-screen h-screen fixed left-0 top-0 z-[999] bg-black bg-opacity-40 flex justify-center items-center text-white  gap-2 flex-col">
          <LoadingOutlined className="text-5xl" />
          <span className="text-2xl font-bold">Searching...</span>
        </div>
      )}
      <div className="w-full h-full">
        <div className="mb-2 text-center">
          <h2 className="font-playfair">Search by image</h2>
        </div>
        <div className="w-full px-4 md:px-24">
          <UploadImage file={file} onFileChange={(file) => setFile(file)} />
        </div>
        {posts && (
          <>
            <div className="mb-2 mt-2">
              <span className="">{posts.filter(Boolean).length} results:</span>
            </div>
            <div className="w-full px-2 gap-8 flex flex-col">
              {posts.map((post) => {
                if (!post) return null;
                return <PostPreview key={post.id} {...post} horizontal withSecondaryText />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export type UploadImageProps = {
  disabledDeleteBtn?: boolean;
  file?: File;
  onFileChange?: (file: File | undefined) => void;
};

const UploadImage: FC<UploadImageProps> = ({ disabledDeleteBtn, file, onFileChange }) => {
  const customRequest = async ({ file }: { file: RcFile }) => {
    if (file.size > 1024 * 1024 * 1) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Image must be less than 1MB',
      });
    }
    onFileChange && onFileChange(file as File);
  };

  return (
    <div>
      <div className="w-full h-32">
        {file ? (
          <FilePreview
            file={file}
            onDeleteBtnClick={() => {
              onFileChange && onFileChange(undefined);
            }}
            disableDeleteBtn={disabledDeleteBtn}
          />
        ) : (
          <div className="h-32">
            <Upload.Dragger
              name="file"
              multiple={true}
              accept=".jpg,.jpeg"
              onDrop={(e) => {
                console.log('Dropped files', e.dataTransfer.files);
              }}
              customRequest={({ file }) => customRequest({ file: file as RcFile })}
            >
              <p className="ant-upload-drag-icon">
                <FileImageOutlined className="!text-[32px]" />
              </p>
              <p className="ant-upload-text !text-sm">Nhấn hoặc kéo thả ảnh vào ô này</p>
            </Upload.Dragger>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostsBySearchImage;

const FilePreview = ({
  file,
  onDeleteBtnClick,
  disableDeleteBtn = false,
}: {
  file: File;
  onDeleteBtnClick: () => void;
  disableDeleteBtn?: boolean;
}) => {
  const url = URL.createObjectURL(file);

  return (
    <div className="h-full w-fit !relative group mx-auto">
      <Image src={url} height={'100%'} />
      <Button
        className="!absolute !-top-2 !-right-2 !opacity-0 group-hover:!opacity-100 !leading-[1] !rounded-full !p-2"
        danger
        type="primary"
        onClick={onDeleteBtnClick}
        disabled={disableDeleteBtn}
      >
        <CloseOutlined width={24} height={24} />
      </Button>
    </div>
  );
};
