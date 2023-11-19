import useToastStore from '@/store/toastStore';
import { FC } from 'react';
import { shallow } from 'zustand/shallow';
import Toast from './Toast';

type Props = {};

const ToastContainer: FC<Props> = ({}) => {
  const { toastList } = useToastStore(
    (store) => ({
      toastList: store.toastList,
    }),
    shallow,
  );

  return (
    <>
      {Array.from(toastList).map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </>
  );
};

export default ToastContainer;
