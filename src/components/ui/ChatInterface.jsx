import React, { useState, useEffect } from 'react';
import { Send, Loader2, Download, Mail, Phone, Linkedin, Github, FileText } from 'lucide-react';
import { sendMessage } from '../../lib/api';
import { profileData } from '../../lib/constants';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const scrollToTop = () => {
    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = 0;
    }
  };

  useEffect(() => {
    // Only scroll to top when assistant responds with content cards
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant' && lastMessage.type !== 'text') {
        scrollToTop();
      }
    }
  }, [messages]);

  const detectMessageType = (query) => {
    const lower = query.toLowerCase();
    if (lower.includes('project')) return 'projects';
    if (lower.includes('skill') || lower.includes('technolog')) return 'skills';
    if (lower.includes('about') || lower.includes('me') || lower.includes('who')) return 'about';
    if (lower.includes('contact') || lower.includes('reach') || lower.includes('email')) return 'contact';
    if (lower.includes('resume') || lower.includes('cv')) return 'resume';
    if (lower.includes('experience') || lower.includes('work')) return 'experience';
    return 'text';
  };

  const handleQuickAction = async (action) => {
    const queries = {
      about: "Who are you? I want to know more about you.",
      projects: "What projects have you worked on?",
      skills: "What are your technical skills?",
      contact: "How can I contact you?",
      resume: "Show me your resume"
    };
    
    setShowQuickActions(false);
    await handleSend(queries[action], action);
  };

  const handleSend = async (messageText = input, forcedType = null) => {
    if (!messageText.trim() || isLoading) return;

    if (!isActive) setIsActive(true);
    setShowQuickActions(false);

    const userMessage = { role: 'user', content: messageText, type: 'text' };
    setMessages([userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const messageType = forcedType || detectMessageType(messageText);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = messageType !== 'text' 
        ? `Here's the information you requested:`
        : await sendMessage(messageText, []);
      
      setMessages([userMessage, { 
        role: 'assistant', 
        content: response,
        type: messageType,
        data: profileData
      }]);
    } catch {
      setMessages([userMessage, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.',
        type: 'text'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message) => {
    if (message.role === 'user') {
      return (
        <div className="inline-block px-4 py-2 sm:px-6 sm:py-3 bg-slate-900 text-white rounded-full text-sm sm:text-base">
          {message.content}
        </div>
      );
    }

    switch (message.type) {
      case 'about':
        return <AboutCard data={profileData} />;
      case 'projects':
        return <ProjectsCard data={profileData} />;
      case 'skills':
        return <SkillsCard data={profileData} />;
      case 'contact':
        return <ContactCard data={profileData} />;
      case 'resume':
        return <ResumeCard />;
      default:
        return <TextMessage content={message.content} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-64 h-64 sm:w-96 sm:h-96 bg-green-200/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-20 right-10 sm:top-40 sm:right-20 w-64 h-64 sm:w-96 sm:h-96 bg-blue-200/30 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-20 sm:bottom-20 sm:left-40 w-64 h-64 sm:w-96 sm:h-96 bg-purple-200/30 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen">
        {/* Initial Hero View - RESPONSIVE */}
        {!isActive && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 animate-fadeIn overflow-y-auto">
            <p className="text-lg sm:text-xl text-slate-700 mb-4 sm:mb-6 animate-wave">
              Hey, I'm sathvik-modhi 👋
            </p>
            
            <div className="mb-4 sm:mb-6 animate-float">
              <svg width="120" height="120" viewBox="0 0 300 300" className="sm:w-[180px] sm:h-[180px] drop-shadow-2xl">
                <circle cx="150" cy="150" r="140" fill="#fff" opacity="0.9"/>
                <circle cx="150" cy="100" r="60" fill="#000"/>
                <ellipse cx="135" cy="90" rx="8" ry="12" fill="#000"/>
                <ellipse cx="165" cy="90" rx="8" ry="12" fill="#000"/>
                <path d="M130 110 Q150 120 170 110" stroke="#000" strokeWidth="3" fill="none"/>
                <path d="M100 60 Q150 20 200 60" fill="#000"/>
              </svg>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 sm:mb-6 text-center px-4">
              Machine Learning Engineer
            </h1>

            <div className="w-full max-w-2xl mt-4 sm:mt-8 mb-6 sm:mb-10 px-4">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="w-full px-4 py-3 sm:px-6 sm:py-4 rounded-full bg-white/60 backdrop-blur-xl border-2 border-white/40 focus:border-white/60 focus:outline-none shadow-2xl text-sm sm:text-base placeholder:text-slate-400"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-full shadow-lg transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-3xl px-4">
              {[
                { id: 'about', icon: '😊', label: 'Me' },
                { id: 'projects', icon: '💼', label: 'Projects' },
                { id: 'skills', icon: '🎯', label: 'Skills' },
                { id: 'contact', icon: '📧', label: 'Contact' },
                { id: 'resume', icon: '📄', label: 'Resume' }
              ].map((action) => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className="group px-4 py-3 sm:px-7 sm:py-5 bg-white/40 backdrop-blur-xl border-2 border-white/40 hover:border-white/60 rounded-2xl sm:rounded-3xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
                >
                  <div className="flex flex-col items-center gap-1 sm:gap-2">
                    <span className="text-2xl sm:text-4xl">{action.icon}</span>
                    <span className="text-xs sm:text-base font-bold text-slate-800">{action.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Active Chat View */}
        {isActive && (
          <>
            {/* Header */}
            <div className="px-3 py-2 sm:px-6 sm:py-3 flex items-center justify-center border-b border-white/20 bg-white/20 backdrop-blur-sm">
              <div className="flex items-center gap-2 sm:gap-3">
                <svg width="35" height="35" viewBox="0 0 100 100" className="sm:w-[45px] sm:h-[45px] drop-shadow-lg">
                  <circle cx="50" cy="50" r="48" fill="#fff" opacity="0.9"/>
                  <circle cx="50" cy="35" r="20" fill="#000"/>
                  <ellipse cx="45" cy="32" rx="3" ry="4" fill="#000"/>
                  <ellipse cx="55" cy="32" rx="3" ry="4" fill="#000"/>
                  <path d="M43 38 Q50 42 57 38" stroke="#000" strokeWidth="2" fill="none"/>
                  <path d="M35 20 Q50 10 65 20" fill="#000"/>
                </svg>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">Sathvik Modhi</h2>
                  <p className="text-xs sm:text-sm text-slate-600">ML Engineer</p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-2 py-3 sm:px-4 sm:py-6 messages-container">
              <div className="max-w-5xl mx-auto space-y-3 sm:space-y-6">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-center'} animate-slideUp`}
                  >
                    {renderMessage(message)}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-center animate-fadeIn">
                    <div className="flex gap-2 px-4 py-3 sm:px-6 sm:py-4 bg-white/60 backdrop-blur-xl rounded-full shadow-xl">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-slate-700 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-slate-700 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-slate-700 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Input Area */}
            <div className="px-2 py-2 sm:px-4 sm:py-3 bg-white/30 backdrop-blur-xl border-t border-white/30">
              <div className="max-w-4xl mx-auto">
                {/* Quick Actions - Show on focus */}
                {showQuickActions && (
                  <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-2 animate-fadeIn">
                    {[
                      { id: 'about', icon: '😊', label: 'Me' },
                      { id: 'projects', icon: '💼', label: 'Projects' },
                      { id: 'skills', icon: '🎯', label: 'Skills' },
                      { id: 'contact', icon: '📧', label: 'Contact' },
                      { id: 'resume', icon: '📄', label: 'Resume' }
                    ].map((action) => (
                      <button
                        key={action.id}
                        onClick={() => handleQuickAction(action.id)}
                        disabled={isLoading}
                        className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 bg-white/60 backdrop-blur-xl border border-white/40 hover:border-white/60 rounded-full transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 disabled:opacity-50 flex items-center gap-1 sm:gap-1.5"
                      >
                        <span className="text-xs sm:text-sm">{action.icon}</span>
                        <span className="text-xs font-semibold text-slate-800">{action.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Box */}
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    onFocus={() => setShowQuickActions(true)}
                    onBlur={() => setTimeout(() => setShowQuickActions(false), 200)}
                    placeholder="Ask me anything..."
                    className="w-full px-3 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white/70 backdrop-blur-xl border-2 border-white/40 focus:border-white/60 focus:outline-none shadow-lg text-xs sm:text-sm placeholder:text-slate-400 pr-10 sm:pr-12"
                    disabled={isLoading}
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-1.5 sm:right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {isLoading ? <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" /> : <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Message Components
function TextMessage({ content }) {
  return (
    <div className="px-4 py-3 sm:px-8 sm:py-6 bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl border-2 border-white/40 max-w-3xl">
      <p className="text-slate-800 text-sm sm:text-base leading-relaxed">{content}</p>
    </div>
  );
}

function AboutCard({ data }) {
  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border-2 border-white/40 max-w-5xl animate-slideUp w-full">
      <div className="flex flex-col md:flex-row items-start gap-4 sm:gap-6 mb-3 sm:mb-4">
        <svg width="100" height="100" viewBox="0 0 200 200" className="sm:w-[140px] sm:h-[140px] flex-shrink-0 mx-auto md:mx-0">
          <circle cx="100" cy="100" r="95" fill="#fff"/>
          <circle cx="100" cy="70" r="40" fill="#000"/>
          <ellipse cx="90" cy="65" rx="6" ry="9" fill="#000"/>
          <ellipse cx="110" cy="65" rx="6" ry="9" fill="#000"/>
          <path d="M85 80 Q100 88 115 80" stroke="#000" strokeWidth="3" fill="none"/>
          <path d="M70 40 Q100 20 130 40" fill="#000"/>
        </svg>
        <div className="flex-1 text-center md:text-left w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-1">{data.name}</h2>
          <p className="text-base sm:text-lg text-slate-600 mb-2 sm:mb-3">{data.location}</p>
          <p className="text-sm sm:text-base text-slate-700 mb-2 sm:mb-3 leading-snug">{data.longBio}</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center md:justify-start">
            {data.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-slate-900 text-white text-xs sm:text-sm font-medium rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-4 bg-slate-900/5 rounded-xl sm:rounded-2xl border border-slate-200/50">
        <p className="text-slate-700 text-xs sm:text-sm leading-relaxed">{data.bio}</p>
      </div>
    </div>
  );
}

function ProjectsCard({ data }) {
  return (
    <div className="space-y-3 sm:space-y-4 max-w-5xl animate-slideUp w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {data.projects.map((project) => (
          <div
            key={project.id}
            className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white bg-gradient-to-br ${project.gradient} shadow-xl hover:scale-105 transition-transform duration-300 backdrop-blur-xl`}
          >
            <p className="text-xs sm:text-sm font-medium opacity-90 mb-1 sm:mb-2">{project.category}</p>
            <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{project.name}</h4>
            <p className="text-xs sm:text-sm opacity-90 mb-3 sm:mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {project.tech.slice(0, 3).map((tech) => (
                <span key={tech} className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsCard({ data }) {
  const categories = [
    { title: 'Frontend', skills: data.skills.frontend },
    { title: 'Backend', skills: data.skills.backend },
    { title: 'ML/AI', skills: data.skills.ml },
    { title: 'Cloud', skills: data.skills.cloud }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-5xl animate-slideUp w-full">
      {categories.map((cat) => (
        <div key={cat.title} className="bg-white/60 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl border-2 border-white/40">
          <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4">{cat.title}</h4>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {cat.skills.map((skill) => (
              <span key={skill} className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-slate-900 text-white text-xs sm:text-sm rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactCard({ data }) {
  const contacts = [
    { icon: Mail, label: 'Email', value: data.email, href: `mailto:${data.email}`, color: 'from-green-500 to-emerald-600' },
    { icon: Phone, label: 'Phone', value: data.phone, href: `tel:${data.phone}`, color: 'from-blue-500 to-blue-600' },
    { icon: Linkedin, label: 'LinkedIn', value: 'sathvik-modhi', href: data.linkedin, color: 'from-blue-600 to-blue-700' },
    { icon: Github, label: 'GitHub', value: 'modhisathvik7733', href: data.github, color: 'from-slate-700 to-slate-900' }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-4xl animate-slideUp w-full">
      {contacts.map((contact) => {
        const Icon = contact.icon;
        return (
          <a
            key={contact.label}
            href={contact.href}
            target={contact.href.startsWith('http') ? '_blank' : undefined}
            rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`group flex items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-gradient-to-br ${contact.color} text-white rounded-xl sm:rounded-2xl shadow-xl hover:scale-105 transition-all duration-300 backdrop-blur-xl`}
          >
            <div className="w-11 h-11 sm:w-14 sm:h-14 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div className="min-w-0">
              <p className="text-xs sm:text-sm font-medium opacity-90">{contact.label}</p>
              <p className="text-sm sm:text-lg font-bold truncate">{contact.value}</p>
            </div>
          </a>
        );
      })}
    </div>
  );
}

function ResumeCard() {
  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl border-2 border-white/40 max-w-2xl animate-slideUp w-full">
      <div className="flex items-start gap-4 sm:gap-6">
        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-indigo-100 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
          <FileText className="w-7 h-7 sm:w-10 sm:h-10 text-indigo-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-1 sm:mb-2">Machine Learning Engineer Resume</h3>
          <p className="text-sm sm:text-base text-slate-700 mb-3 sm:mb-4">Comprehensive resume with AI/ML expertise</p>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-sm sm:text-base font-medium transition-all duration-200 shadow-lg"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;