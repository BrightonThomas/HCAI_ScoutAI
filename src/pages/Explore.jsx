import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import { activities } from '../data/activities';

const Explore = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredActivities = activities.filter(activity =>
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="pb-24">
            <div className="sticky top-0 bg-white/80 backdrop-blur-md z-10 p-4 border-b border-stone-100">
                <h1 className="text-2xl font-bold mb-4">Explore</h1>
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search activities..."
                            className="w-full bg-stone-100 pl-10 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button className="p-2 bg-stone-100 rounded-xl text-stone-600 hover:bg-stone-200">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            <div className="p-4 grid gap-4">
                {filteredActivities.map(activity => (
                    <ActivityCard key={activity.id} activity={activity} />
                ))}
            </div>
        </div>
    );
};

export default Explore;
