import { useState, useEffect } from 'react';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ToastProvider } from './components/common/Toast';
import { LanguageProvider } from './lib/LanguageContext';
import { CustomCursor } from './components/common/CustomCursor';
import { NoiseOverlay } from './components/common/NoiseOverlay';

export function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    if (currentPath === '/' || currentPath === '' || currentPath.startsWith('/#')) {
      return <HomePage />;
    }
    if (currentPath === '/admin' || currentPath === '/admin/') {
      return <AdminPage />;
    }
    return <NotFoundPage />;
  };

  return (
    <LanguageProvider>
      <ToastProvider>
        <NoiseOverlay />
        <CustomCursor />
        {renderPage()}
      </ToastProvider>
    </LanguageProvider>
  );
}

export default App;
