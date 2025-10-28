// FIX: Define and export all necessary types to resolve import errors across the application and remove circular dependencies.
export type Mood = 'happy' | 'excited' | 'neutral' | 'sad' | 'anxious' | 'angry';

export type ThemeName = 'blush-pink' | 'moon-night' | 'indigo' | 'pastel-dream' | 'floral-bliss' | 'cosmic-star';

export interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
}

export interface JournalEntry {
    date: string;
    text: string;
    mood: Mood;
    todos: TodoItem[];
    image?: string | null;
    summary?: string;
    positive_aspects?: string[];
    areas_for_reflection?: string[];
    key_takeaways?: string[];
}

export type Theme = {
    name: string;
    colors: {
        '--color-bg': string;
        '--color-surface': string;
        '--color-primary': string;
        '--color-primary-hover': string;
        '--color-secondary': string;
        '--color-text-primary': string;
        '--color-text-secondary': string;
        '--color-border': string;
    };
};