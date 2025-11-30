import React from 'react';
import { Sparkles, Image, Users, User, Tent, Calendar } from 'lucide-react';

const Layout = ({ children, activeTab, onTabChange }) => {
    const navItems = [
        { id: 'generator', icon: Sparkles, label: 'Generator' },
        { id: 'events', icon: Calendar, label: 'Events' },
        { id: 'community', icon: Users, label: 'Community' },
        { id: 'profile', icon: User, label: 'Profile' },
    ];

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans pb-20">
            <header className="bg-emerald-900 text-white p-4 shadow-lg sticky top-0 z-10">
                <div className="max-w-md mx-auto flex items-center gap-3">
                    <div className="bg-emerald-700 p-2 rounded-xl">
                        <Tent size={24} className="text-emerald-100" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight">Scout Activity Planner</h1>
                        <p className="text-emerald-200 text-xs">Plan amazing adventures</p>
                    </div>
                </div>
            </header>

            <main className="max-w-md mx-auto min-h-screen bg-white shadow-xl overflow-hidden relative">
                {children}
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-stone-200 pb-safe z-20">
                <div className="max-w-md mx-auto flex justify-around items-center h-16">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => onTabChange(item.id)}
                                className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${isActive ? 'text-emerald-600' : 'text-stone-400 hover:text-stone-600'
                                    }`}
                            >
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-[10px] font-medium">{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
};

export default Layout;
