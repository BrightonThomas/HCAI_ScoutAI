import React from 'react';
import { Calendar } from 'lucide-react';
import ActivityCard from '../components/ActivityCard';
import { activities } from '../data/activities';

const Plan = () => {
    // Mock saved activities
    const savedActivities = [activities[0], activities[2]];

    return (
        <div className="pb-24">
            <div className="p-6 pt-12">
                <h1 className="text-2xl font-bold mb-2">Your Plan</h1>
                <p className="text-stone-500 mb-6">Upcoming activities for your troop.</p>

                <div className="space-y-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3 text-emerald-700 font-bold text-sm uppercase tracking-wider">
                            <Calendar size={16} />
                            <span>This Friday</span>
                        </div>
                        <ActivityCard activity={savedActivities[0]} />
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-3 text-stone-400 font-bold text-sm uppercase tracking-wider">
                            <Calendar size={16} />
                            <span>Next Week</span>
                        </div>
                        <ActivityCard activity={savedActivities[1]} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Plan;
