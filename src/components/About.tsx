import { Coffee, Award, Briefcase } from 'lucide-react';
import SectionHeading from './SectionHeading';

const About = () => {
  return (
    <section id="about" className="py-16 scroll-mt-20">
      <SectionHeading title="About Me" subtitle="My Background & Experience" />
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          icon={<Briefcase className="h-6 w-6 text-blue-400" />}
          title="10+ Years"
          description="Experience in Mobile Development"
        />
        <StatCard 
          icon={<Award className="h-6 w-6 text-purple-400" />}
          title="Staff Engineer"
          description="Current Role at CyberArk"
        />
        <StatCard 
          icon={<Coffee className="h-6 w-6 text-amber-400" />}
          title="Multiple Domains"
          description="Security, Banking, IoT & More"
        />
      </div>
      
      <div className="mt-10 bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
        <p className="text-gray-300 leading-relaxed">
          Currently working as a Staff Software Engineer at CyberArk in Hyderabad, India, with 10+ years of experience in mobile app development, specializing in Android (6+ years) and iOS (4+ years). I have a strong track record of delivering high-quality, complex mobile applications across domains like video streaming, banking, IoT, and business intelligence.
        </p>
        <p className="text-gray-300 leading-relaxed mt-4">
          My expertise spans multiple technologies and frameworks, allowing me to architect scalable, secure, and user-centric mobile solutions. I'm passionate about creating exceptional mobile experiences that solve real-world problems.
        </p>
      </div>
    </section>
  );
};

const StatCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="bg-gray-800/30 rounded-xl p-6 transform hover:scale-105 transition-all duration-300 border border-gray-700/50 hover:border-blue-500/50">
    <div className="flex items-center mb-4">
      <div className="p-3 bg-gray-700/50 rounded-lg mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  </div>
);

export default About;