import { DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { FC } from 'react';

export type PreviewThumbnailProps = {
  file: File | null;
  onDeleteBtnClick: () => void;
  disableDeleteBtn?: boolean;
};

const PreviewThumbnail: FC<PreviewThumbnailProps> = ({
  file,
  onDeleteBtnClick,
  disableDeleteBtn,
}) => {
  if (!file) return <></>;

  const blob = new Blob([file], { type: 'image/png' });

  return (
    <div className="max-w-sm aspect-video relative group">
      <Button
        className="!absolute -top-2 -right-2 opacity-0 text-xs group-hover:opacity-100 !leading-[1] !rounded-full !p-2"
        danger
        type="primary"
        onClick={onDeleteBtnClick}
        disabled={disableDeleteBtn}
      >
        <DeleteOutlined />
      </Button>
      <div className="w-full h-full rounded overflow-hidden border border-dashed border-blue-500">
        <img src={URL.createObjectURL(blob)} className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default PreviewThumbnail;
