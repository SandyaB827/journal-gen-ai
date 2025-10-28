import React, { useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { KeyIcon } from './icons/KeyIcon';

interface ApiKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (apiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onSave }) => {
    const [apiKey, setApiKey] = useState('');

    if (!isOpen) return null;

    const handleSave = () => {
        if (apiKey.trim()) {
            onSave(apiKey.trim());
        } else {
            alert("Please enter a valid API key.");
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 animate-fade-in-fast"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="api-key-title"
        >
            <div 
                className="bg-brand-surface rounded-xl shadow-lg w-full max-w-md m-4 space-y-6 transform animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-brand-border flex justify-between items-center">
                    <h2 id="api-key-title" className="text-xl italic text-brand-primary flex items-center gap-2">
                        <KeyIcon className="w-6 h-6" />
                        <span>Set Gemini API Key</span>
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-brand-primary/10 text-brand-text-secondary" aria-label="Close">
                        <CloseIcon />
                    </button>
                </div>
                
                <div className="p-6 space-y-4">
                    <p className="text-brand-text-secondary text-sm">
                        To enable AI-powered insights and suggestions, please enter your Google Gemini API key. You can get a key from Google AI Studio.
                    </p>
                    <input
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your API key here"
                        className="w-full p-2 border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none bg-transparent transition-colors"
                    />
                    <a 
                        href="https://aistudio.google.com/app/apikey" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-brand-primary hover:underline"
                    >
                        Get an API Key from Google AI Studio &rarr;
                    </a>
                </div>

                <div className="p-4 bg-brand-bg/50 border-t border-brand-border flex justify-end gap-3 rounded-b-xl">
                     <button
                        onClick={onClose}
                        className="bg-brand-surface border border-brand-border text-brand-text-primary font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:border-brand-text-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-brand-surface"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-brand-surface"
                    >
                        Save Key
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyModal;