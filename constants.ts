// FIX: Remove type definitions and import them from types.ts to separate concerns and fix circular dependency issues.
import { Mood, ThemeName, Theme } from './types';

export const LOCAL_STORAGE_KEY = 'gemini-journal-entries';

export const MOOD_OPTIONS: { name: Mood; emoji: string; color: string }[] = [
    { name: 'happy', emoji: '😊', color: 'text-pink-400' },
    { name: 'excited', emoji: '🤩', color: 'text-orange-400' },
    { name: 'neutral', emoji: '😐', color: 'text-slate-400' },
    { name: 'sad', emoji: '😢', color: 'text-sky-400' },
    { name: 'anxious', emoji: '😟', color: 'text-violet-400' },
    { name: 'angry', emoji: '😠', color: 'text-red-400' },
];

export const STICKERS = ['🌸', '💖', '✨', '🎀', '🌙', '⭐', '🦋', '☁️'];

export const QUOTES = [
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "She turned her can'ts into cans and her dreams into plans.", author: "Kobi Yamada" },
    { text: "Be a pineapple: stand tall, wear a crown, and be sweet on the inside.", author: "Unknown" },
    { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" }
];

export const WRITING_PROMPTS = [
    "What is something that made you smile today?",
    "Describe a goal you want to accomplish this week.",
    "Write about a person you are grateful for and why.",
    "What is a new hobby you would like to try?",
    "If you could give your younger self one piece of advice, what would it be?",
    "What does your ideal day look like?",
    "Write about a challenge you recently overcame.",
    "List three things you love about yourself.",
];

export const THEMES: Record<ThemeName, Theme> = {
    'moon-night': {
        name: 'Moon Night',
        colors: {
            '--color-bg': '#1A1A2E',
            '--color-surface': '#16213E',
            '--color-primary': '#9A86E4',
            '--color-primary-hover': '#B3A1F2',
            '--color-secondary': '#F3D078',
            '--color-text-primary': '#E0E0E0',
            '--color-text-secondary': '#A0A0A0',
            '--color-border': '#2D3B5A',
        },
    },
    'blush-pink': {
        name: 'Blush Pink',
        colors: {
            '--color-bg': '#FFF5F7',
            '--color-surface': '#FFFFFF',
            '--color-primary': '#E5A1AD',
            '--color-primary-hover': '#D98B9A',
            '--color-secondary': '#FBC4AB',
            '--color-text-primary': '#6D435A',
            '--color-text-secondary': '#9B7E8A',
            '--color-border': '#F7E8EA',
        },
    },
    'indigo': {
        name: 'Indigo',
        colors: {
            '--color-bg': '#f7f9fc',
            '--color-surface': '#ffffff',
            '--color-primary': '#4f46e5',
            '--color-primary-hover': '#4338ca',
            '--color-secondary': '#10b981',
            '--color-text-primary': '#1f2937',
            '--color-text-secondary': '#6b7280',
            '--color-border': '#e5e7eb',
        },
    },
    'pastel-dream': {
        name: 'Pastel Dream',
        colors: {
            '--color-bg': '#fdf0f7',
            '--color-surface': '#ffffff',
            '--color-primary': '#f4aadd',
            '--color-primary-hover': '#e785c8',
            '--color-secondary': '#a2d2ff',
            '--color-text-primary': '#5e4d57',
            '--color-text-secondary': '#8b7a84',
            '--color-border': '#fce4f4',
        },
    },
    'floral-bliss': {
        name: 'Floral Bliss',
        colors: {
            '--color-bg': '#fef6e4',
            '--color-surface': '#fffcf5',
            '--color-primary': '#f582ae',
            '--color-primary-hover': '#f26196',
            '--color-secondary': '#8bd3dd',
            '--color-text-primary': '#564434',
            '--color-text-secondary': '#8a7868',
            '--color-border': '#fbeedb',
        },
    },
    'cosmic-star': {
        name: 'Cosmic Star',
        colors: {
            '--color-bg': '#191825',
            '--color-surface': '#232233',
            '--color-primary': '#ffa3fd',
            '--color-primary-hover': '#ff79fa',
            '--color-secondary': '#8696fe',
            '--color-text-primary': '#e0dff0',
            '--color-text-secondary': '#a19fb9',
            '--color-border': '#33314a',
        },
    },
};