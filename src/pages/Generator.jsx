import React, { useState } from 'react';
import { Sparkles, ChevronDown, RotateCcw, ArrowLeft, AlertCircle, Clock, Users, MapPin, CheckCircle2, ShieldAlert, AlertTriangle, X } from 'lucide-react';
import Button from '../components/Button';
import { generateActivityIdeas } from '../lib/groq';
import { generatorData } from '../data/generatorData';

const Generator = () => {
    const initialFormState = {
        numKids: '20',
        minAge: '8',
        maxAge: '12',
        budgetType: 'money',
        budgetAmount: 50,
        materials: '',
        theme: '',
        accessible: false,
        region: '',
        location: 'Outdoor',
        format: 'Small groups',
        purpose: ''
    };

    const [formData, setFormData] = useState(initialFormState);
    const [generatedIdeas, setGeneratedIdeas] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);

    // New state for Expanded View and Flyer
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [showFlyer, setShowFlyer] = useState(false);
    const [savedSuccess, setSavedSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleReset = () => {
        setFormData(initialFormState);
        setError(null);
        setGeneratedIdeas(null);
        setSelectedIdea(null);
    };

    const generateIdeas = async () => {
        setIsGenerating(true);
        setError(null);

        try {
            const ideas = await generateActivityIdeas(formData);
            setGeneratedIdeas(ideas);
            setSelectedIdea(null); // Reset selection on new generation
        } catch (err) {
            console.error(err);
            setError(err.message || "Failed to generate ideas. Please check your API key and try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    const handleSaveActivity = (idea) => {
        const saved = JSON.parse(localStorage.getItem('savedActivities') || '[]');
        // Check if already saved
        if (!saved.some(a => a.title === idea.title)) {
            localStorage.setItem('savedActivities', JSON.stringify([...saved, { ...idea, savedAt: new Date().toISOString() }]));
            setSavedSuccess(true);
            setTimeout(() => setSavedSuccess(false), 3000);
        }
    };

    const FlyerModal = ({ idea, onClose }) => (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative">
                <div className="bg-emerald-600 p-6 text-white text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <h2 className="text-2xl font-bold relative z-10">Scout Activity Flyer</h2>
                    <p className="text-emerald-100 text-sm relative z-10">Join us for an adventure!</p>
                    <button onClick={onClose} className="absolute top-4 right-4 text-white/80 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="p-8 text-center space-y-6">
                    <div>
                        <h3 className="text-3xl font-black text-stone-800 mb-2">{idea.title}</h3>
                        <p className="text-stone-500 italic">{idea.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-left bg-stone-50 p-4 rounded-xl">
                        <div>
                            <p className="text-xs font-bold text-stone-400 uppercase">When</p>
                            <p className="font-bold text-stone-700">Next Meeting</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-stone-400 uppercase">Where</p>
                            <p className="font-bold text-stone-700">{idea.location}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-stone-400 uppercase">Bring</p>
                            <p className="font-bold text-stone-700">{idea.item || "Water bottle"}</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-stone-400 uppercase">Duration</p>
                            <p className="font-bold text-stone-700">{idea.duration || "60 mins"}</p>
                        </div>
                    </div>

                    <div className="border-t border-stone-100 pt-6">
                        <p className="text-sm text-stone-400">Scan to RSVP or contact your troop leader</p>
                    </div>

                    <Button onClick={onClose} className="w-full">Close Flyer</Button>
                </div>
            </div>
        </div>
    );

    // Expanded View
    if (selectedIdea) {
        return (
            <div className="p-6 pt-8 pb-24">
                {showFlyer && <FlyerModal idea={selectedIdea} onClose={() => setShowFlyer(false)} />}

                <Button
                    variant="ghost"
                    onClick={() => setSelectedIdea(null)}
                    className="mb-4 text-stone-500 hover:text-stone-800 pl-0"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back to Ideas
                </Button>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100">
                    <div className="p-6 border-b border-stone-100">
                        <div className="flex justify-between items-start mb-2">
                            <h2 className="text-2xl font-bold text-stone-800">{selectedIdea.title}</h2>
                            <div className="flex items-center gap-1 text-yellow-500 bg-yellow-50 px-2 py-1 rounded-lg">
                                <span className="font-bold text-sm">4.8</span>
                                <Sparkles size={14} fill="currentColor" />
                            </div>
                        </div>
                        <p className="text-stone-600 leading-relaxed">{selectedIdea.description}</p>
                    </div>

                    <div className="grid grid-cols-3 divide-x divide-stone-100 border-b border-stone-100 bg-stone-50/50">
                        <div className="p-4 text-center">
                            <Clock size={20} className="mx-auto mb-1 text-emerald-600" />
                            <p className="text-xs font-bold text-stone-500">{selectedIdea.duration || "60 mins"}</p>
                        </div>
                        <div className="p-4 text-center">
                            <Users size={20} className="mx-auto mb-1 text-emerald-600" />
                            <p className="text-xs font-bold text-stone-500">{selectedIdea.groupSize || formData.numKids + " kids"}</p>
                        </div>
                        <div className="p-4 text-center">
                            <MapPin size={20} className="mx-auto mb-1 text-emerald-600" />
                            <p className="text-xs font-bold text-stone-500">{selectedIdea.location}</p>
                        </div>
                    </div>

                    <div className="p-6 space-y-8">
                        {/* Materials */}
                        <div>
                            <h3 className="flex items-center gap-2 font-bold text-stone-800 mb-3">
                                <CheckCircle2 size={18} className="text-emerald-600" /> Materials Needed
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedIdea.materialsList?.map((item, i) => (
                                    <span key={i} className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-sm font-medium border border-stone-200">
                                        {item}
                                    </span>
                                )) || <span className="text-stone-400 italic">No specific materials listed</span>}
                            </div>
                        </div>

                        {/* Safety */}
                        <div>
                            <h3 className="flex items-center gap-2 font-bold text-stone-800 mb-3">
                                <ShieldAlert size={18} className="text-emerald-600" /> Safety Considerations
                            </h3>
                            <ul className="space-y-2">
                                {selectedIdea.safetySteps?.map((step, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-1.5 shrink-0" />
                                        {step}
                                    </li>
                                )) || <li className="text-stone-400 italic">Standard safety rules apply</li>}
                            </ul>
                        </div>

                        {/* Restrictions */}
                        <div>
                            <h3 className="flex items-center gap-2 font-bold text-stone-800 mb-3">
                                <AlertTriangle size={18} className="text-emerald-600" /> Restrictions & Considerations
                            </h3>
                            <ul className="space-y-2">
                                {selectedIdea.restrictions?.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-stone-600">
                                        <span className="w-1.5 h-1.5 bg-stone-400 rounded-full mt-1.5 shrink-0" />
                                        {item}
                                    </li>
                                )) || <li className="text-stone-400 italic">No specific restrictions</li>}
                            </ul>
                        </div>

                        {/* Rating Placeholder */}
                        <div className="pt-6 border-t border-stone-100">
                            <h3 className="font-bold text-stone-800 mb-2">Rate this activity</h3>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        className="text-yellow-400 hover:scale-110 transition-transform focus:outline-none"
                                    >
                                        <Sparkles size={24} fill="currentColor" />
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-stone-400 mt-1">Click to rate</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="p-6 bg-stone-50 border-t border-stone-100 flex gap-3">
                        <Button
                            onClick={() => handleSaveActivity(selectedIdea)}
                            className={`flex-1 ${savedSuccess ? 'bg-green-600 hover:bg-green-700' : 'bg-emerald-800 hover:bg-emerald-900'}`}
                        >
                            {savedSuccess ? 'Saved!' : 'Save Activity'}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => setShowFlyer(true)}
                            className="flex-1 border-yellow-600 text-yellow-700 bg-yellow-50 hover:bg-yellow-100"
                        >
                            Generate Parent Flyer
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Results List View
    if (generatedIdeas) {
        return (
            <div className="p-6 pt-8 pb-24">
                <Button
                    variant="ghost"
                    onClick={() => setGeneratedIdeas(null)}
                    className="mb-4 text-stone-500 hover:text-stone-800 pl-0"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back to Filters
                </Button>

                <h2 className="text-2xl font-bold text-stone-800 mb-6">Generated Ideas</h2>

                <div className="space-y-6">
                    {generatedIdeas.map((idea) => (
                        <div
                            key={idea.id}
                            onClick={() => setSelectedIdea(idea)}
                            className="bg-white rounded-3xl shadow-lg p-6 border border-emerald-100 animate-in fade-in slide-in-from-bottom-4 duration-500 cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all"
                            style={{ animationDelay: `${idea.id * 100}ms` }}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-emerald-900">{idea.title}</h3>
                                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                                    {idea.location || formData.location}
                                </div>
                            </div>

                            <p className="text-stone-600 mb-4">{idea.description}</p>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3 bg-stone-50 p-3 rounded-xl">
                                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                        <Sparkles size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-stone-400 uppercase">Mission</p>
                                        <p className="font-medium text-stone-800">{idea.action}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 bg-stone-50 p-3 rounded-xl">
                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                                        <Sparkles size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-stone-400 uppercase">Twist</p>
                                        <p className="font-medium text-stone-800">{idea.constraint}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <Button className="w-full mt-8" onClick={generateIdeas}>
                    {isGenerating ? 'Regenerating...' : 'Regenerate All'}
                </Button>
            </div>
        );
    }

    // Form View
    return (
        <div className="p-6 pb-24">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-stone-800">Generate Activity Ideas</h1>
                <p className="text-stone-500 text-sm">Fill in the details below and we'll suggest perfect activities for your scouts</p>
            </div>

            {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="shrink-0 mt-0.5" size={20} />
                    <p className="text-sm">{error}</p>
                </div>
            )}

            <div className="space-y-6">
                {/* Kids & Age */}
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-1">Number of Kids</label>
                        <input
                            type="number"
                            name="numKids"
                            value={formData.numKids}
                            onChange={handleInputChange}
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-1">Minimum Age</label>
                            <input
                                type="number"
                                name="minAge"
                                value={formData.minAge}
                                onChange={handleInputChange}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-stone-700 mb-1">Maximum Age</label>
                            <input
                                type="number"
                                name="maxAge"
                                value={formData.maxAge}
                                onChange={handleInputChange}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Budget */}
                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Budget Type</label>
                    <div className="space-y-2">
                        {[
                            { id: 'money', label: 'We have money to spend on this activity' },
                            { id: 'fundraising', label: 'This activity should generate money (fundraising)' },
                            { id: 'none', label: 'No budget or fundraising needed' }
                        ].map(option => (
                            <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="budgetType"
                                    value={option.id}
                                    checked={formData.budgetType === option.id}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                                />
                                <span className="text-sm text-stone-600">{option.label}</span>
                            </label>
                        ))}
                    </div>

                    {formData.budgetType === 'money' && (
                        <div className="mt-3">
                            <label className="block text-xs font-bold text-stone-500 mb-1">Budget Available: ${formData.budgetAmount}</label>
                            <input
                                type="range"
                                name="budgetAmount"
                                min="0"
                                max="500"
                                value={formData.budgetAmount}
                                onChange={handleInputChange}
                                className="w-full accent-emerald-600"
                            />
                        </div>
                    )}
                </div>

                {/* Materials */}
                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">Materials Available (optional)</label>
                    <textarea
                        name="materials"
                        value={formData.materials}
                        onChange={handleInputChange}
                        placeholder="e.g., rope, tents, craft supplies, sports equipment..."
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                {/* Theme */}
                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">Theme (optional)</label>
                    <input
                        type="text"
                        name="theme"
                        value={formData.theme}
                        onChange={handleInputChange}
                        placeholder="e.g., nature, adventure, creativity..."
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                {/* Accessibility */}
                <div className="bg-amber-50 p-4 rounded-xl flex items-center justify-between">
                    <div>
                        <p className="font-bold text-stone-800 text-sm">Include Accessible Activities</p>
                        <p className="text-xs text-stone-500">Activities suitable for kids with disabilities</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            name="accessible"
                            checked={formData.accessible}
                            onChange={handleInputChange}
                            className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                </div>

                {/* Location & Format */}
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-1">Location</label>
                        <div className="relative">
                            <select
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option>Outdoor</option>
                                <option>Indoor</option>
                                <option>Water-based</option>
                                <option>Urban</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={16} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-stone-700 mb-1">Activity Format</label>
                        <div className="relative">
                            <select
                                name="format"
                                value={formData.format}
                                onChange={handleInputChange}
                                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            >
                                <option>Small groups (4-6 kids)</option>
                                <option>Whole troop</option>
                                <option>Pairs</option>
                                <option>Individual</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" size={16} />
                        </div>
                    </div>
                </div>

                {/* Purpose */}
                <div>
                    <label className="block text-sm font-bold text-stone-700 mb-1">Purpose of Activity (optional)</label>
                    <textarea
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleInputChange}
                        placeholder="e.g., team building, learning survival skills..."
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2 h-20 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <div className="flex gap-3 mt-6">
                    <Button
                        variant="outline"
                        onClick={handleReset}
                        className="flex-1 border-stone-300 text-stone-600 hover:bg-stone-100"
                        disabled={isGenerating}
                    >
                        <span className="flex items-center justify-center gap-2">
                            <RotateCcw size={18} /> Reset
                        </span>
                    </Button>

                    <Button
                        onClick={generateIdeas}
                        className="flex-[2] py-4 text-lg bg-yellow-600 hover:bg-yellow-700 text-white shadow-lg shadow-yellow-200"
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <span className="flex items-center justify-center gap-2">
                                <Sparkles className="animate-spin" /> Generating...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                <Sparkles /> Generate Ideas
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Generator;
