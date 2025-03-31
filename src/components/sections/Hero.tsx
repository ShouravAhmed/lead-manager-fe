import { useNavigation } from '../../context/NavigationContext';
import { useState, useEffect } from 'react';

// Get the base URL from Vite
const baseUrl = import.meta.env.BASE_URL;

const Hero = () => {
  const { navigateToSection } = useNavigation();
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = [
    'Software Engineer',
    '.NET Developer',
    'Competitive Programmer',
    'AI Enthusiast'
  ];

  useEffect(() => {
    const handleTyping = () => {
      const currentIndex = loopNum % titles.length;
      const fullText = titles[currentIndex];

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      // Set typing speed
      if (isDeleting) {
        setTypingSpeed(80); // Faster when deleting
      } else {
        setTypingSpeed(150); // Normal speed when typing
      }

      // If completed typing the word
      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500); // Wait before starting to delete
      } 
      // If deleted the word
      else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Pause before typing next word
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, titles]);

  return (
    <section id="home" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Md Erfanul Islam Bhuiyan
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-600 dark:text-blue-400 h-10">
              <span className="typewriter">{displayText}</span>
              <span className="cursor-blink">|</span>
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-lg">
              Experienced .NET Developer with 3+ years of expertise in creating scalable applications using .NET 8, C#, Azure, and AWS. Focused on developing AI-powered solutions to enhance performance, security, and efficiency.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => navigateToSection('contact')}
                className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Contact Me
              </button>
              <button 
                onClick={() => navigateToSection('projects')}
                className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-md hover:bg-blue-600 hover:text-white dark:hover:text-white transition-colors"
              >
                View Projects
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl border-4 border-white dark:border-gray-800">
              {/* Erfan's profile image with fallback */}
              <img 
                src={`${baseUrl}profile-erfan.jpg`} 
                alt="Md Erfanul Islam Bhuiyan" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // If image fails to load, show a fallback
                  const target = e.target as HTMLImageElement;
                  target.onerror = null; // Prevent infinite loop
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.classList.add('bg-blue-100', 'dark:bg-blue-900', 'flex', 'items-center', 'justify-center');
                    const initials = document.createElement('span');
                    initials.textContent = 'EIB';
                    initials.className = 'text-4xl font-bold text-blue-600 dark:text-blue-400';
                    parent.appendChild(initials);
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 