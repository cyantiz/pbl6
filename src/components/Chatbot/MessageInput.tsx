import { IChatbotMessageModel } from '@/api/chatbot.api';
import { SendOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { FC } from 'react';

export type MessageInputProps = {
  onSend: (message: IChatbotMessageModel) => void;
};

const MessageInput: FC<MessageInputProps> = ({ onSend }) => {
  const [form] = Form.useForm<{
    message: string;
  }>();

  return (
    <Form
      form={form}
      className="flex !p-2 gap-3 items-center"
      onFinish={() => {
        if (!form.getFieldValue('message')) return;

        const newMessage: IChatbotMessageModel = {
          text: form.getFieldValue('message'),
          fromBot: false,
          date: new Date(),
        };

        onSend(newMessage);
        form.resetFields();
      }}
    >
      <Form.Item className="!m-0 w-full" name="message">
        <Input placeholder="Ask me anything!" />
      </Form.Item>
      <Form.Item className="!m-0">
        <Button type="primary" htmlType="submit">
          <SendOutlined />
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MessageInput;
