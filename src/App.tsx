import React, { useEffect, Component } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
// Public Layout Components
import { BlogNav } from './components/BlogNav';
import { BlogFooter } from './components/BlogFooter';
import { FloatingActions } from './components/FloatingActions';
// Public Pages
import { BlogHome } from './pages/BlogHome';
import { CategoryPage } from './pages/CategoryPage';
import { SinglePost } from './pages/SinglePost';
import { AuthorPage } from './pages/AuthorPage';
import { SearchResults } from './pages/SearchResults';
import { TagPage } from './pages/TagPage';
import { AboutPage } from './pages/AboutPage';
import { PartnersPage } from './pages/PartnersPage';
import { TeamPage } from './pages/TeamPage';
import { ContactPage } from './pages/ContactPage';
import { VideoFeed } from './pages/VideoFeed';
import { GalleryPage } from './pages/GalleryPage';
import { GalleryDetail } from './pages/GalleryDetail';
import { MousePlayground } from './pages/MousePlayground';
import { EditorPlayground } from './pages/EditorPlayground';
// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
// Admin Layout & Pages
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminVideos } from './pages/admin/AdminVideos';
import { AdminArticles } from './pages/admin/AdminArticles';
import { AdminArticleEditor } from './pages/admin/AdminArticleEditor';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminGallery } from './pages/admin/AdminGallery';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminHandbook } from './pages/admin/AdminHandbook';
import { AdminBrandVoice } from './pages/admin/AdminBrandVoice';
import { AdminSettings } from './pages/admin/AdminSettings';
import { AdminAnalytics } from './pages/admin/AdminAnalytics';
import { AdminTeam } from './pages/admin/AdminTeam';
// Creator Layout & Pages
import { CreatorLayout } from './components/creator/CreatorLayout';
import { CreatorDashboard } from './pages/creator/CreatorDashboard';
import { CreatorVideos } from './pages/creator/CreatorVideos';
import { CreatorVideoUpload } from './pages/creator/CreatorVideoUpload';
import { CreatorArticles } from './pages/creator/CreatorArticles';
import { CreatorArticleEditor } from './pages/creator/CreatorArticleEditor';
import { CreatorAnalytics } from './pages/creator/CreatorAnalytics';
import { CreatorEarnings } from './pages/creator/CreatorEarnings';
import { CreatorProfile } from './pages/creator/CreatorProfile';
import { CreatorSettings } from './pages/creator/CreatorSettings';
// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
// Public Layout Wrapper
function PublicLayout({ children }: {children: React.ReactNode;}) {
  return (
    <div className="flex flex-col min-h-screen font-body text-text-secondary bg-gray-50 relative">
      <BlogNav />
      <div className="flex-grow">{children}</div>
      <BlogFooter />
      <FloatingActions />
    </div>);

}
export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
            <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }>

            <Route index element={<AdminDashboard />} />
            <Route path="videos" element={<AdminVideos />} />
            <Route path="articles" element={<AdminArticles />} />
            <Route path="articles/new" element={<AdminArticleEditor />} />
            <Route path="articles/edit/:id" element={<AdminArticleEditor />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="handbook" element={<AdminHandbook />} />
            <Route path="brand-voice" element={<AdminBrandVoice />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="team" element={<AdminTeam />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Pro Editor - Unwrapped */}
          <Route
            path="/pro-editor"
            element={
              <ProtectedRoute allowedRoles={['admin', 'creator']}>
                <EditorPlayground />
              </ProtectedRoute>
            }
          />

          {/* Creator Routes */}
          <Route
            path="/creator"
            element={
            <ProtectedRoute allowedRoles={['creator']}>
                <CreatorLayout />
              </ProtectedRoute>
            }>

            <Route index element={<CreatorDashboard />} />
            <Route path="videos" element={<CreatorVideos />} />
            <Route path="upload" element={<CreatorVideoUpload />} />
            <Route path="articles" element={<CreatorArticles />} />
            <Route path="write" element={<CreatorArticleEditor />} />
            <Route path="write/:id" element={<CreatorArticleEditor />} />
            <Route path="analytics" element={<CreatorAnalytics />} />
            <Route path="earnings" element={<CreatorEarnings />} />
            <Route path="profile" element={<CreatorProfile />} />
            <Route path="settings" element={<CreatorSettings />} />
          </Route>

          {/* Public Routes */}
          <Route
            path="/*"
            element={
            <PublicLayout>
                <Routes>
                  <Route path="/" element={<BlogHome />} />
                  <Route path="/category/:slug" element={<CategoryPage />} />
                  <Route path="/post/:slug" element={<SinglePost />} />
                  <Route path="/author/:username" element={<AuthorPage />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/tag/:tag" element={<TagPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/team" element={<TeamPage />} />
                  <Route path="/partners" element={<PartnersPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/videos" element={<VideoFeed />} />
                  <Route path="/gallery" element={<GalleryPage />} />
                  <Route path="/gallery/:slug" element={<GalleryDetail />} />
                  <Route path="/playground" element={<MousePlayground />} />
                  <Route path="*" element={<BlogHome />} />
                </Routes>
              </PublicLayout>
            } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>);

}