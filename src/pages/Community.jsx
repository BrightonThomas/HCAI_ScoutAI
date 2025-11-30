import React, { useState } from 'react';
import { MessageSquare, Users, Search, ThumbsUp, MapPin, Clock } from 'lucide-react';
import Button from '../components/Button';

const Community = () => {
    const [activeTab, setActiveTab] = useState('forum');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock Data for Forum
    const forumPosts = [
        {
            id: 1,
            author: "Mike Peters",
            initials: "MP",
            location: "Pacific Northwest",
            time: "2 hours ago",
            title: "Best winter camping activities for 10-12 year olds?",
            content: "Looking for ideas for our upcoming winter camp. We have about 25 scouts and want to keep them engaged despite the cold weather. Any suggestions?",
            replies: 8,
            likes: 12
        },
        {
            id: 2,
            author: "Emma Davis",
            initials: "ED",
            location: "Pacific Northwest",
            time: "5 hours ago",
            title: "Successful fundraiser ideas that worked for your troop",
            content: "Our troop is planning a big trip next summer and we need to raise funds. What fundraising activities have been most successful for your troops?",
            replies: 15,
            likes: 23
        },
        {
            id: 3,
            author: "John Smith",
            initials: "JS",
            location: "Rocky Mountains",
            time: "1 day ago",
            title: "Managing dietary restrictions on camping trips",
            content: "We have several scouts with food allergies and dietary restrictions. How do you handle meal planning for multi-day camping trips?",
            replies: 6,
            likes: 9
        }
    ];

    // Mock Data for Organizers
    const organizers = [
        {
            id: 1,
            name: "Mike Peters",
            initials: "MP",
            troop: "Troop 89",
            location: "Pacific Northwest",
            experience: "12 years"
        },
        {
            id: 2,
            name: "Emma Davis",
            initials: "ED",
            troop: "Troop 156",
            location: "Pacific Northwest",
            experience: "6 years"
        },
        {
            id: 3,
            name: "John Smith",
            initials: "JS",
            troop: "Troop 203",
            location: "Rocky Mountains",
            experience: "15 years"
        },
        {
            id: 4,
            name: "Lisa Chen",
            initials: "LC",
            troop: "Troop 147",
            location: "Pacific Northwest",
            experience: "4 years"
        },
        {
            id: 5,
            name: "Robert Wilson",
            initials: "RW",
            troop: "Troop 78",
            location: "Pacific Coast",
            experience: "9 years"
        }
    ];

    const filteredOrganizers = organizers.filter(org =>
        org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        org.troop.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 pb-24">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-stone-800">Scout Community</h1>
                <p className="text-stone-500 text-sm">Connect with other organizers and share experiences</p>
            </div>

            {/* Tab Toggle */}
            <div className="bg-stone-100 p-1 rounded-xl inline-flex mb-8 w-auto">
                <button
                    onClick={() => setActiveTab('forum')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'forum'
                        ? 'bg-white text-stone-800 shadow-sm'
                        : 'text-stone-500 hover:text-stone-700'
                        }`}
                >
                    <MessageSquare size={16} /> Forum
                </button>
                <button
                    onClick={() => setActiveTab('organizers')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'organizers'
                        ? 'bg-white text-stone-800 shadow-sm'
                        : 'text-stone-500 hover:text-stone-700'
                        }`}
                >
                    <Users size={16} /> Organizers
                </button>
            </div>

            {/* Forum View */}
            {activeTab === 'forum' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Input Area */}
                    <div className="bg-stone-50 border border-stone-200 border-dashed rounded-2xl p-4 flex items-center gap-4">
                        <div className="w-10 h-10 bg-stone-200 rounded-full flex items-center justify-center text-stone-400 text-xs font-bold shrink-0">
                            SJ
                        </div>
                        <input
                            type="text"
                            placeholder="Share your thoughts or ask a question..."
                            className="flex-1 bg-transparent border-none focus:outline-none text-sm text-stone-700 placeholder:text-stone-400"
                        />
                    </div>

                    {/* Posts List */}
                    <div className="space-y-4">
                        {forumPosts.map(post => (
                            <div key={post.id} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                                <h3 className="font-bold text-stone-800 mb-2">{post.title}</h3>

                                <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                                    <span className="font-bold text-stone-700">{post.author}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1 bg-stone-100 px-2 py-0.5 rounded text-stone-600">
                                        <MapPin size={10} /> {post.location}
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={10} /> {post.time}
                                    </span>
                                </div>

                                <p className="text-stone-600 text-sm leading-relaxed mb-4">{post.content}</p>

                                <div className="flex items-center gap-6 text-stone-400 text-xs font-bold">
                                    <button className="flex items-center gap-2 hover:text-stone-600 transition-colors">
                                        <MessageSquare size={16} /> {post.replies} replies
                                    </button>
                                    <button className="flex items-center gap-2 hover:text-stone-600 transition-colors">
                                        <ThumbsUp size={16} /> {post.likes}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Organizers View */}
            {activeTab === 'organizers' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search organizers by name, region, or troop..."
                            className="w-full bg-white border border-stone-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                        />
                    </div>

                    {/* Organizers Grid */}
                    <div className="grid grid-cols-1 gap-4">
                        {filteredOrganizers.map(org => (
                            <div key={org.id} className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center text-stone-400 text-sm font-bold shrink-0">
                                        {org.initials}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-stone-800">{org.name}</h3>
                                        <p className="text-xs text-stone-500">{org.troop}</p>
                                    </div>
                                </div>

                                <div className="flex gap-2 mb-4">
                                    <span className="bg-stone-50 border border-stone-100 text-stone-600 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                                        <MapPin size={10} /> {org.location}
                                    </span>
                                    <span className="bg-stone-50 border border-stone-100 text-stone-600 px-2 py-1 rounded-lg text-[10px] font-bold">
                                        {org.experience}
                                    </span>
                                </div>

                                <Button
                                    variant="outline"
                                    className="w-full h-9 text-xs border-stone-200 hover:bg-stone-50 text-stone-600"
                                >
                                    <MessageSquare size={14} className="mr-2" /> Message
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Community;
