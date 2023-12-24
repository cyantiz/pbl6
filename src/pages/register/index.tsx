import { useAuthStore } from '@/store';
import { register } from '@api/auth.api';

import { ArrowLeftOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

interface IFormInputs {
  email: string;
  password: string;
  confirm: string;
  name: string;
  username: string;
}

const RegisterPage = () => {
  const [form] = Form.useForm();

  const { setToken } = useAuthStore((store) => ({
    setToken: store.setToken,
  }));

  const { mutate, isLoading } = useMutation(
    () => {
      const values = form.getFieldsValue();
      return register({
        email: values.email,
        password: values.password,
        name: values.name,
        username: values.username,
      });
    },
    {
      onSuccess: (data) => {
        console.log(data);
        setToken(data.accessToken);
      },
      onError: (error) => {
        Promise.reject(error);
      },
    },
  );

  return (
    <div className="flex w-full flex-col gap-4 max-w-lg mx-auto">
      <div>
        <Link to="/auth/login" className="text-blue-500">
          <ArrowLeftOutlined /> Back to login
        </Link>
      </div>
      <h1 className="font-bold text-5xl lg:text-6xl font-playfair mb-4">Sign up</h1>

      <Form form={form} name="register" onFinish={mutate}>
        <Form.Item name="name" rules={[{ required: true, message: 'Fullname is require' }]}>
          <Input prefix={<UserOutlined />} placeholder="Full Name" />
        </Form.Item>

        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'username is require' },
            {
              pattern: /^[a-zA-Z0-9_]{6,20}$/,
              message: 'Username must be 6-20 characters, letters, numbers, and underscores only',
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="@username" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { type: 'email', message: 'Must be a valid email' },
            { required: true, message: 'Email is required' },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { min: 8, message: 'Password must have at least 8 characters' },
            {
              max: 32,
              message: 'Password must have at most 32 characters',
            },
            { required: true, message: 'Password is required' },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please type your password again' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('Passwords do not match');
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
