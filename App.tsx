import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { JournalEntry, Mood, ThemeName, TodoItem } from './types';
import { loadEntries, saveEntries } from './services/storageService';
import { analyzeJournalEntry, getWellnessSuggestions } from './services/geminiService';
import JournalEditor from './components/JournalEditor';
import AIAssistant from './components/AIAssistant';
import EntryList from './components/EntryList';
import { LogoIcon } from './components/icons/LogoIcon';
import ThemeSelector from './components/ThemeSelector';
import { THEMES } from './constants';
import { MenuIcon } from './components/icons/MenuIcon';
import { CloseIcon } from './components/icons/CloseIcon';
import SuggestionsModal from './components/SuggestionsModal';
import PositiveVibesToast from './components/PositiveVibesToast';

const App: React.FC = () => {
    const [entries, setEntries] = useState<{ [date: string]: JournalEntry }>({});
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isAiLoading, setIsAiLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [theme, setTheme] = useState<ThemeName>(() => {
        return (localStorage.getItem('journal-theme') as ThemeName) || 'moon-night';
    });
    const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isSuggestionsModalOpen, setIsSuggestionsModalOpen] = useState(false);

    useEffect(() => {
        setEntries(loadEntries());
    }, []);

    useEffect(() => {
        saveEntries(entries);
    }, [entries]);

    useEffect(() => {
        const root = document.documentElement;
        const themeColors = THEMES[theme].colors;
        for (const [key, value] of Object.entries(themeColors)) {
            // FIX: Explicitly cast value to string as Object.entries can produce an 'unknown' type.
            root.style.setProperty(key, value as string);
        }
        localStorage.setItem('journal-theme', theme);
    }, [theme]);

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
        setIsSidebarOpen(false);
    };
    
    const getFormattedDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const selectedDateKey = useMemo(() => getFormattedDate(selectedDate), [selectedDate]);

    const currentEntry = useMemo((): JournalEntry => {
        return entries[selectedDateKey] || {
            date: selectedDateKey,
            text: '',
            mood: 'neutral',
            todos: [],
        };
    }, [entries, selectedDateKey]);

    const handleEntryChange = useCallback((newText: string, mood: Mood, image?: string | null) => {
        setEntries(prev => ({
            ...prev,
            [selectedDateKey]: {
                ...currentEntry,
                ...prev[selectedDateKey],
                date: selectedDateKey,
                text: newText,
                mood: mood,
                ...(image !== undefined && { image: image }),
            }
        }));
    }, [selectedDateKey, currentEntry]);

    const handleTodosChange = useCallback((updatedTodos: TodoItem[]) => {
        setEntries(prev => ({
            ...prev,
            [selectedDateKey]: {
                ...currentEntry,
                ...prev[selectedDateKey],
                todos: updatedTodos,
            },
        }));
    }, [selectedDateKey, currentEntry]);

    const handleGenerateInsights = async () => {
        if (!currentEntry.text) {
            alert('Please write something in your journal before generating insights.');
            return;
        }
        setIsAiLoading(true);
        try {
            const insights = await analyzeJournalEntry(currentEntry.text);
            if (insights) {
                setEntries(prev => ({
                    ...prev,
                    [selectedDateKey]: {
                        ...prev[selectedDateKey],
                        ...insights,
                    }
                }));
            }
        } catch (error) {
            console.error("Error generating insights:", error);
            alert("Sorry, there was an error generating insights. Please try again.");
        } finally {
            setIsAiLoading(false);
        }
    };
    
    const handleGetSuggestions = async () => {
        if (!currentEntry.text) {
            alert('Please write something in your journal first.');
            return;
        }
        setIsSuggestionsModalOpen(true);
        setIsSuggestionsLoading(true);
        setSuggestions([]); // Clear old suggestions
        try {
            const tips = await getWellnessSuggestions(currentEntry.text);
            if (tips) {
                setSuggestions(tips);
            }
        } catch (error) {
            console.error("Error getting suggestions:", error);
            alert("Sorry, there was an error getting suggestions. Please try again.");
            setIsSuggestionsModalOpen(false); 
        } finally {
            setIsSuggestionsLoading(false);
        }
    };

    const handleCloseModal = () => {
        setIsSuggestionsModalOpen(false);
    };

    return (
        <div className="min-h-screen font-sans text-brand-text-primary transition-colors duration-300">
            <PositiveVibesToast />
            
            <header className="bg-brand-surface border-b border-brand-border sticky top-0 z-20 transition-colors duration-300">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <LogoIcon />
                        <h1 className="text-xl md:text-2xl font-bold text-brand-primary">My Day</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeSelector selectedTheme={theme} onThemeChange={setTheme} />
                        <button 
                            className="md:hidden p-2 rounded-md hover:bg-brand-primary/10 focus:outline-none focus:ring-2 focus:ring-brand-primary text-brand-text-primary"
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            aria-label="Open entries list"
                        >
                            <MenuIcon />
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-4 md:grid md:grid-cols-12 md:gap-8">
                {/* Sidebar for entries */}
                <aside className={`fixed inset-y-0 left-0 z-30 w-72 bg-brand-surface border-r border-brand-border transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:col-span-4 xl:col-span-3 md:sticky md:top-[73px] md:h-[calc(100vh-73px-1rem)]`}>
                    <div className="p-4 flex justify-between items-center md:hidden">
                        <h2 className="text-lg font-bold text-brand-primary">My Entries</h2>
                        <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-full hover:bg-brand-primary/10" aria-label="Close entries list">
                            <CloseIcon />
                        </button>
                    </div>
                    <EntryList entries={entries} selectedDate={selectedDate} onDateSelect={handleDateChange} />
                </aside>
                
                {/* Overlay for mobile */}
                {isSidebarOpen && <div className="fixed inset-0 bg-black/30 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

                {/* Main content area */}
                <div className="md:col-span-8 xl:col-span-9 grid grid-cols-1 xl:grid-cols-2 gap-8">
                     <div className="xl:col-span-1">
                        <JournalEditor 
                            entry={currentEntry}
                            onEntryChange={handleEntryChange}
                            selectedDate={selectedDate}
                            onDateChange={handleDateChange}
                            todos={currentEntry.todos || []}
                            onTodosChange={handleTodosChange}
                        />
                    </div>
                    <div className="xl:col-span-1">
                        <div className="xl:sticky xl:top-[73px] xl:h-[calc(100vh-73px-1rem)]">
                            <AIAssistant 
                                entry={currentEntry}
                                onGenerate={handleGenerateInsights}
                                isLoading={isAiLoading}
                                onGetSuggestions={handleGetSuggestions}
                                isSuggestionsLoading={isSuggestionsLoading}
                            />
                        </div>
                    </div>
                </div>
            </main>
            
            <SuggestionsModal 
                isOpen={isSuggestionsModalOpen}
                onClose={handleCloseModal}
                suggestions={suggestions}
                isLoading={isSuggestionsLoading}
            />
        </div>
    );
};

export default App;