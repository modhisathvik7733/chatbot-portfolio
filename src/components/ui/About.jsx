import React from 'react';
import { profileData } from '../../lib/constants';

function About({ onSendMessage }) {
  return (
    <div className="min-h-screen p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header with Avatar */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-48 h-48 rounded-full bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-6xl font-bold shadow-2xl border-8 border-white text-white flex-shrink-0">
            SM
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-5xl font-bold text-slate-900 mb-3">{profileData.name}</h1>
            <p className="text-2xl text-slate-600 mb-4">{profileData.location}</p>
            <p className="text-lg text-slate-700 leading-relaxed">{profileData.longBio}</p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-12">
          {profileData.tags.map((tag) => (
            <span
              key={tag}
              className="px-6 py-3 bg-slate-900 text-white text-sm font-medium rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bio */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
          <p className="text-lg text-slate-700 leading-relaxed">
            {profileData.bio}
          </p>
        </div>

        {/* Ask Question */}
        <div className="mt-8 text-center">
          <p className="text-slate-600 mb-4">What specific aspects would you like to know more about?</p>
          <button
            onClick={() => onSendMessage("Tell me more about your experience")}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Ask me anything →
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;