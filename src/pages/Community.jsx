import React from 'react';
import { Users } from 'lucide-react';

const Community = () => {
    return (
        <div className="p-6 pt-12 text-center">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                <Users size={32} />
            </div>
            <h1 className="text-2xl font-bold mb-2">Community</h1>
            <p className="text-stone-500">Connect with other scout leaders and share ideas.</p>
        </div>
    );
};

export default Community;
