import { FileInput, Label } from 'flowbite-react';
import { FC } from 'react';

type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const UploadThumbnail: FC<Props> = ({ onChange }) => {
  return (
    <div id="fileUpload" className="max-w-md p-4">
      <div className="mb-2 block">
        <Label htmlFor="file" value="Upload thumbnail image" className="font-bold" />
      </div>
      <FileInput
        id="file"
        onChange={onChange}
        helperText="A thumbnail is used to represent your post."
      />
    </div>
  );
};
