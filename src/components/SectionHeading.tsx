import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center';
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ 
  title, 
  subtitle, 
  alignment = 'center' 
}) => {
  return (
    <div className={`mb-10 ${alignment === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-blue-200 text-lg tracking-wide font-light max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`h-1.5 w-32 bg-gradient-to-r from-blue-400 to-blue-600 mt-6 rounded-full ${alignment === 'center' ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionHeading;