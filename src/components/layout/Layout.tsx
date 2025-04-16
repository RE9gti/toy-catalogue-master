
import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SiteNavigation from './SiteNavigation';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const showBreadcrumbs = location.pathname !== '/'; // Don't show breadcrumbs on homepage
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {showBreadcrumbs && <SiteNavigation />}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
