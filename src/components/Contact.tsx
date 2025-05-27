import { Mail, Linkedin, Github, Send } from 'lucide-react';
import SectionHeading from './SectionHeading';

const Contact = () => {
  return (
    <section id="contact" className="py-16 scroll-mt-20">
      <SectionHeading title="Get In Touch" subtitle="Let's Connect & Collaborate" />
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50">
          <h3 className="text-xl font-bold mb-4">Contact Information</h3>
          
          <div className="space-y-4">
            <ContactItem 
              icon={<Mail className="h-5 w-5 text-blue-400" />}
              label="Email"
              value="therahulpahuja@gmail.com"
              href="mailto:therahulpahuja@gmail.com"
            />
            
            <ContactItem 
              icon={<Linkedin className="h-5 w-5 text-blue-400" />}
              label="LinkedIn"
              value="linkedin.com/in/therahulpahuja"
              href="https://linkedin.com/in/therahulpahuja"
            />
            
            <ContactItem 
              icon={<Github className="h-5 w-5 text-blue-400" />}
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
        
        <div className="bg-gray-800/30 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50">
          <h3 className="text-xl font-bold mb-4">Send Me a Message</h3>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-gray-900/70 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your Name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-gray-900/70 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full bg-gray-900/70 border border-gray-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your message here..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition-colors duration-300"
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
    <div className="mr-3 mt-1">{icon}</div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-white hover:text-blue-400 transition-colors duration-300"
      >
        {value}
      </a>
    </div>
  </div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm">
    {children}
  </span>
);

export default Contact;