import { register as sendRegisterRequest } from '@/services/auth.service';
import { useAuthStore } from '@/store';
import { Button, Label, TextInput } from 'flowbite-react';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Link } from 'react-router-dom';

type Props = {};

interface IFormInputs {
  email: string;
  password: string;
  passwordAgain: string;
  name: string;
}

const Register: FC<Props> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const { setToken } = useAuthStore((store) => ({
    setToken: store.setToken,
  }));

  const onSubmit = (data: IFormInputs) => mutateRegister(data);

  const { mutate: mutateRegister, isLoading: isLoadingRegister } = useMutation(
    async (formData: IFormInputs) =>
      sendRegisterRequest({
        email: formData.email,
        password: formData.password,
        name: formData.name,
      }),
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
    <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Link to="/auth/login" className="text-blue-500">
          Back to login
        </Link>
      </div>
      <h1 className="font-bold text-8xl font-smooch leading-[92px]">Sign up</h1>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Full Name" />
        </div>
        <TextInput
          id="name"
          type="text"
          placeholder="John Doe"
          required
          {...register('name', {
            required: true,
          })}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="your_email@domain.com"
          required
          {...register('email', {
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          })}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput
          id="password1"
          type="password"
          required
          {...register('password', {
            required: true,
            pattern: /^[a-zA-Z0-9]{8,}$/,
          })}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2" value="Enter your password again" />
        </div>
        <TextInput
          id="password2"
          type="password"
          required
          {...register('passwordAgain', {
            required: true,
            validate: (value) => value === 'password1',
          })}
        />
      </div>
      <div className="text-red-500">
        {errors.name && errors.name.type === 'required' && 'Last name is required'}
        {errors.email && errors.email.type === 'required' && 'Email is required'}
        {errors.email && errors.email.type === 'pattern' && 'Email is not valid'}
        {errors.password && errors.password.type === 'required' && 'Password is required'}
        {errors.password &&
          errors.password.type === 'pattern' &&
          'Password must be at least 8 characters long'}
        {errors.passwordAgain && errors.passwordAgain.type === 'required' && 'Password is required'}
        {errors.passwordAgain && errors.passwordAgain.type === 'validate' && 'Passwords must match'}
      </div>
      <Button type="submit" isProcessing={isLoadingRegister}>
        Submit
      </Button>
    </form>
  );
};

export default Register;
