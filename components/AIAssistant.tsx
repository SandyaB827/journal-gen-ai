// FIX: Create the AIAssistant component to display insights from the Gemini API.
import React, { useMemo } from 'react';
import { JournalEntry } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';
import { LoadingSpinner } from './icons/LoadingSpinner';
import { HeartIcon } from './icons/HeartIcon';
import { QUOTES, WRITING_PROMPTS } from '../constants';
import { QuoteIcon } from './icons/QuoteIcon';
import { LightbulbIcon } from './icons/LightbulbIcon';
import { KeyIcon } from './icons/KeyIcon';

interface AIAssistantProps {
    entry: JournalEntry;
    onGenerate: () => void;
    isLoading: boolean;
    onGetSuggestions: () => void;
    isSuggestionsLoading: boolean;
    apiKey: string;
    onSetApiKey: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ entry, onGenerate, isLoading, onGetSuggestions, isSuggestionsLoading, apiKey, onSetApiKey }) => {
    const { summary } = entry;
    const hasInsights = !!summary;
    const isButtonDisabled = isLoading || isSuggestionsLoading || !entry.text;

    const { quote, prompts } = useMemo(() => {
        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        const shuffledPrompts = [...WRITING_PROMPTS].sort(() => 0.5 - Math.random());
        const randomPrompts = shuffledPrompts.slice(0, 3);
        return { quote: randomQuote, prompts: randomPrompts };
    }, []);

    return (
        <div className="bg-brand-surface rounded-lg shadow-subtle p-6 space-y-6 h-full flex flex-col transition-colors duration-300">
            <div className="flex justify-between items-center flex-wrap gap-2">
                <h2 className="text-xl italic text-brand-primary">
                    AI Assistant
                </h2>
                <div className="flex items-center gap-2">
                     <button
                        onClick={onGetSuggestions}
                        disabled={isButtonDisabled || !apiKey}
                        title={!apiKey ? 'Set your API Key to enable suggestions' : ''}
                        className="flex items-center gap-2 text-brand-primary font-semibold py-2 px-4 rounded-lg transition-all duration-300 border-2 border-brand-primary hover:bg-brand-primary/10 disabled:border-brand-primary/50 disabled:text-brand-primary/50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-brand-surface"
                    >
                        <HeartIcon />
                        <span>Suggestions</span>
                    </button>
                    <button
                        onClick={onGenerate}
                        disabled={isButtonDisabled || !apiKey}
                        title={!apiKey ? 'Set your API Key to enable insights' : ''}
                        className="flex items-center gap-2 bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:bg-brand-primary-hover disabled:bg-brand-primary/50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-brand-surface"
                    >
                        {isLoading ? (
                            <>
                                <LoadingSpinner />
                                <span>Generating...</span>
                            </>
                        ) : (
                            <>
                                <SparklesIcon />
                                <span>Insights</span>
                            </>
                        )}
                    </button>
                </div>
            </div>

             {!apiKey && (
                <div className="bg-brand-bg border-l-4 border-brand-secondary p-4 rounded-r-lg text-center animate-fade-in">
                    <div className="flex justify-center items-center gap-2 mb-2">
                        <KeyIcon className="w-5 h-5 text-brand-secondary" />
                        <p className="font-semibold text-brand-text-primary">Enable AI Features</p>
                    </div>
                    <p className="text-sm text-brand-text-secondary mb-3">Set your Gemini API Key to unlock insights and suggestions for your journal entries.</p>
                    <button 
                        onClick={onSetApiKey} 
                        className="text-sm bg-brand-secondary text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-secondary focus:ring-offset-brand-bg"
                    >
                        Set API Key
                    </button>
                </div>
            )}

            <div className="flex-grow space-y-6 overflow-y-auto pr-2 -mr-2">
                {!hasInsights && !isLoading && (
                    <div className="space-y-6 animate-fade-in h-full flex flex-col justify-center">
                        <div className="p-4 bg-brand-bg rounded-lg">
                            <h3 className="italic text-brand-text-primary mb-2 flex items-center gap-2">
                                <QuoteIcon className="text-brand-primary flex-shrink-0" />
                                <span>Quote of the Day</span>
                            </h3>
                            <blockquote className="pl-4 border-l-2 border-brand-primary/50">
                                <p className="text-brand-text-secondary italic">"{quote.text}"</p>
                                <footer className="text-right text-sm text-brand-text-secondary/80 mt-2">- {quote.author}</footer>
                            </blockquote>
                        </div>

                        <div className="p-4 bg-brand-bg rounded-lg">
                            <h3 className="italic text-brand-text-primary mb-3 flex items-center gap-2">
                                <LightbulbIcon className="text-brand-primary flex-shrink-0" />
                                <span>Need some inspiration?</span>
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-brand-text-secondary">
                                {prompts.map((prompt, index) => (
                                    <li key={index}>{prompt}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
                
                {isLoading && !hasInsights && (
                     <div className="text-center text-brand-text-secondary py-10 flex flex-col items-center gap-4">
                        <LoadingSpinner className="w-8 h-8 text-brand-primary" />
                        <h3 className="font-semibold text-lg">Analyzing your entry...</h3>
                        <p>Our AI is reading your entry to provide thoughtful insights. This might take a moment.</p>
                    </div>
                )}

                {hasInsights && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="p-4 bg-brand-bg rounded-lg">
                            <h3 className="italic text-brand-text-primary mb-2">Summary</h3>
                            <p className="text-brand-text-secondary leading-relaxed">{entry.summary}</p>
                        </div>

                        {entry.positive_aspects && entry.positive_aspects.length > 0 && (
                            <div className="p-4 bg-brand-bg rounded-lg">
                                <h3 className="italic text-brand-text-primary mb-2">Positive Aspects</h3>
                                <ul className="list-disc list-inside space-y-1 text-brand-text-secondary">
                                    {entry.positive_aspects.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        )}

                        {entry.areas_for_reflection && entry.areas_for_reflection.length > 0 && (
                            <div className="p-4 bg-brand-bg rounded-lg">
                                <h3 className="italic text-brand-text-primary mb-2">Areas for Reflection</h3>
                                <ul className="list-disc list-inside space-y-1 text-brand-text-secondary">
                                    {entry.areas_for_reflection.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        )}

                        {entry.key_takeaways && entry.key_takeaways.length > 0 && (
                            <div className="p-4 bg-brand-bg rounded-lg">
                                <h3 className="italic text-brand-text-primary mb-2">Key Takeaways</h3>
                                <ul className="list-disc list-inside space-y-1 text-brand-text-secondary">
                                    {entry.key_takeaways.map((item, index) => <li key={index}>{item}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIAssistant;