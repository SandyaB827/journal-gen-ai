import React, { useState, useEffect, useCallback, ChangeEvent, useRef } from 'react';
import { JournalEntry, Mood, TodoItem } from '../types';
import { MOOD_OPTIONS, STICKERS } from '../constants';
import { CalendarIcon } from './icons/CalendarIcon';
import { ImageIcon } from './icons/ImageIcon';
import { TrashIcon } from './icons/TrashIcon';
import { SmileIcon } from './icons/SmileIcon';
import { ChecklistIcon } from './icons/ChecklistIcon';

interface JournalEditorProps {
    entry: JournalEntry;
    onEntryChange: (text: string, mood: Mood, image?: string | null) => void;
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    todos: TodoItem[];
    onTodosChange: (todos: TodoItem[]) => void;
}

const JournalEditor: React.FC<JournalEditorProps> = ({ entry, onEntryChange, selectedDate, onDateChange, todos, onTodosChange }) => {
    const [text, setText] = useState(entry.text);
    const [mood, setMood] = useState<Mood>(entry.mood);
    const [image, setImage] = useState<string | null>(entry.image || null);
    const [isMoodDropdownOpen, setIsMoodDropdownOpen] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const moodDropdownRef = useRef<HTMLDivElement>(null);
    const [newTodoText, setNewTodoText] = useState('');
    
    useEffect(() => {
        setText(entry.text);
        setMood(entry.mood);
        setImage(entry.image || null);
    }, [entry]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (moodDropdownRef.current && !moodDropdownRef.current.contains(event.target as Node)) {
                setIsMoodDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleMoodChange = (newMood: Mood) => {
        setMood(newMood);
        setIsMoodDropdownOpen(false);
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };
    
    const handleDateInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const newDate = new Date(e.target.value + 'T00:00:00'); // Adjust for timezone
      onDateChange(newDate);
    };

    const handleStickerSelect = (sticker: string) => {
        if (textareaRef.current) {
            const { selectionStart, selectionEnd } = textareaRef.current;
            const newText = text.substring(0, selectionStart) + sticker + text.substring(selectionEnd);
            setText(newText);
            // Move cursor after the inserted sticker
            setTimeout(() => {
                if (textareaRef.current) {
                    textareaRef.current.selectionStart = textareaRef.current.selectionEnd = selectionStart + sticker.length;
                    textareaRef.current.focus();
                }
            }, 0);
        }
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            onEntryChange(text, mood, image);
        }, 500); // Debounce saving

        return () => {
            clearTimeout(handler);
        };
    }, [text, mood, image, onEntryChange]);

    const handleAddTodo = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodoText.trim() === '') return;

        const newTodo: TodoItem = {
            id: Date.now().toString(),
            text: newTodoText,
            completed: false,
        };
        onTodosChange([...todos, newTodo]);
        setNewTodoText('');
    };

    const handleToggleTodo = (id: string) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        onTodosChange(updatedTodos);
    };

    const handleDeleteTodo = (id: string) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        onTodosChange(updatedTodos);
    };

    const formattedDateForInput = selectedDate.toISOString().split('T')[0];
    const currentMoodInfo = MOOD_OPTIONS.find(opt => opt.name === mood);

    return (
        <div className="bg-brand-surface rounded-lg shadow-subtle p-6 space-y-6 h-full flex flex-col transition-colors duration-300">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div className="relative">
                    <input 
                        type="date"
                        value={formattedDateForInput}
                        onChange={handleDateInputChange}
                        className="pl-10 p-2 border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none bg-transparent"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon className="text-brand-text-secondary"/>
                    </div>
                </div>
                <div className="relative" ref={moodDropdownRef}>
                    <button
                        onClick={() => setIsMoodDropdownOpen(!isMoodDropdownOpen)}
                        className="flex items-center gap-3 p-2 w-full sm:w-auto justify-center bg-brand-bg border border-brand-border rounded-lg hover:border-brand-primary/50 transition-colors"
                    >
                        <SmileIcon className="text-brand-text-secondary" />
                        <span className="font-semibold text-brand-text-primary">How are you feeling?</span>
                        <span className="text-2xl">{currentMoodInfo?.emoji}</span>
                    </button>
                    {isMoodDropdownOpen && (
                         <div className="absolute right-0 mt-2 w-full sm:w-64 bg-brand-surface rounded-lg shadow-lg z-10 border border-brand-border">
                            <ul className="p-2 space-y-1">
                                {MOOD_OPTIONS.map(opt => (
                                    <li key={opt.name}>
                                        <button
                                            onClick={() => handleMoodChange(opt.name)}
                                            className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors flex items-center gap-3 ${
                                                mood === opt.name
                                                    ? 'bg-brand-primary/10 text-brand-primary font-semibold'
                                                    : 'text-brand-text-primary hover:bg-brand-primary/5'
                                            }`}
                                        >
                                            <span className="text-xl">{opt.emoji}</span>
                                            <span className="capitalize">{opt.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                <h2 className="text-lg text-brand-text-primary flex items-center gap-2 italic">
                    <ChecklistIcon className="w-6 h-6 text-brand-primary" />
                    <span>Today's Focus</span>
                </h2>

                <form onSubmit={handleAddTodo} className="flex gap-2">
                    <input
                        type="text"
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                        placeholder="Add a new goal..."
                        className="flex-grow p-2 border border-brand-border rounded-md focus:ring-2 focus:ring-brand-primary focus:border-brand-primary outline-none bg-transparent transition-colors"
                    />
                    <button
                        type="submit"
                        className="bg-brand-primary text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 hover:bg-brand-primary-hover disabled:bg-brand-primary/50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-brand-surface text-sm"
                        disabled={!newTodoText.trim()}
                    >
                        Add
                    </button>
                </form>

                <div className="space-y-2 pt-1 max-h-28 overflow-y-auto">
                    {todos.length > 0 ? (
                        todos.map(todo => (
                            <div key={todo.id} className="flex items-center justify-between p-1.5 rounded-md hover:bg-brand-bg group">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => handleToggleTodo(todo.id)}
                                        className="h-4 w-4 rounded border-brand-border text-brand-primary focus:ring-brand-primary"
                                    />
                                    <span className={`text-brand-text-primary text-sm ${todo.completed ? 'line-through text-brand-text-secondary' : ''}`}>
                                        {todo.text}
                                    </span>
                                </label>
                                <button
                                    onClick={() => handleDeleteTodo(todo.id)}
                                    className="text-brand-text-secondary hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                    aria-label={`Delete todo: ${todo.text}`}
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    ) : null }
                </div>
            </div>
            
            <div className="border border-brand-border rounded-md p-2 flex flex-col">
                <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={handleTextChange}
                    placeholder="How was your day?"
                    className="w-full min-h-[35vh] p-2 bg-transparent resize-none focus:ring-0 focus:border-brand-primary outline-none text-base leading-relaxed"
                />
                <div className="border-t border-brand-border mt-2 pt-2 flex items-center gap-2">
                    <span className="text-sm font-semibold text-brand-text-secondary">Stickers:</span>
                     <div className="flex flex-wrap gap-1">
                        {STICKERS.map((sticker) => (
                            <button
                                key={sticker}
                                onClick={() => handleStickerSelect(sticker)}
                                className="text-xl p-1 rounded-full hover:bg-brand-primary/10 transition-colors"
                                title="Add sticker"
                            >
                                {sticker}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="flex items-center justify-between">
                <label htmlFor="image-upload" className="cursor-pointer flex items-center gap-2 text-brand-primary hover:text-brand-primary-hover font-medium py-2 px-4 rounded-md transition-colors duration-200 hover:bg-brand-primary/10">
                    <ImageIcon />
                    <span>{image ? 'Change Photo' : 'Add Photo'}</span>
                </label>
                <input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                
                {image && (
                    <div className="relative group">
                        <img src={image} alt="Journal entry" className="h-20 w-20 object-cover rounded-md" />
                        <button onClick={handleRemoveImage} className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JournalEditor;