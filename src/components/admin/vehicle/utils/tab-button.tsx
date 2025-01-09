import React from 'react'
import { cn } from '@/lib/utils';

const TabButton = ({ isActive, onClick, children }: { isActive: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
        onClick={onClick}
        className={cn(
            'text-primary-text text-nowrap rounded-full px-4 py-2 transition',
            isActive && 'text-lg font-medium bg-primary-main text-white'
        )}
    >
        {children}
    </button>
);

export default TabButton