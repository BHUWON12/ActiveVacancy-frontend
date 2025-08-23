import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import VisaJobs from './pages/VisaJobs';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/admin/AdminLogin';
import AdminPanel from './components/Admin/AdminPanel';
import AdminAuthGuard from './components/Auth/AdminAuthGuard';
import Terms from './pages/Terms';
import FAQ from './pages/FAQ';
import Testimonials from './pages/Testimonials';
import PrivacyPolicy from './pages/PrivacyPolicy';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">{this.state.error?.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function AppContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/visajobs" element={<VisaJobs />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/*"
              element={
                <AdminAuthGuard>
                  <AdminPanel />
                </AdminAuthGuard>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <ToastProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </ToastProvider>
      </AppProvider>
    </ErrorBoundary>
  );
}
