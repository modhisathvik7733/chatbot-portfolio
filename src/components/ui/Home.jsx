import React, { useState } from 'react';
import { profileData } from '../../lib/constants';

function Home({ onNavigate, onSendMessage }) {
  const [input, setInput] = useState('');

  const handleAsk = () => {
    if (input.trim()) {
      onSendMessage(input);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Avatar */}
        <div className="relative inline-block">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-6xl font-bold shadow-2xl border-8 border-white text-white mx-auto">
            SM
          </div>
          <div className="absolute -top-4 -right-4 text-5xl animate-wave">
            👋
          </div>
        </div>

        {/* Header */}
        <div>
          <h2 className="text-2xl text-slate-600 mb-2">Hey, I'm {profileData.name.split(' ')[0].toLowerCase()}</h2>
          <h1 className="text-6xl font-bold text-slate-900 mb-4">
            Machine Learning Engineer
          </h1>
        </div>

        {/* Chat Input */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="Ask me anything..."
              className="w-full px-6 py-4 pr-14 rounded-full bg-white border-2 border-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 shadow-lg text-lg"
            />
            <button
              onClick={handleAsk}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full shadow-lg transition-all duration-200"
            >
              →
            </button>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="flex flex-wrap justify-center gap-4 pt-8">
          {[
            { icon: '😊', label: 'Me', section: 'about' },
            { icon: '💼', label: 'Projects', section: 'projects' },
            { icon: '🎯', label: 'Skills', section: 'skills' },
            { icon: '📧', label: 'Contact', section: 'contact' },
            { icon: '📄', label: 'Resume', section: 'resume' }
          ].map((item) => (
            <button
              key={item.section}
              onClick={() => onNavigate(item.section)}
              className="flex flex-col items-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 rounded-2xl border-2 border-slate-200 hover:border-indigo-300 transition-all duration-200 shadow-md hover:shadow-xl hover:scale-105"
            >
              <span className="text-3xl">{item.icon}</span>
              <span className="text-sm font-semibold text-slate-700">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;