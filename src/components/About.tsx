import { Coffee, Award, Briefcase } from 'lucide-react';
import SectionHeading from './SectionHeading';

const About = () => {
  return (
    <section id="about" className="py-20 scroll-mt-20 bg-slate-900/40">
      <SectionHeading title="About Me" subtitle="My Background & Experience" />
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          icon={<Briefcase className="h-6 w-6 text-primary" />}
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
      
      <div className="mt-12 bg-gradient-to-br from-blue-950/40 to-slate-900/40 rounded-2xl p-8 backdrop-blur-md border border-blue-700/30 hover:border-blue-500/50 transition-colors duration-300">
        <p className="text-gray-300 leading-relaxed text-lg">
          Currently working as a Staff Software Engineer at CyberArk in Hyderabad, India, with 10+ years of experience in mobile app development, specializing in Android (6+ years) and iOS (4+ years). I have a strong track record of delivering high-quality, complex mobile applications across domains like video streaming, banking, IoT, and business intelligence.
        </p>
        <p className="text-gray-300 leading-relaxed text-lg mt-6">
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
  <div className="bg-gradient-to-br from-blue-950 to-slate-900 rounded-2xl p-8 transform hover:-translate-y-2 transition-all duration-300 border border-blue-700/50 hover:border-blue-500/80 hover:shadow-2xl hover:shadow-blue-500/20 group">
    <div className="flex items-start gap-6">
      <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-2xl text-blue-100 group-hover:text-blue-300 transition-colors">{title}</h3>
        <p className="text-gray-400 text-sm mt-2">{description}</p>
      </div>
    </div>
  </div>
);

export default About;