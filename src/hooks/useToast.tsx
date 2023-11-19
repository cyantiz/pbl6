import useToastStore from '@/store/toastStore';
import { shallow } from 'zustand/shallow';

export function useToast() {
  const toastControl = useToastStore(
    (store) => ({
      show: store.show,
      close: store.close,
      closeAll: store.closeAll,
    }),
    shallow,
  );
  return toastControl;
}
