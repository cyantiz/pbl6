import { DeltaStatic, Sources } from 'quill';
import { FC, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import the styles
import { testContent } from './constant';

export type PlaygroundProps = {
  // Define your props here if needed
};

const Playground: FC<PlaygroundProps> = ({}) => {
  const [content, setContent] = useState(testContent);

  const handleChange = (
    value: string,
    delta: DeltaStatic,
    source: Sources,
    editor: ReactQuill.UnprivilegedEditor,
  ) => {
    console.table({ value, delta, source, editor });

    setContent(value);
  };

  return (
    <div className="container mx-auto py-8 h-96">
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        }}
        className="h-full"
      />
    </div>
  );
};

export default Playground;
