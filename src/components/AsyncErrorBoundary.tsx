import { useToast } from '@/hooks/useToast';
import { FC, PropsWithChildren, useEffect } from 'react';
import { v4 } from 'uuid';
import configs from '../configs';

const AsyncErrorBoundary: FC<PropsWithChildren> = ({ children }) => {
  const { show } = useToast();

  useEffect(() => {
    window.addEventListener(
      'unhandledrejection',
      function (event) {
        event.promise.catch((error) => {
          delete error.stack;

          console.log('unhandled rejection', error);

          const errorMessage = error?.response?.data?.error ?? error?.message;

          if (!errorMessage) {
            show({
              id: v4(),
              content: 'Something went wrong',
              status: 'error',
              duration: configs.TOAST_DEFAULT_DURATION,
            });
            return;
          }

          show({
            id: v4(),
            content: errorMessage,
            status: 'error',
            duration: configs.TOAST_DEFAULT_DURATION,
          });
        });
      },
      false,
    );

    return () => {
      window.removeEventListener('unhandledrejection', () => {});
    };
  }, [show]);

  return <>{children}</>;
};

export default AsyncErrorBoundary;
