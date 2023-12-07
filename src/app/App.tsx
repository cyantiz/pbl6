import AsyncErrorBoundary from '@/components/AsyncErrorBoundary';
import ToastContainer from '@/components/ToastContainer';
import Auth from '@/layout/Auth';
import Default from '@/layout/Default';
import CategoryListPage from '@/pages/category-list';
import CreatePostPage from '@/pages/create-post';
import HomePage from '@/pages/homepage';
import LoginPage from '@/pages/login';
import Playground from '@/pages/playground';
import PostListPage from '@/pages/posts';
import PostDetailPage from '@/pages/posts/[_slug]';
import PostListByCategoryPage from '@/pages/posts/by-category';
import TrendingPostsPage from '@/pages/posts/trending';
import RegisterPage from '@/pages/register';
import { useAuthStore } from '@/store';
import { customTheme } from '@/theme/customFlowbite';
import { Flowbite } from 'flowbite-react';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

const queryClient = new QueryClient();

function App() {
  const { token, persistAuth } = useAuthStore(
    (store) => ({
      token: store.token,
      persistAuth: store.persistAuth,
    }),
    shallow,
  );

  useEffect(() => {
    persistAuth();
  }, []);

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AsyncErrorBoundary>
            <Routes>
              {/* Auth layout pages */}
              {!token?.length && (
                <Route path="/auth" element={<Auth />}>
                  <Route index path="login" element={<LoginPage />} />
                  <Route index path="register" element={<RegisterPage />} />
                </Route>
              )}

              {/* Default layout pages */}
              <Route path="/" element={<Default />}>
                <Route index path="/" element={<HomePage />} />
                <Route path="/category-list" element={<CategoryListPage />} />
                <Route path="/posts/:_slug" element={<PostDetailPage />} />
                <Route path="/posts" element={<PostListPage />} />
                <Route path="/posts/by-category" element={<PostListByCategoryPage />} />
                <Route path="/posts/trending" element={<TrendingPostsPage />} />
                <Route path="/create-post" element={<CreatePostPage />} />
              </Route>

              <Route path="/playground" element={<Playground />} />

              {/* Redirect unknown page to default page */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </AsyncErrorBoundary>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </Flowbite>
  );
}

export default App;
