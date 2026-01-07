import React from 'react';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';

function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <ChatInterface />
    </div>
  );
}

export default App;