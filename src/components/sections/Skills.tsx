import { useState } from 'react';

// Skills data
const skillCategories = [
  {
    id: 1,
    name: 'Programming Languages',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    ),
    skills: [
      { name: 'C#', level: 95 },
      { name: 'C/C++', level: 90 },
      { name: 'Python', level: 85 },
      { name: 'JavaScript', level: 80 },
      { name: 'TypeScript', level: 75 },
      { name: 'Java', level: 70 }
    ]
  },
  {
    id: 2,
    name: 'Backend Technologies',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
      </svg>
    ),
    skills: [
      { name: '.NET', level: 95 },
      { name: 'Django', level: 80 },
      { name: 'Node.js', level: 75 },
      { name: 'EF Core', level: 90 },
      { name: 'Dapper', level: 85 },
      { name: 'CQRS', level: 85 }
    ]
  },
  {
    id: 3,
    name: 'Cloud & DevOps',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.5 16a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 16h-8z" />
      </svg>
    ),
    skills: [
      { name: 'Azure', level: 90 },
      { name: 'AWS', level: 80 },
      { name: 'Docker', level: 75 },
      { name: 'Git', level: 90 },
      { name: 'Microsoft Graph API', level: 80 },
      { name: 'Linux', level: 75 }
    ]
  },
  {
    id: 4,
    name: 'Frontend & Database',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
      </svg>
    ),
    skills: [
      { name: 'React', level: 80 },
      { name: 'Angular', level: 75 },
      { name: 'MS SQL', level: 90 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'SQLite', level: 80 },
      { name: 'TailwindCSS', level: 85 }
    ]
  }
];

// Competitive programming achievements
const competitiveProgramming = [
  {
    id: 1,
    competition: 'DIU Intra University Programming Contest 2021',
    achievement: 'Champion'
  },
  {
    id: 2,
    competition: 'Codeforces',
    achievement: 'Expert (Max Rating: 1623)'
  },
  {
    id: 3,
    competition: 'ICPC Dhaka Regional 2020',
    achievement: 'Participant (Team: DIU_Tr0jAnZ)'
  },
  {
    id: 4,
    competition: 'DIU Take-off Programming Contest, Summer 2018',
    achievement: '9th Place'
  }
];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  
  // Get the active category data
  const activeCategoryData = skillCategories.find(cat => cat.id === activeCategory);
  
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
          Skills & Achievements
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Skills Section - Innovative Tab Design */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Technical Skills
            </h3>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              {skillCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center justify-center p-3 mx-1 rounded-md text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  aria-label={category.name}
                  title={category.name}
                >
                  <span>{category.icon}</span>
                </button>
              ))}
            </div>
            
            {/* Skills Visualization - Circular Progress */}
            {activeCategoryData && (
              <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
                <h4 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
                  {activeCategoryData.name}
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {activeCategoryData.skills.map((skill, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div className="relative w-20 h-20 mb-2">
                        {/* Background Circle */}
                        <svg className="w-20 h-20" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#E5E7EB"
                            strokeWidth="3"
                            strokeDasharray="100, 100"
                            className="dark:stroke-gray-600"
                          />
                          {/* Foreground Circle */}
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#3B82F6"
                            strokeWidth="3"
                            strokeDasharray={`${skill.level}, 100`}
                            className="dark:stroke-blue-400"
                          />
                        </svg>
                        {/* Percentage in the middle */}
                        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {skill.level}%
                        </div>
                      </div>
                      <span className="text-center text-gray-700 dark:text-gray-300 text-sm font-medium">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Competitive Programming Section - Card Design */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Competitive Programming
            </h3>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                I am passionate about algorithmic problem solving and regularly participate in coding competitions. I've solved over 900+ problems on Codeforces, 500+ on LeetCode, and 300+ on UVA. My experience spans numerous individual and team contests across different platforms.
              </p>
              
              {/* Achievement Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {competitiveProgramming.map((item) => (
                  <div key={item.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border-l-4 border-blue-600">
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white">
                      {item.competition}
                    </h4>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                      {item.achievement}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 