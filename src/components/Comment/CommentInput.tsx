import { commentToPost } from '@/api/post.api';
import { useAuthStore } from '@/store';
import { CommentOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { FC } from 'react';
import Swal from 'sweetalert2';
import { shallow } from 'zustand/shallow';

export type CommentInputProps = {
  postId: number;
  afterComment?: () => void;
};

const CommentInput: FC<CommentInputProps> = ({ postId, afterComment }) => {
  const { authUser } = useAuthStore(
    (store) => ({
      authUser: store.authUser,
      clearAuthData: store.clear,
    }),
    shallow,
  );

  const [form] = Form.useForm<{
    comment: string;
  }>();

  const handleSubmit = async () => {
    if (!authUser || !authUser?.id) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You need to login to comment!',
      });

      return;
    }
    const comment = form.getFieldValue('comment');

    if (!comment) return;
    try {
      await commentToPost({
        postId,
        text: comment,
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Comment successfully!',
      });
      afterComment && afterComment();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  return (
    <Form form={form} onFinish={handleSubmit} className="flex flex-col md:flex-row w-full gap-3">
      <Form.Item name="comment" className="flex-1 !mb-2">
        <Input.TextArea
          className="!bg-gray-100"
          placeholder="Enter your comment here!"
          rows={5}
          maxLength={255}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          <CommentOutlined />
          Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentInput;
