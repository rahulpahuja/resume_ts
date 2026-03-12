import { Mail, Linkedin, Github, Send } from 'lucide-react';
import SectionHeading from './SectionHeading';

const Contact = () => {
  return (
    <section id="contact" className="py-20 scroll-mt-20 bg-slate-900/40">
      <SectionHeading title="Get In Touch" subtitle="Let's Connect & Collaborate" />
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gradient-to-br from-blue-950 to-slate-900 rounded-2xl p-8 backdrop-blur-sm border border-blue-700/50 hover:border-blue-500/80 transition-colors duration-300">
          <h3 className="text-2xl font-bold mb-6 text-blue-100">Contact Information</h3>
          
          <div className="space-y-4">
            <ContactItem 
              icon={<Mail className="h-5 w-5 text-primary" />}
              label="Email"
              value="therahulpahuja@gmail.com"
              href="mailto:therahulpahuja@gmail.com"
            />
            
            <ContactItem 
              icon={<Linkedin className="h-5 w-5 text-primary" />}
              label="LinkedIn"
              value="linkedin.com/in/therahulpahuja"
              href="https://linkedin.com/in/therahulpahuja"
            />
            
            <ContactItem 
              icon={<Github className="h-5 w-5 text-primary" />}
              label="GitHub"
              value="github.com/rahulpahuja"
              href="https://github.com/rahulpahuja"
            />
          </div>
          
          <div className="mt-8">
            <h4 className="font-medium mb-2">Open for:</h4>
            <div className="flex flex-wrap gap-2">
              <Badge>Remote Opportunities</Badge>
              <Badge>Freelance Projects</Badge>
              <Badge>Technical Leadership</Badge>
              <Badge>Mentorship</Badge>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-950 to-slate-900 rounded-2xl p-8 backdrop-blur-sm border border-blue-700/50 hover:border-blue-500/80 transition-colors duration-300">
          <h3 className="text-2xl font-bold mb-6 text-blue-100">Send Me a Message</h3>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-blue-200 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-slate-800/50 border border-blue-700/40 rounded-lg px-4 py-3 text-blue-50 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Your Name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-slate-800/50 border border-blue-700/40 rounded-lg px-4 py-3 text-blue-50 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-blue-200 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full bg-slate-800/50 border border-blue-700/40 rounded-lg px-4 py-3 text-blue-50 placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Your message here..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-blue-500/50 hover:scale-105"
            >
              <Send className="h-4 w-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, label, value, href }) => (
  <div className="flex items-start">
    <div className="mr-3 mt-1 text-primary">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white hover:text-primary transition-colors duration-300"
      >
        {value}
      </a>
    </div>
  </div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1.5 bg-blue-900/40 text-blue-200 rounded-full text-sm font-medium border border-blue-700/50">
    {children}
  </span>
);

export default Contact;