import { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    // Only trigger transition if the path changes
    if (location.pathname !== displayLocation.pathname) {
      setIsTransitioning(true);
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);
  
  useEffect(() => {
    if (transitionStage === 'fadeOut') {
      // Wait for the fade out to complete before changing content
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
      }, 300); // Match this with the CSS transition duration
      
      return () => clearTimeout(timeout);
    }
    
    if (transitionStage === 'fadeIn') {
      // Reset the transitioning state after fade in completes
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [transitionStage, location]);
  
  return (
    <div
      className={`
        transition-all duration-300 ease-in-out
        ${transitionStage === 'fadeIn' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${isTransitioning ? 'pointer-events-none' : ''}
      `}
    >
      {children}
    </div>
  );
};

export default PageTransition; 