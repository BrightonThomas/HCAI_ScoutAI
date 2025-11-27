import React from 'react';
import { Image, Video } from 'lucide-react';

const Media = () => {
    return (
        <div className="p-6 pt-12 text-center">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                <Image size={32} />
            </div>
            <h1 className="text-2xl font-bold mb-2">Media & Videos</h1>
            <p className="text-stone-500">Tutorials, songs, and activity guides coming soon.</p>
        </div>
    );
};

export default Media;
