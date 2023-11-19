import { createWithEqualityFn } from 'zustand/traditional';
import { AuthPayload, decodeAuthTokenPayload } from '../services/auth.service';

interface IAuthState {
  token: string;
  setToken: (token: string) => void;
  authUser: AuthPayload;
  clear: () => void;
}

const initialAuthState: IAuthState = {
  token: '',
  setToken: () => {},
  authUser: {} as AuthPayload,
  clear: () => {},
};

export const useAuthStore = createWithEqualityFn<IAuthState>((set) => ({
  ...initialAuthState,
  token: localStorage.getItem('accessToken') ?? '',
  setToken: (token: string) => {
    localStorage.setItem('token', token);
    console.log('token', token);
    const authUser =
      decodeAuthTokenPayload({
        token,
      }) ?? {};

    set({ token, authUser });
  },
  clear: () => {
    localStorage.removeItem('token');
    set(initialAuthState);
  },
}));
