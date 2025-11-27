import React from 'react';
import { Flame, Map, Users, Clock, Sparkles } from 'lucide-react';
import Button from '../components/Button';

const Home = ({ onNavigate }) => {
    return (
        <div className="pb-24">
            {/* Header */}
            <header className="bg-emerald-600 text-white p-6 rounded-b-3xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h1 className="text-2xl font-bold">Scout Planner</h1>
                        <p className="text-emerald-100 text-sm">Ready for your next adventure?</p>
                    </div>
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                        <span className="font-bold">BP</span>
                    </div>
                </div>

                {/* Quick Stats or Greeting */}
                <div className="flex gap-4 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                    <div className="bg-emerald-700/50 p-3 rounded-xl min-w-[100px] backdrop-blur-sm">
                        <p className="text-xs text-emerald-200">Next Meeting</p>
                        <p className="font-bold">Friday</p>
                    </div>
                    <div className="bg-emerald-700/50 p-3 rounded-xl min-w-[100px] backdrop-blur-sm">
                        <p className="text-xs text-emerald-200">Troop</p>
                        <p className="font-bold">Eagle 1</p>
                    </div>
                </div>
            </header>

            <div className="p-6 space-y-8">
                {/* Featured Activity */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-stone-800">Featured Activity</h2>
                        <button className="text-emerald-600 text-sm font-medium">View All</button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-stone-100 group cursor-pointer hover:shadow-lg transition-shadow">
                        <div className="h-40 bg-stone-200 relative">
                            <img
                                src="https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=800&q=80"
                                alt="Camping"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-bold text-emerald-700 flex items-center gap-1">
                                <Clock size={12} /> 2h
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex gap-2 mb-2">
                                <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded-full">OUTDOOR</span>
                                <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full">TEAMWORK</span>
                            </div>
                            <h3 className="text-xl font-bold text-stone-800 mb-1">Wilderness Survival 101</h3>
                            <p className="text-stone-500 text-sm mb-4 line-clamp-2">Learn the basics of shelter building and fire starting in a safe environment.</p>

                            <div className="flex items-center justify-between text-stone-400 text-sm">
                                <div className="flex items-center gap-1">
                                    <Users size={16} />
                                    <span>10-20 Scouts</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Flame size={16} className="text-orange-500" />
                                    <span>Medium</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Actions */}
                <section>
                    <h2 className="text-lg font-bold text-stone-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => onNavigate('generator')}
                            className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl text-white shadow-lg shadow-indigo-200 flex flex-col items-center gap-2 text-center active:scale-95 transition-transform"
                        >
                            <Sparkles size={32} />
                            <span className="font-bold">Idea Generator</span>
                        </button>
                        <button
                            onClick={() => onNavigate('explore')}
                            className="p-4 bg-white border border-stone-200 rounded-2xl text-stone-600 shadow-sm flex flex-col items-center gap-2 text-center active:scale-95 transition-transform hover:bg-stone-50"
                        >
                            <Map size={32} className="text-emerald-600" />
                            <span className="font-bold">Browse Map</span>
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
