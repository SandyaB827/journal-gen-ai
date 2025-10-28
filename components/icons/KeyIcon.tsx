import React from 'react';

export const KeyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        className="w-5 h-5" 
        {...props}
    >
        <path d="M14.5 10.5c-1.2 0-2 1-2.5 1.5C11.5 11.5 10.7 10.5 9.5 10.5c-.83 0-1.5.67-1.5 1.5 0 1.5 2 2.5 4 4.5 2-2 4-3 4-4.5 0-.83-.67-1.5-1.5-1.5z"></path>
        <path d="M21 10.5a5 5 0 0 0-10 0v2a5 5 0 0 0 10 0v-2z"></path>
        <path d="M10.5 12.5V21l-3-3-3 3"></path>
    </svg>
);