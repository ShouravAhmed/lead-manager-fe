import { ReactNode, useEffect, useState } from 'react';
import Header from './Header';
import PageTransition from '../ui/PageTransition';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Track page transitions
  useEffect(() => {
    // Set transitioning state when location changes
    setIsTransitioning(true);
    
    // Reset transitioning state after animation completes
    const timeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 600); // Slightly longer than the transition duration to ensure completion
    
    return () => clearTimeout(timeout);
  }, [location.pathname]);
  
  
  return (
    <div className={`flex flex-col h-screen overflow-hidden bg-white dark:bg-gray-900 ${isTransitioning ? 'page-transitioning' : ''}`}>
      <Header />
      <main className="flex-grow overflow-auto pt-20">
      <PageTransition>
        <div className="page-content">
        {children}
        </div>
      </PageTransition>
      </main>
    </div>
  );
};

export default Layout; 