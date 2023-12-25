import { getMyVotedPostIds } from '@/api/user.api';
import { createWithEqualityFn } from 'zustand/traditional';
import { MeModel, getMe } from '../api/auth.api';

interface IAuthState {
  token: string;
  setToken: (token: string) => void;
  upvotedPostIds: number[];
  downvotedPostIds: number[];
  toggleUpvote: (postId: number) => void;
  toggleDownvote: (postId: number) => void;
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
  upvotedPostIds: [],
  downvotedPostIds: [],
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
      const { upvotedPostIds, downvotedPostIds } = await getMyVotedPostIds();

      if (!me) {
        throw new Error('Invalid token');
      }

      set({ authUser: me, upvotedPostIds, downvotedPostIds });
    } catch (error) {
      console.log('error', error);
      localStorage.removeItem('accessToken');
      set(initialAuthState);
    }
  },
  toggleUpvote: (postId: number) => {
    set((state) => ({
      upvotedPostIds: state.upvotedPostIds.includes(postId)
        ? state.upvotedPostIds.filter((id) => id !== postId)
        : [...state.upvotedPostIds, postId],
    }));
  },
  toggleDownvote: (postId: number) => {
    set((state) => ({
      downvotedPostIds: state.downvotedPostIds.includes(postId)
        ? state.downvotedPostIds.filter((id) => id !== postId)
        : [...state.downvotedPostIds, postId],
    }));
  },
}));
