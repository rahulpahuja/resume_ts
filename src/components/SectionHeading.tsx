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
      <h2 className="text-3xl md:text-4xl font-bold">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-gray-400 text-lg">
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-20 bg-blue-500 mt-4 rounded ${alignment === 'center' ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionHeading;