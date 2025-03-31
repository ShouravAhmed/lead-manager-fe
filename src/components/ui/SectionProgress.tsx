import { useNavigation } from '../../context/NavigationContext';
import { useEffect, useState } from 'react';

const SectionProgress = () => {
  const { currentSection, navigateToSection, sections } = useNavigation();
  const currentIndex = sections.findIndex(s => s.id === currentSection);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle screen resize to detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Handle scroll events to hide progress bar when near footer
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Only hide on mobile or when very close to bottom on desktop
      if (isMobile) {
        // For mobile, use a larger threshold to avoid overlapping with footer
        const footerHeight = 200;
        const isNearFooter = scrollY + viewportHeight > documentHeight - footerHeight;
        
        setIsVisible(!isNearFooter);
      } else {
        // For desktop, only hide when extremely close to bottom
        const desktopThreshold = 50;
        const isVeryCloseToBottom = scrollY + viewportHeight > documentHeight - desktopThreshold;
        
        setIsVisible(!isVeryCloseToBottom);
      }
      
      setLastScrollY(scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isMobile]);
  
  return (
    <div 
      className={`fixed left-1/2 transform -translate-x-1/2 z-40 transition-all duration-300 ${
        isVisible 
          ? 'bottom-4 opacity-100' 
          : 'bottom-[-50px] opacity-0'
      }`}
    >
      <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 rounded-full shadow-lg px-3 py-1.5 border border-gray-200 dark:border-gray-700">
        {sections.map((section, index) => (
          <div key={section.id} className="relative">
            {/* Button with dot indicator */}
            <button
              onClick={() => navigateToSection(section.id)}
              className="group relative p-1.5"
              aria-label={`Go to ${section.name}`}
            >
              <div 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 dark:bg-blue-400 scale-125' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-blue-400 dark:hover:bg-blue-500'
                }`}
              />
              
              {/* Section name tooltip */}
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-md whitespace-nowrap border border-gray-200 dark:border-gray-700">
                {section.name}
              </span>
            </button>
            
            {/* Line connecting dots */}
            {index < sections.length - 1 && (
              <div className="absolute top-1/2 left-full w-3 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
            )}
            
            {/* Current section indicator */}
            {index === currentIndex && (
              <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionProgress; 