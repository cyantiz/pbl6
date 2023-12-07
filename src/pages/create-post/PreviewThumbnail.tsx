import { FC } from 'react';

export type PreviewThumbnailProps = {
  file: File | null;
};

const PreviewThumbnail: FC<PreviewThumbnailProps> = ({ file }) => {
  if (!file) return <></>;

  const blob = new Blob([file], { type: 'image/png' });

  return (
    <div className="aspect-video w-72">
      <img src={URL.createObjectURL(blob)} className="w-full h-full object-cover" />
    </div>
  );
};

export default PreviewThumbnail;
