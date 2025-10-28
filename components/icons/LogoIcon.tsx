import React from 'react';

export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-brand-primary"
        {...props}
    >
        <path d="M4 19.5V4.5C4 3.67 4.67 3 5.5 3h13C19.33 3 20 3.67 20 4.5v15c0 .83-.67 1.5-1.5 1.5h-13C4.67 21 4 20.33 4 19.5z"></path>
        <line x1="7" y1="3" x2="7" y2="21"></line>
        <path d="M14.5 9.5c-1.2 0-2 1-2.5 1.5C11.5 10.5 10.7 9.5 9.5 9.5c-.83 0-1.5.67-1.5 1.5 0 1.5 2 2.5 4 4.5 2-2 4-3 4-4.5 0-.83-.67-1.5-1.5-1.5z"></path>
    </svg>
);
