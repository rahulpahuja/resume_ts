import { ArrowRight, Mail, FileText, Github, Linkedin } from 'lucide-react';
import profileImage from '../../public/profile.jpg';
const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-24 text-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 -z-10"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
      
      <div className="animate-slideInDown">
        <div className="flex justify-center mb-6">
          <img src={profileImage}
            alt="Rahul Pahuja"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg" />
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
          Rahul Pahuja
        </h1>
        <p className="text-lg md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed font-light tracking-wide">
          Experienced Staff Software Engineer | Android & iOS Expert | Proven Leader in Mobile App Development, Cyber Security, Banking, IoT & Video Streaming
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <SocialButton
            href="mailto:therahulpahuja@gmail.com"
            icon={<Mail className="h-6 w-6" />}
            text="Email"
          />
          <SocialButton
            href="https://github.com/rahulpahuja"
            icon={<Github className="h-6 w-6" />}
            text="GitHub"
          />
          <SocialButton
            href="https://linkedin.com/in/therahulpahuja"
            icon={<Linkedin className="h-6 w-6" />}
            text="LinkedIn"
          />
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-5">
          <ActionButton
            href="mailto:therahulpahuja@gmail.com"
            primary={true}
            text="Contact Me"
            icon={<Mail className="h-5 w-5" />}
          />
          <ActionButton
            href="/resume.pdf"
            primary={false}
            text="Download Resume"
            icon={<FileText className="h-5 w-5" />}
          />
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block">
        <a
          href="#about"
          className="text-gray-400 hover:text-white transition-colors duration-300 flex flex-col items-center"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <div className="animate-bounce">
            <ArrowRight className="h-5 w-5 transform rotate-90" />
          </div>
        </a>
      </div>
    </section>
  );
};

const SocialButton = ({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 text-blue-200 hover:text-blue-100 transition-all duration-300 hover:scale-110 group"
  >
    <div className="p-2 rounded-full bg-blue-900/40 group-hover:bg-blue-800/60 transition-colors">
      {icon}
    </div>
    <span className="font-medium hidden sm:inline">{text}</span>
  </a>
);

const ActionButton = ({
  href,
  primary,
  text,
  icon
}: {
  href: string;
  primary: boolean;
  text: string;
  icon: React.ReactNode
}) => (
  <a
    href={href}
    target={href.startsWith('mailto:') ? '_self' : '_blank'}
    rel="noopener noreferrer"
    className={`flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-110 hover:shadow-2xl text-base md:text-lg ${primary
        ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/50'
        : 'bg-blue-950 hover:bg-blue-900 text-blue-100 border-2 border-blue-500/50 hover:border-blue-400'
      }`}
  >
    {icon}
    <span>{text}</span>
  </a>
);

export default Hero;
