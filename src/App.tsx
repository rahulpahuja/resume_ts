import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
// import { Toaster } from "@/components/ui/toaster";
import About from './components/About';
import ClientsMarquee from './components/ClientsMarquee';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Blogs from './components/Blogs';
import BlogDetail from './components/BlogDetail';

function App() {
  useEffect(() => {
    document.title = 'Rahul Pahuja | Mobile Engineer';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <main>
          <Hero />
          <About />
          <ClientsMarquee />
          <Skills />
          <Projects />
          <Blogs />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;