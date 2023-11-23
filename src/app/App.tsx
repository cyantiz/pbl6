import AsyncErrorBoundary from '@/components/AsyncErrorBoundary';
import ToastContainer from '@/components/ToastContainer';
import Auth from '@/layout/Auth';
import Default from '@/layout/Default';
import CategoryList from '@/pages/category-list';
import HomePage from '@/pages/homepage';
import Login from '@/pages/login';
import Playground from '@/pages/playground';
import PostPage from '@/pages/post/[_id]';
import PostListPage from '@/pages/posts';
import Register from '@/pages/register';
import { useAuthStore } from '@/store';
import { customTheme } from '@/theme/customFlowbite';
import { Flowbite } from 'flowbite-react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { shallow } from 'zustand/shallow';

const queryClient = new QueryClient();

function App() {
  const { token } = useAuthStore(
    (store) => ({
      token: store.token,
    }),
    shallow,
  );

  return (
    <Flowbite theme={{ theme: customTheme }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <AsyncErrorBoundary>
            <Routes>
              {/* Auth layout pages */}
              {!token?.length && (
                <Route path="/auth" element={<Auth />}>
                  <Route index path="login" element={<Login />} />
                  <Route index path="register" element={<Register />} />
                </Route>
              )}

              {/* Default layout pages */}
              <Route path="/" element={<Default />}>
                <Route index path="/" element={<HomePage />} />
                <Route path="/category-list" element={<CategoryList />} />
                <Route path="/post/:_id" element={<PostPage />} />
                <Route path="/posts" element={<PostListPage />} />
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
