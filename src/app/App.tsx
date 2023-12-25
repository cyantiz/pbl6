import AppCurtain from '@/components/AppCurtain';
import AsyncErrorBoundary from '@/components/AsyncErrorBoundary';
import ToastContainer from '@/components/ToastContainer';
import AdminLayout from '@/layout/Admin';
import Auth from '@/layout/Auth';
import Default from '@/layout/Default';
import AdminEditorManagementPage from '@/pages/admin/accounts/edtiors';
import AdminAccountGraphPage from '@/pages/admin/accounts/graph';
import AdminUserManagementPage from '@/pages/admin/accounts/users';
import CategoryListPage from '@/pages/category-list';
import CreatePostPage from '@/pages/create-post';
import HomePage from '@/pages/homepage';
import LoginPage from '@/pages/login';
import Playground from '@/pages/playground';
import PostListPage from '@/pages/posts';
import PostDetailPage from '@/pages/posts/[_slug]';
import PostListByCategoryPage from '@/pages/posts/by-category';
import PostListBySearchPage from '@/pages/posts/by-search';
import HotNewsPostsPage from '@/pages/posts/hot-news';
import MyPostsPage from '@/pages/posts/mine';
import RegisterPage from '@/pages/register';
import { useAuthStore } from '@/store';
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';
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
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
      }}
    >
      <StyleProvider hashPriority="high">
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <AsyncErrorBoundary>
              <AppCurtain />
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
                  <Route path="/posts/mine" element={<MyPostsPage />} />
                  <Route path="/posts/by-category" element={<PostListByCategoryPage />} />
                  <Route path="/posts/by-search" element={<PostListBySearchPage />} />
                  <Route path="/posts/hot-news" element={<HotNewsPostsPage />} />
                  <Route path="/create-post" element={<CreatePostPage />} />
                </Route>

                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<></>} />
                  <Route path="/admin/accounts/users" element={<AdminUserManagementPage />} />
                  <Route path="/admin/accounts/editors" element={<AdminEditorManagementPage />} />
                  <Route path="/admin/accounts/graph" element={<AdminAccountGraphPage />} />
                </Route>
                <Route path="/playground" element={<Playground />} />

                {/* Redirect unknown page to default page */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </AsyncErrorBoundary>
          </BrowserRouter>
          <ToastContainer />
        </QueryClientProvider>
      </StyleProvider>
    </ConfigProvider>
  );
}

export default App;
