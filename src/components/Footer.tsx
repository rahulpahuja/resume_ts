import { Heart, Code } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-blue-900/50 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Code className="h-5 w-5 text-primary mr-2" />
          <span className="font-medium">Rahul Pahuja</span>
        </div>
        
        <p className="text-gray-400 text-sm text-center">
          © {currentYear} All rights reserved. Made with 
          <Heart className="h-4 w-4 text-blue-400 inline mx-1" /> 
          by Rahul Pahuja
        </p>
        
        <div className="mt-4 md:mt-0 text-sm">
          <a 
            href="#home"
            className="text-gray-400 dark:text-gray-600 hover:text-primary transition-colors duration-300"
          >
            Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;