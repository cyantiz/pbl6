import Toast from '@/components/Toast';
import { createWithEqualityFn } from 'zustand/traditional';

type IToastState = {
  toastList: Set<Toast>;
  toastIdList: Set<string>;
  show: (toast: Toast) => void;
  close: (toastId: string) => void;
  closeAll: () => void;
};

const useToastStore = createWithEqualityFn<IToastState>((set, get) => ({
  toastList: new Set<Toast>(),
  toastIdList: new Set<string>(),
  show(toast: Toast) {
    const { toastList, toastIdList } = get();
    const newToastList = new Set(toastList);
    const newToastIdList = new Set(toastIdList);

    newToastIdList.add(toast.id);
    newToastList.add(toast);

    set({
      toastList: newToastList,
      toastIdList: newToastIdList,
    });
  },
  close(toastId: string) {
    const { toastIdList } = get();
    const newToastIdList = new Set(toastIdList);

    newToastIdList.delete(toastId);

    set({
      toastIdList: newToastIdList,
    });
    setTimeout(() => {
      const { toastList } = get();
      const newToastList = new Set(toastList);
      for (let toast of newToastList) {
        if (toast.id === toastId) {
          if (!toast.duration) return;
          newToastList.delete(toast);
          break;
        }
      }
      set({
        toastList: newToastList,
      });
    }, 1000);
  },
  closeAll() {
    const newToastList = new Set<Toast>();
    set({
      toastList: newToastList,
    });
  },
}));

export default useToastStore;
