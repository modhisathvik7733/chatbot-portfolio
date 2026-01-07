import React from 'react';
import { profileData } from '../../lib/constants';

function Skills({ onSendMessage }) {
  const skillCategories = [
    { title: 'Frontend', icon: '🎨', skills: profileData.skills.frontend },
    { title: 'Backend', icon: '⚙️', skills: profileData.skills.backend },
    { title: 'Machine Learning', icon: '🤖', skills: profileData.skills.ml },
    { title: 'Cloud', icon: '☁️', skills: profileData.skills.cloud },
    { title: 'Tools', icon: '🛠️', skills: profileData.skills.tools }
  ];

  return (
    <div className="min-h-screen p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-slate-900 mb-12">Skills & Expertise</h1>

        {/* Skill Categories */}
        <div className="space-y-8">
          {skillCategories.map((category) => (
            <div key={category.title} className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">{category.icon}</span>
                <h2 className="text-2xl font-bold text-slate-900">{category.title}</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-full hover:scale-105 transition-transform duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Ask Question */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onSendMessage("What are your strongest technical skills?")}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Ask About My Skills →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Skills;