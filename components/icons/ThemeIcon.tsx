import React from 'react';

export const ThemeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="w-6 h-6"
        {...props}
    >
        <path d="M12 2.69l.54.54a10.05 10.05 0 0 0 5.25 5.25l.54.54-5.79 5.79-5.79-5.79 .54-.54A10.05 10.05 0 0 0 11.46 3.23z"></path>
        <path d="M20.71 16.21a2.09 2.09 0 0 0-2.95-2.95l-3.55 3.55a1 1 0 0 0-.29.69V20h2.5a1 1 0 0 0 .69-.29z"></path>
    </svg>
);
