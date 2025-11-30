import React from 'react';
import { User, MapPin, Mail, Phone, Award, Save, Bookmark } from 'lucide-react';
import Button from '../components/Button';

const Profile = () => {
    const [savedActivities, setSavedActivities] = React.useState([]);

    React.useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('savedActivities') || '[]');
        setSavedActivities(saved);
    }, []);

    const clearSaved = () => {
        if (window.confirm('Are you sure you want to clear all saved activities?')) {
            localStorage.removeItem('savedActivities');
            setSavedActivities([]);
        }
    };

    return (
        <div className="p-6 pb-24 max-w-4xl mx-auto">
            {/* Header with Save Button */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-stone-800">Your Profile</h1>
                    <p className="text-stone-500">Manage your account information</p>
                </div>
                <Button className="bg-emerald-800 hover:bg-emerald-900 text-white flex items-center gap-2">
                    <Save size={18} /> Save Profile
                </Button>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 mb-6">
                <div className="flex items-center gap-6">
                    <div className="w-24 h-24 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 text-2xl font-bold border-2 border-stone-200">
                        SJ
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-stone-800">Sarah Johnson</h2>
                        <p className="text-stone-500 mb-2">Senior Scout Leader</p>
                        <div className="flex gap-2 text-xs font-bold text-stone-600">
                            <span className="bg-stone-100 px-2 py-1 rounded border border-stone-200 flex items-center gap-1">
                                <MapPin size={12} /> Pacific Northwest
                            </span>
                            <span className="bg-stone-100 px-2 py-1 rounded border border-stone-200">Troop 147</span>
                            <span className="bg-stone-100 px-2 py-1 rounded border border-stone-200">8 years experience</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 mb-6">
                <h3 className="text-emerald-800 font-bold mb-1">Contact Information</h3>
                <p className="text-xs text-stone-400 mb-4">Your contact details for other organizers</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Full Name</label>
                        <input type="text" defaultValue="Sarah Johnson" className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm font-medium text-stone-700" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Email</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input type="email" defaultValue="sarah.johnson@scouts.org" className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-sm font-medium text-stone-700" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Phone</label>
                        <div className="relative">
                            <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input type="tel" defaultValue="+1 (555) 123 4567" className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-sm font-medium text-stone-700" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Region</label>
                        <div className="relative">
                            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                            <input type="text" defaultValue="Pacific Northwest" className="w-full bg-stone-50 border border-stone-200 rounded-lg pl-9 pr-3 py-2 text-sm font-medium text-stone-700" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scout Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 mb-6">
                <h3 className="text-emerald-800 font-bold mb-1">Scout Information</h3>
                <p className="text-xs text-stone-400 mb-4">Details about your troop and role</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Troop Number</label>
                        <input type="text" defaultValue="Troop 147" className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm font-medium text-stone-700" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Role</label>
                        <input type="text" defaultValue="Senior Scout Leader" className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm font-medium text-stone-700" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-stone-700 mb-1">Experience</label>
                        <input type="text" defaultValue="8 years" className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm font-medium text-stone-700" />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1">Bio</label>
                    <textarea defaultValue="Passionate about outdoor education and youth development. Specialized in wilderness survival skills and team building activities." className="w-full bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm font-medium text-stone-700 h-20 resize-none" />
                </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 mb-6">
                <div className="flex items-center gap-2 mb-1">
                    <Award size={18} className="text-emerald-800" />
                    <h3 className="text-emerald-800 font-bold">Certifications</h3>
                </div>
                <p className="text-xs text-stone-400 mb-4">Your current certifications and training</p>

                <div className="flex flex-wrap gap-2">
                    {['First Aid', 'CPR', 'Wilderness Safety', 'Youth Protection'].map((cert, i) => (
                        <span key={i} className="bg-yellow-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-sm">
                            {cert}
                        </span>
                    ))}
                </div>
            </div>

            {/* Saved Activities */}
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
                <div className="flex items-center gap-2 mb-1">
                    <Bookmark size={18} className="text-emerald-800" />
                    <h3 className="text-emerald-800 font-bold">Saved Activities</h3>
                </div>
                <div className="flex justify-between items-end mb-4">
                    <p className="text-xs text-stone-400">Activities you save will appear here</p>
                    {savedActivities.length > 0 && (
                        <button onClick={clearSaved} className="text-xs text-red-500 font-bold hover:text-red-700">
                            Clear All
                        </button>
                    )}
                </div>

                {savedActivities.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3 text-stone-300">
                            <Bookmark size={24} />
                        </div>
                        <p className="text-stone-400 text-sm font-bold">No saved activities yet</p>
                        <p className="text-xs text-stone-400">Generate activities and save your favorites!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {savedActivities.map((activity, index) => (
                            <div key={index} className="bg-stone-50 p-4 rounded-xl border border-stone-100 flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-stone-800 text-sm">{activity.title}</h4>
                                    <p className="text-xs text-stone-500 line-clamp-1">{activity.description}</p>
                                </div>
                                <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full whitespace-nowrap ml-2">
                                    {activity.duration || "60m"}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
