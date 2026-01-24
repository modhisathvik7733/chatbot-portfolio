import React, { useState, useEffect } from 'react';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Open by default on desktop (screen width >= 768px)
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle button - visible on all screens */}
      <button
        className={`fixed top-6 z-50 p-3 bg-white text-slate-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-indigo-300 ${isOpen ? 'left-72' : 'left-6'
          }`}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-5 h-5 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-all duration-500 ease-in-out w-80 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="h-full bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 text-slate-800 p-8 flex flex-col shadow-2xl border-r border-slate-200 relative overflow-hidden">

          {/* Subtle background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-100/40 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl pointer-events-none"></div>

          {/* Profile section */}
          <div className="flex flex-col items-center mb-10 relative z-10">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-full blur-md opacity-20"></div>
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-700 flex items-center justify-center text-4xl font-bold shadow-lg border-4 border-white text-white">
                SM
              </div>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Sathvik Modhi
            </h1>
            <p className="text-indigo-600 text-sm font-bold tracking-wide mb-3 bg-indigo-50 px-3 py-1 rounded-full">Software Engineer - AI/ML Platform</p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-lg border border-indigo-200">
                AI/ML
              </span>
              <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-lg border border-blue-200">
                Full Stack
              </span>
            </div>
          </div>

          {/* Info section */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent relative z-10">
            <div className="space-y-3 mb-8">
              <div className="group p-4 rounded-xl bg-white hover:bg-gradient-to-br hover:from-indigo-50 hover:to-white transition-all duration-300 border border-slate-200 hover:border-indigo-200 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-base">LTIMindtree</p>
                    <p className="text-sm text-slate-600 mt-0.5">Sep 2022 - Oct 2025</p>
                    <p className="text-sm text-slate-500 mt-1">Hyderabad · Bengaluru</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social links and Resume */}
          <div className="flex flex-col gap-3 pt-6 border-t border-slate-200 relative z-10">
            <a
              href="/resume.pdf"
              download
              className="group flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="font-medium text-sm">Download Resume</span>
              </div>
              <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </a>

            <a
              href="https://github.com/modhisathvik7733"
              className="group flex items-center justify-between px-5 py-3.5 bg-white hover:bg-slate-50 rounded-lg transition-all duration-200 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md hover:scale-[1.02]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="font-medium text-sm text-slate-700">GitHub</span>
              </div>
              <svg className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="https://linkedin.com/in/sathvik-modhi"
              className="group flex items-center justify-between px-5 py-3.5 bg-white hover:bg-blue-50 rounded-lg transition-all duration-200 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md hover:scale-[1.02]"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="font-medium text-sm text-slate-700">LinkedIn</span>
              </div>
              <svg className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <a
              href="mailto:modhsathvik@gmail.com"
              className="group flex items-center justify-between px-5 py-3.5 bg-white hover:bg-emerald-50 rounded-lg transition-all duration-200 border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-md hover:scale-[1.02]"
            >
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium text-sm text-slate-700">Email</span>
              </div>
              <svg className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Spacer div to push content right when sidebar is open */}
      <div
        className={`transition-all duration-500 ease-in-out ${isOpen ? 'w-80' : 'w-0'
          }`}
      />
    </>
  );
}

export default Sidebar;