import { useState } from 'react';
import { ExternalLink, Calendar, Clock, ArrowRight, Star, TrendingUp } from 'lucide-react';
import SectionHeading from './SectionHeading';

// Technical blog posts and articles
const technicalBlogs = [
  {
    title: "Building Enterprise Security with TeeSDK",
    description: "Deep dive into implementing enterprise-grade mobile security solutions using TeeSDK and DataStore for secure storage in the CyberArk Identity app.",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Security",
    featured: true,
    tags: ["Security", "Mobile", "Enterprise", "TeeSDK"],
    excerpt: "Exploring how enterprise mobile applications can leverage hardware-backed security features to protect sensitive data and maintain compliance standards...",
    url: "#",
    stats: { views: "2.3k", likes: "148" }
  },
  {
    title: "Real-time Analytics at Scale: Conviva SDK Architecture",
    description: "How we built an analytics SDK processing 5 trillion events daily with 12 billion metric computations per minute across 7 billion sensors.",
    date: "2023-12-20",
    readTime: "12 min read",
    category: "Architecture",
    featured: true,
    tags: ["Analytics", "Scale", "Architecture", "SDK"],
    excerpt: "Building systems that can handle massive scale requires careful architectural decisions. Here's how we achieved real-time processing at unprecedented scale...",
    url: "#",
    stats: { views: "4.1k", likes: "312" }
  },
  {
    title: "Mobile Banking Security: Lessons from Bankwest",
    description: "Implementing secure currency conversion flows and self-service features in a production banking application.",
    date: "2023-11-08",
    readTime: "6 min read",
    category: "FinTech",
    tags: ["Banking", "Security", "Mobile", "FinTech"],
    excerpt: "Financial applications require the highest level of security. Here are key learnings from building banking features that handle millions of transactions...",
    url: "#",
    stats: { views: "1.8k", likes: "95" }
  },
  {
    title: "IoT and Smart Home: The Future of Connected Living",
    description: "Building sensor-driven solutions for smart homes that proactively detect and resolve issues while reducing insurance costs.",
    date: "2023-10-15",
    readTime: "10 min read",
    category: "IoT",
    tags: ["IoT", "Smart Home", "Sensors", "Insurance Tech"],
    excerpt: "The intersection of IoT, insurance, and smart home technology is creating new opportunities for innovation and cost reduction...",
    url: "#",
    stats: { views: "3.2k", likes: "187" }
  },
  {
    title: "Gamification in Automotive: Safe Driving Through Tech",
    description: "How we built a telematics-powered platform that encourages safe driving through behavior analytics and rewards.",
    date: "2023-09-22",
    readTime: "7 min read",
    category: "Automotive",
    tags: ["Automotive", "Telematics", "Gamification", "Safety"],
    excerpt: "Combining telematics data with gamification principles to create engaging experiences that promote safer driving behaviors...",
    url: "#",
    stats: { views: "2.7k", likes: "142" }
  },
  {
    title: "Cross-Platform Development: Android vs iOS",
    description: "A comprehensive guide to understanding the differences and similarities between Android and iOS development approaches.",
    date: "2023-08-30",
    readTime: "15 min read",
    category: "Mobile Development",
    tags: ["Cross-Platform", "iOS", "Android", "Development"],
    excerpt: "Navigating the complexities of cross-platform development requires understanding the unique aspects of each platform...",
    url: "#",
    stats: { views: "5.4k", likes: "278" }
  }
];

// Community and project blogs
const projectBlogs = [
  {
    title: "AI Similarity Platform Launch",
    description: "Introducing a comprehensive guide to bridging the gap between Android and iOS development paradigms using AI-powered insights.",
    date: "2024-02-01",
    readTime: "5 min read",
    category: "AI",
    featured: true,
    tags: ["AI", "Platform", "Cross-Platform", "Development"],
    excerpt: "Leveraging artificial intelligence to help developers understand platform differences and similarities through intelligent analysis...",
    url: "http://www.aisimilarity.com",
    stats: { views: "6.2k", likes: "423" }
  },
  {
    title: "Code Forum Blogs: Building Developer Community",
    description: "Creating a space for developers to share code snippets, explore forums, and publish insightful technical content.",
    date: "2024-01-20",
    readTime: "4 min read",
    category: "Community",
    tags: ["Community", "Open Source", "Developer Tools", "Blogging"],
    excerpt: "Building platforms that bring developers together to share knowledge and collaborate on innovative solutions...",
    url: "https://www.codeforumblogs.com",
    stats: { views: "3.8k", likes: "201" }
  },
  {
    title: "Civic Tech Innovation: Elcita Citizen App",
    description: "Empowering Electronic City residents through technology - reporting issues, accessing services, and staying connected.",
    date: "2023-12-10",
    readTime: "6 min read",
    category: "Civic Tech",
    tags: ["Civic Tech", "Smart City", "Community", "Government"],
    excerpt: "How technology can bridge the gap between citizens and local government services through innovative mobile solutions...",
    url: "#",
    stats: { views: "2.1k", likes: "118" }
  }
];

const Blogs = () => {
  const [activeTab, setActiveTab] = useState<'technical' | 'projects'>('technical');
  
  const blogs = activeTab === 'technical' ? technicalBlogs : projectBlogs;
  const featuredBlogs = blogs.filter(blog => blog.featured);
  const regularBlogs = blogs.filter(blog => !blog.featured);
  
  return (
    <section id="blogs" className="py-16 scroll-mt-20">
      <SectionHeading title="Blogs & Articles" subtitle="Technical Insights & Project Stories" />
      
      {/* Tab Navigation */}
      <div className="flex justify-center space-x-4 mb-12">
        <TabButton 
          active={activeTab === 'technical'} 
          onClick={() => setActiveTab('technical')}
          icon={<TrendingUp className="h-4 w-4" />}
        >
          Technical Articles
        </TabButton>
        <TabButton 
          active={activeTab === 'projects'} 
          onClick={() => setActiveTab('projects')}
          icon={<Star className="h-4 w-4" />}
        >
          Project Stories
        </TabButton>
      </div>

      {/* Featured Blogs */}
      {featuredBlogs.length > 0 && (
        <div className="mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Featured {activeTab === 'technical' ? 'Articles' : 'Stories'}
            </span>
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredBlogs.map((blog, index) => (
              <FeaturedBlogCard key={index} blog={blog} index={index} />
            ))}
          </div>
        </div>
      )}

      {/* Regular Blogs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {regularBlogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} index={index + featuredBlogs.length} />
        ))}
      </div>
    </section>
  );
};

interface BlogCardProps {
  blog: any;
  index: number;
}

const FeaturedBlogCard: React.FC<BlogCardProps> = ({ blog, index }) => {
  return (
    <article 
      className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 transform hover:scale-[1.02] animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Featured Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full">
          <Star className="h-3 w-3" />
          Featured
        </span>
      </div>

      <div className="p-8">
        {/* Category & Date */}
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
            {blog.category}
          </span>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {blog.readTime}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-300 mb-6 line-clamp-3 leading-relaxed">
          {blog.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {blog.tags.slice(0, 4).map((tag: string, i: number) => (
            <span key={i} className="text-xs px-2 py-1 bg-gray-700/60 text-gray-300 rounded-md border border-gray-600/50">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>{blog.stats.views} views</span>
            <span>{blog.stats.likes} likes</span>
          </div>
          <BlogLink href={blog.url} />
        </div>
      </div>
    </article>
  );
};

const BlogCard: React.FC<BlogCardProps> = ({ blog, index }) => {
  return (
    <article 
      className="group bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 transform hover:scale-[1.02] animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs px-2 py-1 bg-gray-700/60 text-gray-300 rounded-md">
            {blog.category}
          </span>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          {blog.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {blog.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {blog.tags.slice(0, 3).map((tag: string, i: number) => (
            <span key={i} className="text-xs px-2 py-1 bg-gray-700/50 text-gray-400 rounded">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-700/30">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            {blog.readTime}
          </div>
          <BlogLink href={blog.url} compact />
        </div>
      </div>
    </article>
  );
};

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  icon: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, onClick, children, icon }) => (
  <button
    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
      active 
        ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
        : 'bg-gray-800/60 text-gray-400 hover:bg-gray-700/60 hover:text-gray-300 border border-gray-700/50'
    }`}
    onClick={onClick}
  >
    {icon}
    {children}
  </button>
);

interface BlogLinkProps {
  href: string;
  compact?: boolean;
}

const BlogLink: React.FC<BlogLinkProps> = ({ href, compact = false }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`group inline-flex items-center gap-2 font-medium text-blue-400 hover:text-blue-300 transition-all duration-300 ${
      compact ? 'text-sm' : ''
    }`}
  >
    <span>{compact ? 'Read' : 'Read Article'}</span>
    <ArrowRight className={`${compact ? 'h-3 w-3' : 'h-4 w-4'} transform group-hover:translate-x-1 transition-transform duration-300`} />
  </a>
);

export default Blogs;