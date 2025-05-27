import { useState } from 'react';
import { ExternalLink, Github, BookOpen, Smartphone } from 'lucide-react';
import SectionHeading from './SectionHeading';

// Professional project data
const professionalProjects = [
  {
    title: "CyberArk Identity App",
    description: "Integrated TeeSDK and DataStore for secured storage. Delivered enterprise-grade mobile security solutions.",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.centrify.mdm.samsung",
    appStoreUrl: "https://apps.apple.com/us/app/cyberark-identity/id499910663",
    type: "professional",
    tags: ["Security", "Enterprise", "Authentication"]
  },
  {
    title: "Bankwest Digital Banking",
    description: "Led development of Simplified Self-Service features and enabled secure currency conversion flows.",
    playStoreUrl: "https://play.google.com/store/apps/details?id=au.com.bankwest.mobile",
    appStoreUrl: "https://apps.apple.com/au/app/bankwest/id419259235",
    type: "professional",
    tags: ["Banking", "Finance", "Mobile"]
  },
  {
    title: "Conviva Android SDK",
    description: "Developed a robust analytics SDK for Android video players, integrating with ExoPlayer to deliver real-time insights, SSAI/CSAI ad metrics, and audience measurement at scale.",
    stats: [
      "7 Billion sensors on devices",
      "5 Trillion events processed per day",
      "12 Billion metric computations per minute"
    ],
    type: "professional",
    tags: ["Analytics", "Video", "SDK"]
  },
  {
    title: "Intellicus BI App",
    description: "Enhanced dashboards, chart types, and crash monitoring for real-time mobile business analytics.",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.intellicus.android",
    type: "professional",
    tags: ["Business Intelligence", "Analytics", "Dashboards"]
  },
  {
    title: "Chevron Lubricant Track and Trace",
    description: "A real-time logistics solution designed to monitor, manage, and trace shipments with precision—ensuring transparency and accountability across the supply chain.",
    appStoreUrl: "https://apps.apple.com/us/app/lubricant-trackandtrace/id1534588269",
    type: "professional",
    tags: ["Logistics", "Tracking", "Supply Chain"]
  },
  {
    title: "Elcita Citizen",
    description: "A civic engagement app empowering Electronic City residents to report issues, access public services, and stay informed about local updates—fostering a smarter, more connected community.",
    appStoreUrl: "https://apps.apple.com/in/app/elcita-citizen/id1473400141",
    type: "professional",
    tags: ["Civic Tech", "Community", "Smart City"]
  },
  {
    title: "Wipro Smart Home using Smart-i-Connect",
    description: "A sensor-driven solution designed to proactively detect and resolve issues within residential environments, aiming to significantly reduce insurance costs for both homeowners and insurance providers.",
    readMoreUrl: "https://www.wipro.com/infrastructure/wipro-smart-i-connect/",
    type: "professional",
    tags: ["IoT", "Smart Home", "Insurance Tech"]
  },
  {
    title: "Wipro Auto Insights",
    description: "A telematics-powered connected car platform gamified for the Indian audience, designed to encourage safe driving through behavior analytics and rewards.",
    appStoreUrl: "https://apps.apple.com/us/app/wipro-autoinsights/id1281864911",
    type: "professional",
    tags: ["Automotive", "Telematics", "Gamification"]
  }
];

// Personal project data
const personalProjects = [
  {
    title: "AI Similarity",
    description: "Your ultimate guide to bridging the gap between Android and iOS Platforms",
    websiteUrl: "http://www.aisimilarity.com",
    type: "personal",
    tags: ["AI", "Mobile Development", "Cross-Platform"]
  },
  {
    title: "Code Forum Blogs",
    description: "A community-powered space to share code snippets, explore development forums, and publish insightful tech blogs.",
    websiteUrl: "https://www.codeforumblogs.com",
    type: "personal",
    tags: ["Community", "Blogging", "Code Sharing"]
  }
];

const Projects = () => {
  const [activeTab, setActiveTab] = useState<'professional' | 'personal'>('professional');
  
  const projects = activeTab === 'professional' ? professionalProjects : personalProjects;
  
  return (
    <section id="projects" className="py-16 scroll-mt-20">
      <SectionHeading title="Projects" subtitle="My Work & Contributions" />
      
      <div className="flex justify-center space-x-4 mb-10">
        <TabButton 
          active={activeTab === 'professional'} 
          onClick={() => setActiveTab('professional')}
        >
          Professional
        </TabButton>
        <TabButton 
          active={activeTab === 'personal'} 
          onClick={() => setActiveTab('personal')}
        >
          Personal
        </TabButton>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: any; // Using 'any' for simplicity, but in a real project you'd want to define a proper type
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <div 
      className="bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 transform hover:scale-[1.02] group"
      style={{ 
        animationDelay: `${index * 0.1}s`,
        animationName: 'fadeInUp',
        animationDuration: '0.6s',
        animationFillMode: 'both'
      }}
    >
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">
          {project.title}
        </h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags?.map((tag: string, i: number) => (
            <span key={i} className="text-xs px-2 py-1 bg-gray-700/70 rounded-md text-gray-300">
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-gray-400 mb-4">
          {project.description}
        </p>
        
        {project.stats && (
          <div className="mt-4 space-y-2">
            {project.stats.map((stat: string, i: number) => (
              <div key={i} className="flex items-center text-sm">
                <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-gray-300">{stat}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-4 pt-4 border-t border-gray-700/50 flex flex-wrap gap-3">
          {project.websiteUrl && (
            <ProjectLink href={project.websiteUrl} icon={<ExternalLink className="h-4 w-4" />} text="Visit Website" />
          )}
          {project.playStoreUrl && (
            <ProjectLink href={project.playStoreUrl} icon={<Smartphone className="h-4 w-4" />} text="Play Store" />
          )}
          {project.appStoreUrl && (
            <ProjectLink href={project.appStoreUrl} icon={<Smartphone className="h-4 w-4" />} text="App Store" />
          )}
          {project.readMoreUrl && (
            <ProjectLink href={project.readMoreUrl} icon={<BookOpen className="h-4 w-4" />} text="Read More" />
          )}
          {project.githubUrl && (
            <ProjectLink href={project.githubUrl} icon={<Github className="h-4 w-4" />} text="GitHub" />
          )}
        </div>
      </div>
    </div>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children }) => (
  <button
    className={`px-6 py-2 rounded-md transition-all duration-300 ${
      active 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-300'
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

interface ProjectLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
}

const ProjectLink: React.FC<ProjectLinkProps> = ({ href, icon, text }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300"
  >
    {icon}
    <span>{text}</span>
  </a>
);

export default Projects;