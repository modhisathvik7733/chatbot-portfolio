import React from 'react';
import Sidebar from './components/ui/Sidebar';
import ChatInterface from './components/ui/ChatInterface';

function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <ChatInterface />
    </div>
  );
}

export default App;