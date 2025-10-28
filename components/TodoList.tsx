import React, { useState } from 'react';
import { TodoItem } from '../types';
import { ChecklistIcon } from './icons/ChecklistIcon';
import { TrashIcon } from './icons/TrashIcon';

interface TodoListProps {
    todos: TodoItem[];
    onTodosChange: (todos: TodoItem[]) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onTodosChange }) => {
    const [newTodoText, setNewTodoText] = useState('');

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

    return (
        <div className="bg-brand-surface rounded-lg shadow-subtle p-6 space-y-4 transition-colors duration-300">
            <h2 className="text-xl font-bold text-brand-primary flex items-center gap-3">
                <ChecklistIcon />
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
                    className="bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 hover:bg-brand-primary-hover disabled:bg-brand-primary/50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary focus:ring-offset-brand-surface"
                    disabled={!newTodoText.trim()}
                >
                    Add
                </button>
            </form>

            <div className="space-y-3 pt-2">
                {todos.length > 0 ? (
                    todos.map(todo => (
                        <div key={todo.id} className="flex items-center justify-between p-2 rounded-md hover:bg-brand-bg group">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggleTodo(todo.id)}
                                    className="h-5 w-5 rounded border-brand-border text-brand-primary focus:ring-brand-primary"
                                />
                                <span className={`text-brand-text-primary ${todo.completed ? 'line-through text-brand-text-secondary' : ''}`}>
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
                ) : (
                    <p className="text-center text-brand-text-secondary py-4">No goals for today yet. Add one!</p>
                )}
            </div>
        </div>
    );
};

export default TodoList;
