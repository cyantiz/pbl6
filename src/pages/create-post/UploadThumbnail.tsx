import { FileImageOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { BeforeUploadFileType } from 'rc-upload/lib/interface';

import { FC } from 'react';

type Props = {
  onChange?: (file: File) => void;
};

export const UploadThumbnail: FC<Props> = ({ onChange }) => {
  const customRequest = async ({
    file,
  }: {
    file: Exclude<BeforeUploadFileType, File | boolean> | RcFile;
  }) => {
    onChange && onChange(file as File);
  };

  return (
    <div id="fileUpload" className="max-w-md aspect-video">
      <Upload.Dragger
        name="file"
        multiple={true}
        accept=".jpg,.jpeg"
        onDrop={(e) => {
          console.log('Dropped files', e.dataTransfer.files);
        }}
        customRequest={({ file }) => customRequest({ file })}
      >
        <p className="ant-upload-drag-icon">
          <FileImageOutlined className="!text-[32px]" />
        </p>
        <p className="ant-upload-text !text-sm">Click or drag thumbnail to this area</p>
      </Upload.Dragger>
    </div>
  );
};
