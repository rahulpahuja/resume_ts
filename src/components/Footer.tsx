import { Heart, Code } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 border-t border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Code className="h-5 w-5 text-blue-400 mr-2" />
          <span className="font-medium">Rahul Pahuja</span>
        </div>
        
        <p className="text-gray-400 text-sm text-center">
          © {currentYear} All rights reserved. Made with 
          <Heart className="h-4 w-4 text-red-500 inline mx-1" /> 
          by Rahul Pahuja
        </p>
        
        <div className="mt-4 md:mt-0 text-sm">
          <a 
            href="#home"
            className="text-gray-400 hover:text-white transition-colors duration-300"
          >
            Back to Top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;