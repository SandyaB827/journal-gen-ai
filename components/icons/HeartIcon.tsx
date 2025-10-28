import React from 'react';

export const HeartIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-5 h-5"
        {...props}
    >
        <path d="M12 20.947c-2.827-2.32-8-8.243-8-12.447C4 4.022 7.582 1 12 4.135 16.418 1 20 4.022 20 8.5c0 4.204-5.173 10.127-8 12.447z"></path>
    </svg>
);
