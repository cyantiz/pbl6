import { login } from '@/services/auth.service';
import { useAuthStore } from '@/store';
import { Button, Label, TextInput } from 'flowbite-react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

type Props = {};

interface IFormInputs {
  username: string;
  password: string;
}

const LoginPage: FC<Props> = ({}) => {
  const { setToken } = useAuthStore((store) => ({
    setToken: store.setToken,
  }));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit = (data: IFormInputs) => mutateLogin(data);

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
    <form className="flex w-full flex-col gap-4 max-w-lg mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="greeting flex flex-col items-center mb-6">
        <h1 className="font-bold text-9xl font-smooch leading-[92px]">Welcome</h1>
        <p className="text-md">We are glad to see you back with us</p>
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username1" value="Username" className="font-bold" />
        </div>
        <TextInput
          id="username1"
          type="text"
          placeholder="@username"
          required
          {...register('username', {
            required: true,
            pattern: /^[a-zA-Z0-9]{5,}$/,
          })}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" className="font-bold" />
        </div>
        <TextInput
          id="password1"
          type="password"
          required
          {...register('password', {
            required: true,
            pattern: /^.{8,}$/,
          })}
        />
      </div>
      <div className="text-red-500">
        <div>
          {errors.username && errors.username.type === 'required' && 'Username is required'}
        </div>
        <div>
          {errors.username && errors.username.type === 'pattern' && 'Username is not valid'}
        </div>
        <div>
          {errors.password && errors.password.type === 'required' && 'Password is required'}
        </div>
        <div>
          {errors.password &&
            errors.password.type === 'pattern' &&
            'Password must be at least 8 characters long, contain at least one number and one special character'}
        </div>
      </div>
      <Button type="submit" isProcessing={isLoadingLogin} color="dark">
        Submit
      </Button>

      <div>
        Haven't registered yet?
        <Link to="/auth/register" className="text-blue-500">
          Click here
        </Link>
      </div>
    </form>
  );
};

export default LoginPage;
