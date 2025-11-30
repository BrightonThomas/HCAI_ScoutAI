import React, { useState } from 'react';
import { Calendar, MapPin, Users, Plus, X, Search, CheckCircle2, Clock } from 'lucide-react';
import Button from '../components/Button';

const EventCollaboration = () => {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showLeaderModal, setShowLeaderModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Mock Data
    const [events, setEvents] = useState([
        {
            id: 1,
            title: "Weekend Camp - Dec 2025",
            theme: "Outdoor Adventure",
            date: "December 15, 2025",
            organizers: 3,
            location: "Camp Emerald, Oregon",
            description: "A weekend of survival skills, hiking, and campfire stories. We will be focusing on badge requirements for the junior scouts.",
            leaders: ["Sarah Johnson", "Mike Peters", "Emma Davis"]
        },
        {
            id: 2,
            title: "Summer Camp 2026",
            theme: "Water Activities",
            date: "January 20, 2026",
            organizers: 2,
            location: "Lake Serenity",
            description: "Annual summer camp with kayaking, swimming, and water safety training.",
            leaders: ["Sarah Johnson", "John Smith"]
        }
    ]);

    const [showPastEvents, setShowPastEvents] = useState(false);

    const pastEvents = [
        {
            id: 101,
            title: "Spring Hike 2024",
            theme: "Nature Exploration",
            date: "April 12, 2024",
            organizers: 4,
            status: "Completed"
        },
        {
            id: 102,
            title: "Winter Lodge Retreat",
            theme: "Team Building",
            date: "December 10, 2024",
            organizers: 2,
            status: "Cancelled"
        }
    ];

    const [newEvent, setNewEvent] = useState({
        title: '',
        date: '',
        theme: '',
        location: '',
        leaders: []
    });

    const mockLeaders = [
        { name: "Sarah Johnson", email: "sarah@scouts.org", initials: "SJ" },
        { name: "Mike Peters", email: "mike@scouts.org", initials: "MP" },
        { name: "Emma Davis", email: "emma@scouts.org", initials: "ED" },
        { name: "John Smith", email: "john@scouts.org", initials: "JS" },
        { name: "Lisa Wong", email: "lisa@scouts.org", initials: "LW" }
    ];

    const handleCreateEvent = () => {
        if (!newEvent.title || !newEvent.date) return;

        const event = {
            id: events.length + 1,
            ...newEvent,
            organizers: newEvent.leaders.length + 1, // +1 for current user
            description: "New event created by you."
        };

        setEvents([event, ...events]);
        setShowCreateModal(false);
        setNewEvent({ title: '', date: '', theme: '', location: '', leaders: [] });
    };

    const toggleLeader = (leaderName) => {
        if (newEvent.leaders.includes(leaderName)) {
            setNewEvent(prev => ({ ...prev, leaders: prev.leaders.filter(l => l !== leaderName) }));
        } else {
            setNewEvent(prev => ({ ...prev, leaders: [...prev.leaders, leaderName] }));
        }
    };

    // Detailed Event View
    if (selectedEvent) {
        return (
            <div className="p-6 pt-8 pb-24">
                <Button
                    variant="ghost"
                    onClick={() => setSelectedEvent(null)}
                    className="mb-4 text-stone-500 hover:text-stone-800 pl-0"
                >
                    <X size={20} className="mr-2" /> Back to Events
                </Button>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100">
                    <div className="bg-emerald-900 p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 blur-3xl"></div>
                        <div className="relative z-10">
                            <span className="bg-emerald-800/50 border border-emerald-700/50 text-emerald-100 px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
                                {selectedEvent.theme || "General Event"}
                            </span>
                            <h1 className="text-3xl font-bold mb-2">{selectedEvent.title}</h1>
                            <div className="flex items-center gap-4 text-emerald-200 text-sm">
                                <span className="flex items-center gap-1"><Calendar size={14} /> {selectedEvent.date}</span>
                                <span className="flex items-center gap-1"><MapPin size={14} /> {selectedEvent.location || "TBD"}</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 space-y-8">
                        <div>
                            <h3 className="font-bold text-stone-800 mb-2">About this Event</h3>
                            <p className="text-stone-600 leading-relaxed">{selectedEvent.description}</p>
                        </div>

                        <div>
                            <h3 className="font-bold text-stone-800 mb-3">Location</h3>
                            <div className="bg-stone-100 rounded-xl p-4 flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-stone-800">{selectedEvent.location || "Location TBD"}</p>
                                    <a href="#" className="text-xs text-emerald-600 font-bold hover:underline">View on Google Maps</a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-stone-800 mb-3">Organizers ({selectedEvent.leaders?.length || selectedEvent.organizers})</h3>
                            <div className="flex flex-wrap gap-3">
                                {selectedEvent.leaders?.map((leader, i) => (
                                    <div key={i} className="flex items-center gap-2 bg-stone-50 border border-stone-200 pr-4 rounded-full p-1">
                                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 text-xs font-bold">
                                            {leader.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="text-sm font-medium text-stone-700">{leader}</span>
                                    </div>
                                )) || <p className="text-stone-400 italic">No organizers listed</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 pb-24">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-stone-800">Event Collaboration</h1>
                <p className="text-stone-500 text-sm">Create events and collaborate with other scout leaders</p>
            </div>

            {/* Create Event Card */}
            <div className="bg-stone-50 border border-stone-200 border-dashed rounded-3xl p-6 text-center mb-8 hover:bg-stone-100 transition-colors cursor-pointer group flex flex-col items-center" onClick={() => setShowCreateModal(true)}>
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Calendar size={32} className="text-emerald-600" />
                </div>
                <h3 className="font-bold text-stone-800 mb-1">Create New Event</h3>
                <p className="text-xs text-stone-500 mb-4 max-w-[200px]">Start a new event to plan activities and share media with other organizers</p>
                <Button className="bg-emerald-800 hover:bg-emerald-900 text-white text-sm py-2 px-6 h-auto">
                    <Plus size={16} className="mr-1" /> Create Event
                </Button>
            </div>

            {/* Events List */}
            <div className="space-y-8">
                <div>
                    <h2 className="text-lg font-bold text-stone-800 mb-4">Your Events ({events.length})</h2>
                    <div className="grid grid-cols-1 gap-4">
                        {events.map(event => (
                            <div
                                key={event.id}
                                onClick={() => setSelectedEvent(event)}
                                className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-[0.99]"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-stone-800 text-lg">{event.title}</h3>
                                    <span className="bg-yellow-100 text-yellow-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Upcoming</span>
                                </div>
                                <p className="text-stone-500 text-sm mb-4">{event.theme}</p>

                                <div className="flex items-center gap-4 text-xs text-stone-400 font-medium border-t border-stone-100 pt-3">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
                                    <span className="flex items-center gap-1"><Users size={14} /> {event.organizers} organizers</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Past Events */}
                <div>
                    <button
                        onClick={() => setShowPastEvents(!showPastEvents)}
                        className="flex items-center gap-2 text-stone-500 font-bold hover:text-stone-800 transition-colors mb-4"
                    >
                        <div className={`transform transition-transform duration-200 ${showPastEvents ? 'rotate-90' : ''}`}>
                            <div className="w-0 h-0 border-l-[6px] border-l-stone-400 border-y-[4px] border-y-transparent border-r-0"></div>
                        </div>
                        Past Events ({pastEvents.length})
                    </button>

                    {showPastEvents && (
                        <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            {pastEvents.map(event => (
                                <div
                                    key={event.id}
                                    className="bg-stone-50 border border-stone-200 rounded-2xl p-5 opacity-75 hover:opacity-100 transition-opacity"
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="font-bold text-stone-600 text-lg">{event.title}</h3>
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide ${event.status === 'Completed'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-600'
                                            }`}>
                                            {event.status}
                                        </span>
                                    </div>
                                    <p className="text-stone-400 text-sm mb-4">{event.theme}</p>

                                    <div className="flex items-center gap-4 text-xs text-stone-400 font-medium border-t border-stone-200 pt-3">
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {event.date}</span>
                                        <span className="flex items-center gap-1"><Users size={14} /> {event.organizers} organizers</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Create Event Modal */}
            {
                showCreateModal && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold text-stone-800">Create New Event</h2>
                                    <p className="text-xs text-stone-500">Set up a new event for your scout troop</p>
                                </div>
                                <button onClick={() => setShowCreateModal(false)} className="text-stone-400 hover:text-stone-600">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-stone-700 mb-1">Event Name *</label>
                                    <input
                                        type="text"
                                        value={newEvent.title}
                                        onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                                        placeholder="e.g., Fall Camping Trip 2024"
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-stone-700 mb-1">Date *</label>
                                    <input
                                        type="date"
                                        value={newEvent.date}
                                        onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-stone-700 mb-1">Theme (optional)</label>
                                    <input
                                        type="text"
                                        value={newEvent.theme}
                                        onChange={e => setNewEvent({ ...newEvent, theme: e.target.value })}
                                        placeholder="e.g., Outdoor Adventure, Survival Skills..."
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-stone-700 mb-1">Location (optional)</label>
                                    <input
                                        type="text"
                                        value={newEvent.location}
                                        onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                                        placeholder="e.g., Camp Emerald"
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-xs font-bold text-stone-700">Scout Leaders (optional)</label>
                                        <button
                                            onClick={() => setShowLeaderModal(true)}
                                            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                                        >
                                            <Plus size={12} /> Add
                                        </button>
                                    </div>
                                    {newEvent.leaders.length === 0 ? (
                                        <p className="text-xs text-stone-400 italic">No additional organizers added</p>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {newEvent.leaders.map((leader, i) => (
                                                <span key={i} className="bg-emerald-50 text-emerald-700 text-xs px-2 py-1 rounded-lg font-medium flex items-center gap-1">
                                                    {leader}
                                                    <button onClick={() => toggleLeader(leader)} className="hover:text-emerald-900"><X size={12} /></button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 border-t border-stone-100 flex gap-3">
                                <Button
                                    onClick={handleCreateEvent}
                                    className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-white"
                                >
                                    Create Event
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }

            {/* Add Leaders Modal */}
            {
                showLeaderModal && (
                    <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200">
                        <div className="bg-white w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl">
                            <div className="p-4 border-b border-stone-100 flex justify-between items-center">
                                <h3 className="font-bold text-stone-800">Add Scout Leaders</h3>
                                <button onClick={() => setShowLeaderModal(false)} className="text-stone-400 hover:text-stone-600">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-4">
                                <div className="relative mb-4">
                                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                                    <input
                                        type="text"
                                        placeholder="Search for a scout leader..."
                                        className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>

                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {mockLeaders.map((leader, i) => {
                                        const isSelected = newEvent.leaders.includes(leader.name);
                                        return (
                                            <div
                                                key={i}
                                                onClick={() => toggleLeader(leader.name)}
                                                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${isSelected ? 'bg-emerald-50 border border-emerald-200' : 'hover:bg-stone-50 border border-transparent'}`}
                                            >
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${isSelected ? 'bg-emerald-200 text-emerald-800' : 'bg-stone-100 text-stone-500'}`}>
                                                    {leader.initials}
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`text-sm font-bold ${isSelected ? 'text-emerald-900' : 'text-stone-800'}`}>{leader.name}</p>
                                                    <p className="text-xs text-stone-400">{leader.email}</p>
                                                </div>
                                                {isSelected && <CheckCircle2 size={18} className="text-emerald-600" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="p-4 border-t border-stone-100">
                                <Button onClick={() => setShowLeaderModal(false)} className="w-full">Done</Button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default EventCollaboration;
