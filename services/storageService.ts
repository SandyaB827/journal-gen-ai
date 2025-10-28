
import { JournalEntry } from '../types';
import { LOCAL_STORAGE_KEY } from '../constants';

export const saveEntries = (entries: { [date: string]: JournalEntry }): void => {
    try {
        const serializedState = JSON.stringify(entries);
        localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    } catch (error) {
        console.error("Could not save entries to local storage", error);
    }
};

export const loadEntries = (): { [date: string]: JournalEntry } => {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (serializedState === null) {
            return {};
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.error("Could not load entries from local storage", error);
        return {};
    }
};
