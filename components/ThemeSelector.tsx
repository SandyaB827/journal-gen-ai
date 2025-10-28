import React, { useState, useRef, useEffect } from 'react';
import { ThemeName } from '../types';
import { THEMES } from '../constants';
import { ThemeIcon } from './icons/ThemeIcon';

interface ThemeSelectorProps {
    selectedTheme: ThemeName;
    onThemeChange: (theme: ThemeName) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleThemeSelect = (theme: ThemeName) => {
        onThemeChange(theme);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const themeEntries = Object.entries(THEMES) as [ThemeName, typeof THEMES[ThemeName]][];

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text-primary"
                aria-label="Select theme"
            >
                <ThemeIcon />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-brand-surface rounded-lg shadow-lg z-40 border border-brand-border">
                    <ul className="p-2">
                        {themeEntries.map(([themeKey, themeData]) => (
                            <li key={themeKey}>
                                <button
                                    onClick={() => handleThemeSelect(themeKey)}
                                    className={`w-full text-left px-4 py-2 text-sm rounded-md transition-colors ${
                                        selectedTheme === themeKey
                                            ? 'bg-brand-primary/10 text-brand-primary font-semibold'
                                            : 'text-brand-text-primary hover:bg-brand-primary/5'
                                    }`}
                                >
                                    {themeData.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ThemeSelector;
