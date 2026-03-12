import { useState, useEffect } from 'react';
import { Menu, X, Code2, Sun, Moon } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // initialize theme based on localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/90 backdrop-blur-md py-2 shadow-lg' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl md:text-2xl">Rahul Pahuja</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['About' ,'Skills', 'Projects', 'Blogs','Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-white transition-colors duration-200 relative group"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="mailto:therahulpahuja@gmail.com"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-md transition-all duration-200 shadow-lg shadow-blue-500/50"
            >
              Download Resume
            </a>
          </nav>

          {/* Theme toggle + mobile menu button */}
          <button
            onClick={toggleTheme}
            className="hidden md:inline-flex items-center justify-center text-gray-300 hover:text-white p-2 rounded-full transition-colors duration-200"
          >
            {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 shadow-xl">
          <div className="px-4 py-3 space-y-3">
            {['About', 'Skills', 'Projects','Blogs', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-gray-300 hover:text-white transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <a 
              href="mailto:therahulpahuja@gmail.com"
              className="block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;