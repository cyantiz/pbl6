import configs from '@/configs';
import useToastStore from '@/store/toastStore';
import * as cn from 'classnames';
import { Toast as FlowbiteToast } from 'flowbite-react';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { shallow } from 'zustand/shallow';

export type ToasterStatus = 'success' | 'error' | 'warning' | 'info';
export type Toast = {
  id: string;
  content: string;
  status?: ToasterStatus;
  duration?: number;
  role?: string;
};

type Props = Toast & {
  className?: string;
};

const statusToastClassNameMap: Record<ToasterStatus, string> = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-500 text-white',
};
const statusToastTriggerClassNameMap: Record<ToasterStatus, string> = {
  success: '!bg-green-500 !text-white !outline-none !ring-0',
  error: '!bg-red-500 !text-white !outline-none !ring-0',
  warning: '!bg-yellow-500 !text-white !outline-none !ring-0',
  info: '!bg-blue-500 !text-white !outline-none !ring-0',
};

export const Toast: FC<Props> = ({
  id,
  content,
  className,
  role,
  status = 'success',
  duration = configs.TOAST_DEFAULT_DURATION,
}) => {
  const { toastIdList, close } = useToastStore(
    (store) => ({
      toastIdList: store.toastIdList,
      close: store.close,
    }),
    shallow,
  );
  const isShown = toastIdList.has(id);

  useEffect(() => {
    if (!duration || !isShown) {
      return;
    }
    const timeoutId = setTimeout(() => {
      close(id);
    }, duration);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [id, isShown, duration, close]);

  return createPortal(
    <AnimatePresence>
      {isShown && (
        <motion.div
          key={id}
          layout
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.5,
          }}
          className={cn('toast', className)}
          role={role}
        >
          <FlowbiteToast className={cn(statusToastClassNameMap[status], [])} title={content}>
            {content}
            <FlowbiteToast.Toggle className={cn(statusToastTriggerClassNameMap[status])} />
          </FlowbiteToast>
        </motion.div>
      )}
    </AnimatePresence>,
    document.querySelector('#toasts-portal') as HTMLElement,
  );
};

export default Toast;
