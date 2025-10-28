import React from 'react';
import { JournalEntry } from '../types';
import { MOOD_OPTIONS } from '../constants';

interface EntryListProps {
    entries: { [date: string]: JournalEntry };
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
}

const EntryList: React.FC<EntryListProps> = ({ entries, selectedDate, onDateSelect }) => {
    // FIX: Cast the result of Object.values() to resolve 'unknown' type for entries.
    const sortedEntries = (Object.values(entries) as JournalEntry[]).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const getFormattedDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };
    
    const selectedDateKey = getFormattedDate(selectedDate);

    return (
        <div className="p-4 h-full overflow-y-auto">
            <h2 className="text-lg italic mb-4 text-brand-text-primary hidden md:block">My Entries</h2>
            {sortedEntries.length > 0 ? (
                <ul className="space-y-2">
                    {sortedEntries.map(entry => {
                        const moodInfo = MOOD_OPTIONS.find(m => m.name === entry.mood);
                        const entryDate = new Date(entry.date + 'T00:00:00');
                        const isSelected = entry.date === selectedDateKey;

                        return (
                            <li key={entry.date}>
                                <button
                                    onClick={() => onDateSelect(entryDate)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors duration-300 flex items-center gap-4 ${isSelected ? 'bg-brand-primary/10 text-brand-primary' : 'hover:bg-brand-primary/5'}`}
                                >
                                    <span className="text-2xl">{moodInfo?.emoji || '📝'}</span>
                                    <div className="flex-grow">
                                        <p className="font-semibold">
                                            {entryDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                        </p>
                                        <p className="text-sm text-brand-text-secondary truncate">
                                            {entry.text || 'No text in this entry.'}
                                        </p>
                                    </div>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <div className="text-center text-brand-text-secondary py-10">
                    <p>Your journal entries will appear here.</p>
                </div>
            )}
        </div>
    );
};

export default EntryList;