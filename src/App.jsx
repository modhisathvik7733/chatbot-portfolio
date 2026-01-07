import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* LEFT SIDEBAR */}
      <div className="w-1/3 bg-gray-900 text-white p-8 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-xl font-bold">
              IMG
            </div>
            <div>
              <h1 className="text-2xl font-bold">Chintu</h1>
              <p className="text-gray-400">AI/ML Engineer</p>
            </div>
          </div>

          <div className="space-y-4 text-gray-300">
            <p>📍 Telangana, IN</p>
            <p>🚀 Building AI at LTIMindtree</p>
            <p>💡 Quantitative Trading & ML</p>
          </div>
        </div>

        <div className="flex gap-4">
          <button className="px-3 py-2 bg-gray-800 rounded-md text-sm">GitHub</button>
          <button className="px-3 py-2 bg-gray-800 rounded-md text-sm">LinkedIn</button>
          <button className="px-3 py-2 bg-gray-800 rounded-md text-sm">Resume</button>
        </div>
      </div>

      {/* RIGHT CHAT AREA */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs">🤖</div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-lg">
                <p className="text-gray-800">Hello! I'm Chintu&apos;s AI Assistant.</p>
                <p className="text-gray-600 mt-1">
                  Ask me about trading bots, ML projects, or experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* INPUT BAR */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
              {['Show projects', 'Tech stack?', 'Contact info'].map((chip) => (
                <button
                  key={chip}
                  className="px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 whitespace-nowrap transition"
                >
                  {chip}
                </button>
              ))}
            </div>

            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about my work..."
                className="w-full p-4 pr-12 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button className="absolute right-3 top-3.5 p-1 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                Send
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">
              Powered by AI • Responses may be generated
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
