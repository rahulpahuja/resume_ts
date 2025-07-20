import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// Extended blog data with full content and images
const blogData: Record<string, any> = {
  'react-hooks-guide': {
    title: "Advanced React Hooks Patterns",
    date: "March 15, 2024",
    readTime: "8 min read",
    tags: ["React", "Hooks", "JavaScript"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
    content: `
      <h2>Understanding Advanced React Hooks</h2>
      <p>React Hooks have revolutionized how we write components in React. In this comprehensive guide, we'll explore advanced patterns that can help you build more efficient and maintainable applications.</p>
      
      <h3>Custom Hooks for State Management</h3>
      <p>Custom hooks are powerful tools that allow you to extract component logic into reusable functions. They enable you to share stateful logic between components without changing the component hierarchy.</p>
      
      <code>
        const useLocalStorage = (key, initialValue) => {
          const [storedValue, setStoredValue] = useState(() => {
            try {
              const item = window.localStorage.getItem(key);
              return item ? JSON.parse(item) : initialValue;
            } catch (error) {
              return initialValue;
            }
          });
          
          const setValue = (value) => {
            try {
              setStoredValue(value);
              window.localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
              console.error(error);
            }
          };
          
          return [storedValue, setValue];
        };
      </code>
      
      <h3>Performance Optimization</h3>
      <p>When working with hooks, it's important to understand how to optimize performance. useCallback and useMemo are essential tools for preventing unnecessary re-renders.</p>
      
      <p>The key is to identify expensive calculations and wrap them with useMemo, while using useCallback for functions that are passed as props to child components.</p>
    `
  },
  'typescript-best-practices': {
    title: "TypeScript Best Practices for Large Applications",
    date: "March 10, 2024", 
    readTime: "12 min read",
    tags: ["TypeScript", "Best Practices", "Architecture"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    content: `
      <h2>Building Scalable TypeScript Applications</h2>
      <p>TypeScript has become the go-to choice for large-scale JavaScript applications. In this article, we'll explore best practices that can help you maintain code quality and developer productivity as your project grows.</p>
      
      <h3>Type Safety Strategies</h3>
      <p>One of TypeScript's greatest strengths is its type system. Here are some strategies to maximize type safety in your applications:</p>
      
      <ul>
        <li>Use strict mode in your tsconfig.json</li>
        <li>Prefer interfaces over types for object shapes</li>
        <li>Utilize union types for better API design</li>
        <li>Implement proper error handling with Result types</li>
      </ul>
      
      <h3>Code Organization</h3>
      <p>As your TypeScript project grows, organizing your code becomes crucial. Consider implementing a feature-based folder structure and using barrel exports to simplify imports.</p>
      
      <code>
        // types/user.ts
        export interface User {
          id: string;
          name: string;
          email: string;
          role: 'admin' | 'user' | 'moderator';
        }
        
        // utils/api.ts
        export const fetchUser = async (id: string): Promise<User> => {
          const response = await fetch(\`/api/users/\${id}\`);
          if (!response.ok) {
            throw new Error('Failed to fetch user');
          }
          return response.json();
        };
      </code>
    `
  },
  'mobile-security-enterprise': {
    title: "Enterprise Mobile Security: Lessons from CyberArk Integration",
    date: "February 28, 2024",
    readTime: "10 min read", 
    tags: ["Security", "Mobile", "Enterprise"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop",
    content: `
      <h2>Securing Mobile Applications at Enterprise Scale</h2>
      <p>Working on the CyberArk Identity App taught me valuable lessons about implementing enterprise-grade security in mobile applications. Here's what I learned about integrating advanced security features while maintaining user experience.</p>
      
      <h3>TeeSDK Integration</h3>
      <p>The Trusted Execution Environment (TEE) provides hardware-level security for sensitive operations. Integrating TeeSDK required careful consideration of the following aspects:</p>
      
      <ul>
        <li>Secure key storage and management</li>
        <li>Biometric authentication flows</li>
        <li>Encrypted data transmission</li>
        <li>Certificate pinning implementation</li>
      </ul>
      
      <h3>DataStore Security</h3>
      <p>Implementing secure local storage involved multiple layers of protection. We used encrypted SharedPreferences with additional obfuscation for sensitive data.</p>
      
      <code>
        // Example of secure data storage pattern
        class SecureDataStore {
          private val encryptedPrefs = EncryptedSharedPreferences.create(
            "secure_prefs",
            masterKey,
            context,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
          )
          
          fun storeSecureData(key: String, value: String) {
            encryptedPrefs.edit().putString(key, value).apply()
          }
        }
      </code>
      
      <h3>User Experience Considerations</h3>
      <p>Security shouldn't come at the expense of usability. We implemented progressive authentication and smart caching to minimize friction while maintaining security standards.</p>
    `
  }
};

const BlogDetail = () => {
  const { id } = useParams();
  const blog = id ? blogData[id] : null;

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
          <Link to="/" className="text-primary hover:underline">← Back to blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Back button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blogs
        </Link>

        {/* Hero image */}
        <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8">
          <img 
            src={blog.image} 
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Blog header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.map((tag: string, index: number) => (
              <span 
                key={index}
                className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
          
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <span>{blog.date}</span>
            <span>•</span>
            <span>{blog.readTime}</span>
          </div>
        </header>

        {/* Blog content */}
        <article className="prose prose-gray dark:prose-invert max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: blog.content }}
            className="space-y-6 leading-relaxed"
          />
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;