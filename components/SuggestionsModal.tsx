import React from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { HeartIcon } from './icons/HeartIcon';
import { LoadingSpinner } from './icons/LoadingSpinner';

interface SuggestionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    suggestions: string[];
    isLoading: boolean;
}

const SuggestionsModal: React.FC<SuggestionsModalProps> = ({ isOpen, onClose, suggestions, isLoading }) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 animate-fade-in-fast"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="suggestions-title"
        >
            <div 
                className="bg-brand-surface rounded-xl shadow-lg w-full max-w-md m-4 space-y-6 transform animate-slide-up"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-6 border-b border-brand-border flex justify-between items-center">
                    <h2 id="suggestions-title" className="text-xl italic text-brand-primary flex items-center gap-2">
                        <HeartIcon className="w-6 h-6" />
                        <span>Wellness Suggestions</span>
                    </h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-brand-primary/10 text-brand-text-secondary" aria-label="Close">
                        <CloseIcon />
                    </button>
                </div>
                
                <div className="p-6 min-h-[200px] flex flex-col justify-center">
                    {isLoading ? (
                        <div className="flex flex-col items-center gap-4 text-brand-text-secondary">
                            <LoadingSpinner className="w-8 h-8 text-brand-primary" />
                            <p>Finding personalized tips for you...</p>
                        </div>
                    ) : (
                        <ul className="space-y-4">
                            {suggestions.map((tip, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <div className="mt-1 flex-shrink-0">
                                      <HeartIcon className="w-5 h-5 text-brand-primary/80" />
                                    </div>
                                    <p className="text-brand-text-secondary">{tip}</p>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <div className="p-4 bg-brand-bg/50 border-t border-brand-border text-right rounded-b-xl">
                     <button
                        onClick={onClose}
                        className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:bg-brand-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-brand-surface"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuggestionsModal;