import { useNavigation } from '../../context/NavigationContext';

const SectionNavigation = () => {
  const { navigateToNextSection, navigateToPrevSection, currentSection, sections } = useNavigation();
  
  const currentIndex = sections.findIndex(s => s.id === currentSection);
  const isFirstSection = currentIndex === 0;
  const isLastSection = currentIndex === sections.length - 1;
  
  // Get next and previous section names for labels
  const nextSectionName = !isLastSection ? sections[currentIndex + 1].name : null;
  const prevSectionName = !isFirstSection ? sections[currentIndex - 1].name : null;
  
  return (
    <>
      {/* Previous Section Button (Left) */}
      <button
        onClick={navigateToPrevSection}
        disabled={isFirstSection}
        className={`fixed left-6 top-1/2 transform -translate-y-1/2 z-40 group ${
          isFirstSection ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 transition-transform'
        }`}
        aria-label={prevSectionName ? `Go to ${prevSectionName}` : 'No previous section'}
      >
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-full p-3">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-blue-600 dark:text-blue-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
        {prevSectionName && (
          <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-md whitespace-nowrap">
            {prevSectionName}
          </span>
        )}
      </button>
      
      {/* Next Section Button (Right) */}
      <button
        onClick={navigateToNextSection}
        disabled={isLastSection}
        className={`fixed right-6 top-1/2 transform -translate-y-1/2 z-40 group ${
          isLastSection ? 'opacity-30 cursor-not-allowed' : 'hover:scale-110 transition-transform'
        }`}
        aria-label={nextSectionName ? `Go to ${nextSectionName}` : 'No next section'}
      >
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-full p-3">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-blue-600 dark:text-blue-400" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
        {nextSectionName && (
          <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-md whitespace-nowrap">
            {nextSectionName}
          </span>
        )}
      </button>
    </>
  );
};

export default SectionNavigation; 