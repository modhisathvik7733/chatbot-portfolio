import React from 'react';

function Layout({ children, currentSection, onNavigate }) {
  const navigation = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'Me', icon: '😊' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '🎯' },
    { id: 'contact', label: 'Contact', icon: '📧' },
    { id: 'resume', label: 'Resume', icon: '📄' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Floating Avatar (top right on all pages except home) */}
      {currentSection !== 'home' && currentSection !== 'chat' && (
        <div className="fixed top-8 right-8 z-50">
          <button
            onClick={() => onNavigate('home')}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-2xl font-bold shadow-2xl border-4 border-white text-white hover:scale-110 transition-transform duration-200"
          >
            SM
          </button>
        </div>
      )}

      {/* Fixed Bottom Navigation (Mobile/Desktop) */}
      {currentSection !== 'home' && currentSection !== 'chat' && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-2 px-6 py-4 bg-white/90 backdrop-blur-lg rounded-full shadow-2xl border border-slate-200">
            {navigation.slice(1).map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                  currentSection === item.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'hover:bg-slate-100 text-slate-600'
                }`}
                title={item.label}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-medium hidden sm:block">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pb-32">
        {children}
      </main>
    </div>
  );
}

export default Layout;