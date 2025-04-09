import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FcComboChart } from "react-icons/fc";
import { useTheme } from "../../context/ThemeContext";
import { isAuthenticated, logout } from "../../services/authService";
import { FiLogOut } from "react-icons/fi";

export default function Header() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");

  useEffect(() => setMounted(true), []);

  const handleNavClick = (sectionId: string) => {
    setCurrentSection(sectionId);
    setIsMenuOpen(false);

    if(sectionId === "login" || sectionId === "signup") {
      navigate(`/${sectionId}`);
      return;
    }
    
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 text-2xl font-bold text-blue-600 dark:text-blue-400 cursor-pointer"
          onClick={() => {
            if(isAuthenticated()) {
              navigate("/dashboard");
            }
            else {
              navigate("/");
            }
          }}
        >
          <FcComboChart size={30} className="text-blue-500" />
          <span>EdgeLead</span>
        </div>

        {!isAuthenticated() && (<nav className="hidden md:flex space-x-8">
          <div
            onClick={() => handleNavClick("pricing")}
            className={`cursor-pointer transition-colors text-base ${
              currentSection === "pricing"
                ? "text-blue-600 dark:text-blue-400 font-medium"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            Pricing
          </div>
          <div
            onClick={() => handleNavClick("products")}
            className={`cursor-pointer transition-colors text-base ${
              currentSection === "products"
                ? "text-blue-600 dark:text-blue-400 font-medium"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
          >
            Products
          </div>
        </nav>)}

        <div className="flex items-center space-x-5">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>

          {!isAuthenticated() && (<nav className="hidden md:flex space-x-3">
            <div
              onClick={() => handleNavClick("login")}
              className={`cursor-pointer transition-colors text-base ${
                currentSection === "login"
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Login
            </div>
            <div
              onClick={() => handleNavClick("signup")}
              className={`cursor-pointer transition-colors text-base ${
                currentSection === "signup"
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Try for free
            </div>
          </nav>)}

          {!isAuthenticated() && (<button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>)}
        
        {isAuthenticated() && (
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Logout"
          >
            <FiLogOut size={20} />
            <span className="text-base text-gray-700 dark:text-gray-300">Logout</span>
          </button>
        )}
        </div>
      </div>
      
      {isMenuOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-800 py-4 px-6 shadow-lg">
          <div className="flex flex-col space-y-4">
            <div
              onClick={() => handleNavClick("pricing")}
              className={`cursor-pointer transition-colors text-base ${
                currentSection === "pricing"
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Pricing
            </div>
            <div
              onClick={() => handleNavClick("products")}
              className={`cursor-pointer transition-colors text-base ${
                currentSection === "products"
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Products
            </div>

            <div
              onClick={() => handleNavClick("login")}
              className={`cursor-pointer transition-colors text-base ${
                currentSection === "login"
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Login
            </div>
            <div
              onClick={() => handleNavClick("signup")}
              className={`cursor-pointer transition-colors text-base ${
                currentSection === "signup"
                  ? "text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              Try for free
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
