import { createMedia, getMediaUrl } from '@/services/media.service';
import { Label } from 'flowbite-react';
import Quill, { DeltaStatic, Sources } from 'quill';
import { FC, useRef } from 'react';
import ReactQuill from 'react-quill';

export type QuillBodyProps = {
  content: string;
  onChange: (value: string) => void;
};

const QuillBody: FC<QuillBodyProps> = ({ content, onChange }) => {
  const quillRef = useRef<ReactQuill>(null);

  const imageHandler = () => {
    const quillObj = quillRef.current?.getEditor();
    if (!quillObj) return;

    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    console.log('input', input);

    input.onchange = async () => {
      if (!input.files) return;
      var file = input.files[0];

      const res = await uploadFiles(file, quillObj);
    };
  };

  const uploadFiles = async (file: File, _quillObj: Quill) => {
    const media = await createMedia(file);
    const fileUrl = getMediaUrl(media);
    const range = _quillObj.getSelection();

    if (!range) return;

    _quillObj.insertEmbed(range.index, 'image', fileUrl);
  };

  const handleChange = (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor,
  ) => {
    onChange(value);
  };
  return (
    <>
      <div className="container mx-auto py-2 h-96">
        <div className="mb-2 block">
          <Label value="Body" className="font-bold" />
        </div>
        <ReactQuill
          theme="snow"
          ref={quillRef}
          value={content}
          modules={{
            toolbar: {
              container: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                ['clean'],
              ],
              // handlers: {
              //   image: imageHandler,
              // },
            },
          }}
          placeholder="Add a description of your event"
          onChange={handleChange}
          className="h-72"
        />
      </div>
    </>
  );
};

export default QuillBody;
