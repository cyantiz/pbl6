import { useAuthStore } from '@/store';
import { Button, Modal } from 'flowbite-react';
import { FC } from 'react';
import { useDisclosure } from 'react-use-disclosure';
import { shallow } from 'zustand/shallow';
import { PostDetailHeader } from '../posts/[_slug]/Header';
import '../posts/[_slug]/index.less';

export type PreviewPostProps = {
  title: string;
  content: string;
};

const PreviewPost: FC<PreviewPostProps> = ({ title, content }) => {
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useDisclosure();

  const { authUser } = useAuthStore(
    (store) => ({
      authUser: store.authUser,
    }),
    shallow,
  );

  return (
    <>
      <Button onClick={openModal}>Preview</Button>
      <Modal show={isModalOpen} onClose={closeModal} size="7xl">
        <Modal.Header>Preview</Modal.Header>
        <Modal.Body>
          <article className="post px-4 md:px-0 max-w-2xl lg:max-w-4xl mx-auto">
            <PostDetailHeader author={authUser} title={title} createdAt={new Date()} />
            <div className="post__body prose dark:prose-dark">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </article>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PreviewPost;
