import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';

function App() {
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true); // ✅ Default: OPEN

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true); // Desktop: always open
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-sans overflow-hidden">
      
      {/* Sidebar (expandable/collapsible) */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* RIGHT CHAT AREA (flexible width) */}
      <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-sm">
        {/* Chat Header */}
        <div className="p-6 border-b border-gray-100 bg-white/50">
          <h1 className="text-2xl font-bold text-gray-900">Chat with Chintu AI</h1>
          <p className="text-gray-600 mt-1">Your interactive portfolio assistant</p>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                🤖
              </div>
              <div className="bg-white/80 p-6 rounded-2xl rounded-tl-none shadow-xl border border-gray-100/50 max-w-lg backdrop-blur-sm">
                <p className="text-gray-800 font-medium">Hello! I'm Chintu's AI Assistant.</p>
                <p className="text-gray-600 mt-2 text-sm">
                  Ask me about <span className="font-semibold text-blue-600">trading bots</span>, 
                  <span className="font-semibold text-purple-600"> ML projects</span>, 
                  or <span className="font-semibold text-green-600">experience</span>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-6 bg-white/50 border-t border-gray-100 backdrop-blur-sm">
          <div className="max-w-3xl mx-auto">
            {/* Suggestion Chips */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
              {[
                'Show projects', 
                'Tech stack?', 
                'Trading bots', 
                'Work experience', 
                'Contact info'
              ].map((chip) => (
                <button
                  key={chip}
                  className="px-4 py-2.5 text-sm bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full whitespace-nowrap transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0"
                  onClick={() => setInput(chip)}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about my work..."
                className="w-full p-4 pr-14 rounded-2xl bg-white/70 border-2 border-gray-200/50 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10 shadow-xl backdrop-blur-sm transition-all duration-200"
                onKeyDown={(e) => e.key === 'Enter' && console.log('Send:', input)}
              />
              <button 
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => console.log('Send:', input)}
              >
                →
              </button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-3 opacity-75">
              Powered by AI • Responses streamed in real-time
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
