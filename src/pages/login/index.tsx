import { login } from '@/services/auth.service';
import { useAuthStore } from '@/store';
import { ArrowRightOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { FC } from 'react';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
type Props = {};

interface IFormInputs {
  username: string;
  password: string;
}

const LoginPage: FC<Props> = ({}) => {
  const { setToken } = useAuthStore((store) => ({
    setToken: store.setToken,
  }));

  const onSubmit = (data: IFormInputs) => mutateLogin(data);
  const onSubmitFailed = (error: any) => {
    Swal.fire({
      title: 'Error!',
      text: error.message,
      icon: 'error',
      confirmButtonText: 'Ok',
    });
  };
  const { mutate: mutateLogin, isLoading: isLoadingLogin } = useMutation(login, {
    onSuccess: (data) => {
      console.log(data);
      setToken(data.accessToken);
    },
    onError: (error) => {
      Promise.reject(error);
    },
  });

  return (
    <div className="flex w-full flex-col gap-4 max-w-lg mx-auto">
      <div className="greeting flex flex-col items-center mb-6">
        <h1 className="font-bold text-9xl font-smooch leading-[92px]">Welcome</h1>
        <p className="text-lg">We are glad to see you back,</p>
      </div>
      <Form
        name="basic"
        layout="vertical"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        onFinishFailed={onSubmitFailed}
        autoComplete="off"
      >
        <Form.Item<string>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input size="large" prefix={<UserOutlined />} placeholder="@username" />
        </Form.Item>

        <Form.Item<string>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password size="large" prefix={<LockOutlined />} placeholder="••••••••••" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large" loading={isLoadingLogin}>
            Login
          </Button>
        </Form.Item>
      </Form>

      <div className="w-full gap-1 flex items-center flex-col">
        Haven't registered yet?
        <Link to="/auth/register" className="text-blue-500">
          <ArrowRightOutlined /> Click here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
