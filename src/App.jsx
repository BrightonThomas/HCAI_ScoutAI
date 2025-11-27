import React, { useState } from 'react';
import Layout from './components/Layout';
import Generator from './pages/Generator';
import Media from './pages/Media';
import Community from './pages/Community';
import Profile from './pages/Profile';

function App() {
  const [activeTab, setActiveTab] = useState('generator');

  const renderContent = () => {
    switch (activeTab) {
      case 'generator':
        return <Generator />;
      case 'media':
        return <Media />;
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
