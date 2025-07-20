import { ArrowRight, Mail, FileText, Github, Linkedin } from 'lucide-react';
import profileImage from '../../public/profile.jpg';
const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-24 text-center">
      <div className="animate-fadeIn">
        <div className="flex justify-center mb-6">
          <img src={profileImage}
            alt="Rahul Pahuja"
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Rahul Pahuja
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Experienced Staff Software Engineer | Android & iOS Expert | Proven Leader in Mobile App Development, Cyber Security, Banking, IoT & Video Streaming
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <SocialButton
            href="mailto:therahulpahuja@gmail.com"
            icon={<Mail className="h-5 w-5" />}
            text="Email"
          />
          <SocialButton
            href="https://github.com/rahulpahuja"
            icon={<Github className="h-5 w-5" />}
            text="GitHub"
          />
          <SocialButton
            href="https://linkedin.com/in/therahulpahuja"
            icon={<Linkedin className="h-5 w-5" />}
            text="LinkedIn"
          />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
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
    className="flex items-center gap-2 text-gray-300 hover:text-white transition-all duration-300"
  >
    {icon}
    <span>{text}</span>
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
    className={`flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105 ${primary
        ? 'bg-blue-600 hover:bg-blue-700 text-white'
        : 'bg-gray-800 hover:bg-gray-700 text-gray-200'
      }`}
  >
    {icon}
    <span>{text}</span>
  </a>
);

export default Hero;
