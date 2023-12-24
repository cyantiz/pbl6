import { createWithEqualityFn } from 'zustand/traditional';
import { MeModel, getMe } from '../api/auth.api';

interface IAuthState {
  token: string;
  setToken: (token: string) => void;
  authUser: MeModel;
  clear: () => void;
  persistAuth: () => void;
}

const initialAuthState: Pick<IAuthState, 'token' | 'authUser'> = {
  token: '',
  authUser: {} as MeModel,
};

export const useAuthStore = createWithEqualityFn<IAuthState>((set) => ({
  ...initialAuthState,
  token: localStorage.getItem('accessToken') ?? '',
  clear: () => {
    localStorage.removeItem('accessToken');
    set(initialAuthState);
  },
  setToken: async (token: string) => {
    localStorage.setItem('accessToken', token);
    console.log('accessToken', token);
    try {
      const authUser = await getMe();
      set({ token, authUser });
    } catch (error) {
      console.log('error', error);
      localStorage.removeItem('accessToken');
      set(initialAuthState);
    }
  },
  persistAuth: async () => {
    if (!localStorage.getItem('accessToken')) return;

    try {
      const me = await getMe();

      if (!me) {
        throw new Error('Invalid token');
      }

      set({ authUser: me });
    } catch (error) {
      console.log('error', error);
      localStorage.removeItem('accessToken');
      set(initialAuthState);
    }
  },
}));
