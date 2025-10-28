import React from 'react';

// FIX: Create the WellnessIcon component to be used in the AI Assistant.
export const WellnessIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
        <path d="M12 20.947c-2.827-2.32-8-8.243-8-12.447C4 4.022 7.582 1 12 4.135 16.418 1 20 4.022 20 8.5c0 4.204-5.173 10.127-8 12.447z"></path>
        <path d="M18 5l-1.5 3L18 8l1.5-1.5L21 8l-1.5-3L21 3.5 19.5 5 18 3.5z" />
    </svg>
);
