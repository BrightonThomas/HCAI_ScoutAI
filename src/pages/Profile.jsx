import React from 'react';
import { User } from 'lucide-react';

const Profile = () => {
    return (
        <div className="p-6 pt-12 text-center">
            <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                <User size={32} />
            </div>
            <h1 className="text-2xl font-bold mb-2">Profile</h1>
            <p className="text-stone-500">Manage your account and settings.</p>
        </div>
    );
};

export default Profile;
