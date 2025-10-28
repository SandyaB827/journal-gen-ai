import React from 'react';
import { SunIcon } from './icons/SunIcon';

const PositiveVibesToast: React.FC = () => {
    return (
        <div className="bg-brand-secondary/20 text-brand-text-primary">
            <div className="container mx-auto flex items-center justify-center gap-3 py-2 px-4">
                <SunIcon className="w-6 h-6 text-brand-secondary flex-shrink-0" />
                <p className="text-sm font-medium text-center">
                    Sending you positive vibes for a wonderful day! ✨
                </p>
            </div>
        </div>
    );
};

export default PositiveVibesToast;