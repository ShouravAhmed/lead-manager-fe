// Sample experience data
const experiences = [
  {
    id: 1,
    title: 'Backend Developer (.NET)',
    company: 'InfinitiBit',
    location: 'Dhaka, Bangladesh',
    period: 'November 2024 - Present',
    description: [
      'Designing a backend solution in .NET 8 for LLM-based document generation using the agentic RAG approach',
      'Implementing CQRS pattern with minimal API, EF core and Dapper for developing a scalable AI based application',
      'Integrating cloud services such as Azure Active Directory, SharePoint, Snowflake, AWS S3 and Adobe e-Sign',
      'Analyzing technical challenges for web-based smart applications utilizing AI and linear programming'
    ],
    technologies: ['.NET 8', 'C#', 'CQRS', 'Minimal API', 'EF Core', 'Dapper', 'Azure', 'AWS']
  },
  {
    id: 2,
    title: 'Senior Software Engineer',
    company: 'Enosis Solutions',
    location: 'Dhaka, Bangladesh',
    period: 'April 2024 - July 2024',
    description: [
      'Developed scalable solutions, transitioning a hiring platform from Node.js to .NET 8 following the modular monolithic architecture',
      'Managed the development process of a substantial feature for a top project management software on Angular',
      'Upheld coding standards and mitigated potential issues by conducting over 50 code reviews of peer works'
    ],
    technologies: ['.NET 8', 'C#', 'Angular', 'Modular Monolith', 'Node.js']
  },
  {
    id: 3,
    title: 'Software Engineer',
    company: 'Enosis Solutions',
    location: 'Dhaka, Bangladesh',
    period: 'January 2022 - March 2024',
    description: [
      'Modernizing legacy systems, upgrading applications from vb.net to C# .NET 6, and integrating Azure cloud services',
      'Built a microservice with Azure Functions for sending bulk emails, and developed SSO with Azure Active Directory',
      'Identified security vulnerabilities and implemented a backend authorization layer in API endpoints to prevent data breaches'
    ],
    technologies: ['.NET 6', 'C#', 'Azure Functions', 'Azure Active Directory', 'Microservices', 'VB.NET']
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-900 dark:text-white">
          Professional Experience
        </h2>
        
        <div className="space-y-12">
          {experiences.map((exp) => (
            <div 
              key={exp.id} 
              className="border-l-4 border-blue-600 pl-6 ml-3 relative"
            >
              {/* Timeline dot */}
              <div className="absolute w-4 h-4 bg-blue-600 rounded-full -left-[10px] top-2"></div>
              
              <div className="mb-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {exp.title}
                </h3>
                <div className="flex flex-wrap items-center text-gray-700 dark:text-gray-300">
                  <span className="font-medium">{exp.company}</span>
                  <span className="mx-2">•</span>
                  <span>{exp.location}</span>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  {exp.period}
                </p>
              </div>
              
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
                {exp.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience; 