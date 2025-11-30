import React, { useState } from 'react';
import Layout from './components/Layout';
import Generator from './pages/Generator';
import EventCollaboration from './pages/EventCollaboration';
import Community from './pages/Community';
import Profile from './pages/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('generator');

  const renderContent = () => {
    switch (activeTab) {
      case 'generator':
        return <Generator />;
      case 'events':
        return <EventCollaboration />;
      case 'community':
        return <Community />;
      case 'profile':
        return <Profile />;
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
