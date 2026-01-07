import React from 'react';
import { profileData } from '../../lib/constants';

function Projects({ onSendMessage }) {
  return (
    <div className="min-h-screen p-8 pt-24">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-slate-900 mb-12">My Projects</h1>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {profileData.projects.map((project) => (
            <div
              key={project.id}
              className={`relative rounded-3xl p-8 text-white bg-gradient-to-br ${project.gradient} shadow-2xl hover:scale-105 transition-transform duration-300 overflow-hidden`}
            >
              <div className="relative z-10">
                <p className="text-sm font-medium opacity-90 mb-2">{project.category}</p>
                <h3 className="text-2xl font-bold mb-4">{project.name}</h3>
                <p className="text-sm opacity-90 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Description */}
        <div className="text-center">
          <p className="text-lg text-slate-700 mb-6">
            I've worked on several exciting projects, and you can find the details above! Currently, I'm focused
            on enhancing my AI-powered financial assistant application, aiming to improve its capabilities and
            user experience further.
          </p>
          <button
            onClick={() => onSendMessage("Tell me more about your projects")}
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Learn More →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Projects;