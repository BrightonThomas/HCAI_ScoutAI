import React, { useState } from 'react';
import Layout from './components/Layout';
import Generator from './pages/Generator';
import EventCollaboration from './pages/EventCollaboration';
import Community from './pages/Community';
import Profile from './pages/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('generator');

  // Generator State
  const [generatorState, setGeneratorState] = useState({
    formData: {
      numKids: '10',
      minAge: '8',
      maxAge: '12',
      budgetType: 'money',
      budgetAmount: 50,
      materials: '',
      theme: '',
      accessible: false,
      disability: '',
      region: '',
      location: 'Outdoor',
      format: 'Small groups',
      purpose: ''
    },
    generatedIdeas: null,
    selectedIdea: null,
    isGenerating: false,
    error: null
  });

  const updateGeneratorState = (updates) => {
    setGeneratorState(prev => ({ ...prev, ...updates }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'generator':
        return (
          <Generator
            state={generatorState}
            updateState={updateGeneratorState}
            setActiveTab={setActiveTab}
          />
        );
      case 'events':
        return <EventCollaboration />;
      case 'community':
        return <Community />;
      case 'profile':
        return (
          <Profile
            generatorState={generatorState}
            updateGeneratorState={updateGeneratorState}
            setActiveTab={setActiveTab}
          />
        );
      default:
        return <Generator />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

export default App;
