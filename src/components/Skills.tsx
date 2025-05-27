import { useState } from 'react';
import SectionHeading from './SectionHeading';

// Skill categories and their colors
const categories = {
  mobile: { name: "Mobile", color: "bg-blue-500", textColor: "text-blue-200" },
  web: { name: "Web", color: "bg-purple-500", textColor: "text-purple-200" },
  backend: { name: "Backend", color: "bg-green-500", textColor: "text-green-200" },
  devops: { name: "DevOps", color: "bg-amber-500", textColor: "text-amber-200" },
  tools: { name: "Tools", color: "bg-red-500", textColor: "text-red-200" },
};

// Skills data with categories
const skillsData = [
  { name: "Java", category: "mobile" },
  { name: "Kotlin", category: "mobile" },
  { name: "Swift", category: "mobile" },
  { name: "Flutter", category: "mobile" },
  { name: "React Native", category: "mobile" },
  { name: "Android Studio", category: "tools" },
  { name: "Xcode", category: "tools" },
  { name: "Jetpack Compose", category: "mobile" },
  { name: "UIKit", category: "mobile" },
  { name: "Firebase", category: "backend" },
  { name: "REST APIs", category: "backend" },
  { name: "Spring Boot", category: "backend" },
  { name: "Node.js", category: "backend" },
  { name: "Python", category: "backend" },
  { name: "TeamCity", category: "devops" },
  { name: "Jenkins", category: "devops" },
  { name: "GitHub", category: "devops" },
  { name: "Bitbucket", category: "devops" },
  { name: "CircleCI", category: "devops" },
  { name: "Nexus", category: "devops" },
  { name: "Jira", category: "tools" },
  { name: "Figma", category: "tools" },
  { name: "Alamofire", category: "mobile" },
  { name: "ExoPlayer", category: "mobile" },
  { name: "Conviva", category: "tools" },
  { name: "Sentry", category: "devops" },
  { name: "Firebase Crashlytics", category: "devops" },
  { name: "JavaScript", category: "web" },
  { name: "TypeScript", category: "web" },
  { name: "React", category: "web" },
];

const Skills = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const filteredSkills = activeFilter 
    ? skillsData.filter(skill => skill.category === activeFilter)
    : skillsData;
    
  return (
    <section id="skills" className="py-16 scroll-mt-20">
      <SectionHeading title="Skills" subtitle="Technologies & Tools I Use" />
      
      <div className="mt-8 flex flex-wrap justify-center gap-2 mb-8">
        <FilterButton 
          active={activeFilter === null}
          onClick={() => setActiveFilter(null)}
          color="bg-gray-700"
          textColor="text-gray-200"
        >
          All
        </FilterButton>
        
        {Object.entries(categories).map(([key, { name, color, textColor }]) => (
          <FilterButton 
            key={key}
            active={activeFilter === key}
            onClick={() => setActiveFilter(key)}
            color={color}
            textColor={textColor}
          >
            {name}
          </FilterButton>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center mt-6 transition-all duration-500">
        {filteredSkills.map((skill, index) => {
          const category = categories[skill.category as keyof typeof categories];
          return (
            <span
              key={index}
              className={`${category.color} ${category.textColor} px-4 py-2 rounded-full font-medium text-sm md:text-base transform transition-all duration-300 hover:scale-110 opacity-90 hover:opacity-100`}
              style={{ 
                animationDelay: `${index * 0.05}s`,
                animationName: 'fadeIn',
                animationDuration: '0.5s',
                animationFillMode: 'both'
              }}
            >
              {skill.name}
            </span>
          );
        })}
      </div>
    </section>
  );
};

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  color: string;
  textColor: string;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({ 
  active, 
  onClick, 
  color, 
  textColor, 
  children 
}) => (
  <button
    className={`px-4 py-2 rounded-md transition-all duration-300 font-medium ${
      active 
        ? `${color} ${textColor} scale-105` 
        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Skills;