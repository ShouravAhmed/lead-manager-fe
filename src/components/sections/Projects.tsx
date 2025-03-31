// Projects data
const projects = [
  {
    id: 1,
    title: 'CPorBit',
    subtitle: 'Personalized competitive programming mentor',
    description: 'A web-based personalized competitive programming mentor that analyses Codeforces submissions and suggests problems to help users improve their contest ratings using KNN algorithm.',
    technologies: ['DRF', 'Python', 'PostgreSQL', 'React', 'TailwindCSS', 'KNN Algorithm'],
    image: 'cporbit_logo.png',
    link: '#',
    github: 'https://github.com/smhimran/CPorBit'
  },
  {
    id: 2,
    title: 'Green Division',
    subtitle: 'A pathway for beginner problem solvers',
    description: 'This web platform enables growth tracking for beginner problem solvers by utilizing selective problems from Beecrowd to enhance their basic programming concepts.',
    technologies: ['Django', 'Python', 'PostgreSQL', 'HTML', 'CSS', 'JavaScript'],
    image: 'greendivision_logo.jpg',
    link: '#',
    github: 'https://github.com/smhimran/GreenDivision'
  },
  {
    id: 3,
    title: 'ExpenseXpert',
    subtitle: 'Group expense management app',
    description: 'An Android application designed to manage group expenses, especially for events such as group tours, simplifying individual expense calculations.',
    technologies: ['Android', 'Java', 'SQLite', 'Material Design'],
    image: 'expensexpert_logo.jpg',
    link: '#',
    github: 'https://github.com/erfanul007/ExpenseXpert'
  }
];

// Get the base URL from Vite
const baseUrl = import.meta.env.BASE_URL;

const Projects = () => {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
          Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 group"
            >
              {/* Project Image */}
              <div className="h-48 bg-gray-300 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                <img 
                  src={`${baseUrl}${project.image}`} 
                  alt={`${project.title} logo`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'flex items-center justify-center w-full h-full';
                      fallback.innerHTML = `
                        <svg class="w-16 h-16 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      `;
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                  {project.subtitle}
                </p>
                
                {/* Description with truncation and hover effect */}
                <div className="relative mb-4">
                  <p className="text-gray-700 dark:text-gray-300 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                    {project.description}
                  </p>
                  {project.description.length > 100 && (
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-gray-50 dark:from-gray-800 to-transparent group-hover:opacity-0 transition-opacity duration-300"></div>
                  )}
                </div>
                
                {/* Technologies with improved display */}
                <div className="relative mb-4">
                  <div className="flex flex-wrap gap-2 overflow-hidden transition-all duration-300" style={{ maxHeight: '28px' }}>
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full group-hover:hidden">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  
                  {/* Additional technologies that show on project hover */}
                  <div className="flex flex-wrap gap-2 mt-2 h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                    {project.technologies.slice(3).map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Links */}
                <div className="flex space-x-4">
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                      <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    Demo
                  </a>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 