import React from 'react';
import { Clock, Users, Flame } from 'lucide-react';

const ActivityCard = ({ activity, onClick }) => {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden hover:shadow-md transition-all active:scale-98 cursor-pointer"
        >
            <div className="h-32 bg-stone-200 relative">
                <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 flex gap-1">
                    {activity.tags.map(tag => (
                        <span key={tag} className="bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-emerald-700">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-stone-800 mb-1">{activity.title}</h3>
                <p className="text-stone-500 text-xs mb-3 line-clamp-2">{activity.description}</p>

                <div className="flex items-center justify-between text-stone-400 text-xs">
                    <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{activity.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>{activity.scouts}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Flame size={14} className={activity.difficulty === 'Hard' ? 'text-red-500' : activity.difficulty === 'Medium' ? 'text-orange-500' : 'text-green-500'} />
                        <span>{activity.difficulty}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
