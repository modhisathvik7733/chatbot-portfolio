import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader2, Download, Mail, Phone, Linkedin, Github, FileText, ChevronRight, ExternalLink, Code2, Briefcase, User, Cpu } from 'lucide-react';
import { sendMessage } from '../../lib/api';
import { profileData } from '../../lib/constants';
import resumePDF from '../../assets/Sathvik_Modhi_Resume.pdf';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const detectMessageType = (query) => {
    const lower = query.toLowerCase();
    if (lower.includes('project')) return 'projects';
    if (lower.includes('skill') || lower.includes('technolog') || lower.includes('stack')) return 'skills';
    if (lower.includes('about') || lower.includes('me') || lower.includes('who')) return 'about';
    if (lower.includes('contact') || lower.includes('reach') || lower.includes('email')) return 'contact';
    if (lower.includes('resume') || lower.includes('cv')) return 'resume';
    if (lower.includes('experience') || lower.includes('work') || lower.includes('job') || lower.includes('career')) return 'experience';
    if (lower.includes('hire') || lower.includes('why')) return 'whyhire';
    return 'text';
  };

  const handleQuickAction = async (action) => {
    const queries = {
      about: "Tell me about your professional background and expertise.",
      experience: "What are your key career highlights and experience?",
      projects: "Showcase your top technical projects and innovations.",
      skills: "What is your complete technical stack?",
      contact: "How can I get in touch for opportunities?",
      resume: "Please provide your resume for download.",
      whyhire: "Why should I hire you?"
    };

    setShowQuickActions(false);

    if (action === 'resume') {
      if (!isActive) setIsActive(true);
      const userMessage = { role: 'user', content: queries[action], type: 'text' };
      setMessages(prev => [
        ...prev,
        userMessage,
        {
          role: 'assistant',
          content: "Here's my comprehensive resume:",
          type: 'resume',
          data: profileData
        }
      ]);
      return;
    }

    if (action === 'whyhire') {
      if (!isActive) setIsActive(true);
      const userMessage = { role: 'user', content: queries[action], type: 'text' };
      setMessages(prev => [
        ...prev,
        userMessage,
        {
          role: 'assistant',
          content: "Great question! Here's why I'd be a valuable addition to your team:",
          type: 'whyhire',
          data: profileData
        }
      ]);
      return;
    }

    await handleSend(queries[action], action);
  };

  const handleSend = async (messageText = input, forcedType = null) => {
    if (!messageText.trim() || isLoading) return;

    if (!isActive) setIsActive(true);
    setShowQuickActions(false);

    const userMessage = { role: 'user', content: messageText, type: 'text' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const messageType = forcedType || detectMessageType(messageText);
      await new Promise(resolve => setTimeout(resolve, 800)); // Slightly longer natural pause

      const responseContent = messageType !== 'text'
        ? `I've pulled up that information for you.`
        : await sendMessage(messageText, []);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: responseContent,
        type: messageType,
        data: profileData
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "I encountered a hiccup, but you can view my full details in the resume section below.",
        type: 'resume',
        data: profileData
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message) => {
    if (message.role === 'user') {
      return (
        <div className="flex justify-end">
          <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl rounded-tr-none shadow-lg max-w-[85%] sm:max-w-[70%] text-sm sm:text-base leading-relaxed animate-slideUp">
            {message.content}
          </div>
        </div>
      );
    }

    // Assistant Message Wrapper
    return (
      <div className="flex flex-col gap-4 animate-slideUp w-full">
        {message.content && (
          <div className="flex gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md transform translate-y-1">
              <Code2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 text-slate-700 text-sm sm:text-base leading-relaxed max-w-[85%]">
              {message.content}
            </div>
          </div>
        )}

        {/* Rich Content Cards */}
        <div className="pl-0 sm:pl-12 w-full custom-fade-in">
          {(() => {
            switch (message.type) {
              case 'about': return <AboutCard data={profileData} />;
              case 'experience': return <ExperienceCard data={profileData} />;
              case 'projects': return <ProjectsCard data={profileData} />;
              case 'skills': return <SkillsCard data={profileData} />;
              case 'contact': return <ContactCard data={profileData} />;
              case 'resume': return <ResumeCard />;
              case 'whyhire': return <WhyHireMeCard data={profileData} />;
              default: return null;
            }
          })()}
        </div>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#FDFDFD] overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">

      {/* Premium Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.08),transparent_50%)]"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-100/40 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute top-[40%] left-[-10%] w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-blue-100/40 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoOTksIDEwMiwgMjQxLCAwLjA1KSIvPjwvc3ZnPg==')] opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col h-screen max-w-7xl mx-auto">

        {/* Header - Only visible when active */}
        {isActive && (
          <header className="flex-none px-6 py-4 flex items-center justify-between border-b border-slate-100/80 bg-white/60 backdrop-blur-xl sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-indigo-900 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
                SM
              </div>
              <div>
                <h1 className="font-bold text-slate-900 text-sm">Sathvik Modhi</h1>
                <p className="text-xs text-indigo-600 font-medium">Chat Portfolio</p>
              </div>
            </div>
            <button
              onClick={() => { setIsActive(false); setMessages([]); }}
              className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
            </button>
          </header>
        )}

        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent ${!isActive ? 'flex items-center justify-center' : ''}`}>

          {/* Hero Section (Inactive State) */}
          {!isActive && (
            <div className="w-full max-w-3xl px-6 flex flex-col items-center text-center animate-fadeIn">
              <div className="mb-8 relative group">
                <div className="absolute inset-0 bg-indigo-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-white p-1.5 shadow-2xl relative overflow-hidden">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-5xl sm:text-6xl text-white font-bold bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black">
                    SM
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg">
                  <div className="bg-green-500 w-4 h-4 rounded-full border-2 border-white animate-pulse"></div>
                </div>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight mb-4">
                Hello, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Sathvik</span>
              </h1>
              <p className="text-lg sm:text-2xl text-slate-600 mb-10 max-w-2xl font-light">
                An AI/ML Engineer crafting intelligent systems with <span className="font-semibold text-slate-800">Generative AI</span> and <span className="font-semibold text-slate-800">Machine Learning</span>.
              </p>

              <div className="w-full max-w-xl relative group z-20">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-white rounded-2xl shadow-xl shadow-indigo-500/10 flex items-center p-2 border border-slate-100 transition-transform group-hover:-translate-y-1 duration-300">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask about my projects, skills, or experience..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 px-4 py-3 text-lg"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSend()}
                    disabled={!input.trim()}
                    className="p-3 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="mt-12 flex flex-wrap justify-center gap-3">
                {[
                  { id: 'projects', label: 'View Projects', icon: Code2 },
                  { id: 'experience', label: 'My Experience', icon: Briefcase },
                  { id: 'about', label: 'About Me', icon: User },
                  { id: 'skills', label: 'Technical Skills', icon: Cpu },
                  { id: 'resume', label: 'Resume', icon: FileText }
                ].map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleQuickAction(action.id)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 rounded-full text-slate-600 hover:text-indigo-700 transition-all duration-300 shadow-sm hover:shadow-md font-medium text-sm"
                  >
                    <action.icon className="w-4 h-4" />
                    {action.label}
                  </button>
                ))}
              </div>

              {/* Why Hire Me - Special CTA */}
              <div className="mt-8">
                <button
                  onClick={() => handleQuickAction('whyhire')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                  <span className="relative flex items-center gap-3">
                    <span className="text-2xl">✨</span>
                    Why Hire Me?
                    <span className="text-2xl">🚀</span>
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Messages List (Active State) */}
          {isActive && (
            <div className="w-full max-w-4xl mx-auto px-4 py-8 pb-32">
              <div className="space-y-8">
                {messages.map((msg, idx) => (
                  <React.Fragment key={idx}>
                    {renderMessage(msg)}
                  </React.Fragment>
                ))}
                {isLoading && (
                  <div className="flex flex-col gap-4 animate-slideUp w-full">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin" />
                      </div>
                      <div className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex items-center gap-2">
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></span>
                        <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}
        </main>

        {/* Footer Input (Active) */}
        {isActive && (
          <footer className="flex-none p-4 pb-6 bg-white/70 backdrop-blur-xl border-t border-slate-200/60 sticky bottom-0 z-20">
            <div className="max-w-4xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl blur-lg group-hover:bg-indigo-500/20 transition-all duration-300"></div>
                <div className="relative flex items-center bg-white rounded-2xl border border-slate-200 shadow-sm focus-within:border-indigo-300 focus-within:shadow-indigo-500/10 transition-all duration-300">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 bg-transparent border-none focus:ring-0 px-6 py-4 text-slate-800 placeholder:text-slate-400"
                    disabled={isLoading}
                  />
                  <div className="pr-2 flex items-center gap-2">
                    <button
                      onClick={() => handleSend()}
                      disabled={!input.trim() || isLoading}
                      className="p-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:hover:bg-slate-900"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex justify-center gap-3 overflow-x-auto py-1 scrollbar-hide">
                {Object.keys({
                  about: "About",
                  projects: "Projects",
                  experience: "Experience",
                  skills: "Skills",
                  contact: "Contact"
                }).map(key => (
                  <button
                    key={key}
                    onClick={() => handleQuickAction(key)}
                    className="whitespace-nowrap px-4 py-1.5 bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 text-xs font-medium rounded-full transition-colors border border-slate-200/60"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

// --- Sub-components for Cards ---

function AboutCard({ data }) {
  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-indigo-100/50 border border-indigo-50/50">
      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative group flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-duration-500"></div>
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-slate-900 border-[6px] border-white shadow-2xl overflow-hidden flex items-center justify-center text-white text-5xl font-bold">
            SM
          </div>
        </div>
        <div className="text-center md:text-left space-y-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-2">{data.name}</h2>
            <p className="text-indigo-600 font-medium text-lg">{data.title}</p>
            <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2 mt-1">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
              {data.location}
            </p>
          </div>
          <p className="text-slate-600 leading-relaxed text-lg">{data.bio}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            {data.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg border border-slate-200">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({ data }) {
  return (
    <div className="bg-white rounded-3xl p-2 shadow-xl shadow-indigo-100/50 border border-indigo-50/50 overflow-hidden">
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 sm:p-8 rounded-2xl text-white mb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold">{data.experience.role}</h3>
            <p className="text-indigo-300 font-medium text-lg">{data.experience.company}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-medium border border-white/10">
            {data.experience.duration}
          </div>
        </div>
        <ul className="space-y-4">
          {data.experience.highlights.slice(0, 3).map((item, i) => ( // Show top 3 initially
            <li key={i} className="flex gap-4">
              <div className="w-6 h-6 rounded-full bg-indigo-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-indigo-300">
                <ChevronRight className="w-4 h-4" />
              </div>
              <p className="text-slate-300 leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 text-center">
        <p className="text-slate-500 text-sm italic">Showing key highlights. Download resume for full details.</p>
      </div>
    </div>
  );
}

function ProjectsCard({ data }) {
  return (
    <div className="flex flex-col gap-6 w-full">
      {data.projects.map((project, idx) => (
        <div key={idx} className="group bg-white rounded-3xl p-1 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 border border-slate-100">
          <div className={`p-6 sm:p-8 rounded-[20px] bg-gradient-to-br ${project.gradient || 'from-slate-50 to-slate-100'} h-full relative overflow-hidden`}>
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-lg text-xs font-bold uppercase tracking-wider">
                  {project.category}
                </span>
                <div className="flex gap-2">
                  {project.links?.github && (
                    <a href={project.links.github} target="_blank" rel="noreferrer" className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {project.links?.demo && project.links.demo !== "#" && (
                    <a href={project.links.demo} target="_blank" rel="noreferrer" className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3">{project.name}</h3>
              <p className="text-white/80 mb-6 leading-relaxed bg-black/5 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                {project.description}
              </p>

              <div className="space-y-3">
                {project.highlights.slice(0, 2).map((h, i) => (
                  <div key={i} className="flex gap-3 text-white/90 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 bg-white/60 rounded-full"></span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2 pt-6 border-t border-white/10">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 bg-black/20 text-white/90 text-xs rounded-full font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SkillsCard({ data }) {
  const categories = [
    { title: 'Machine Learning & AI', skills: data.skills.ml_dl || data.skills.ml, icon: Cpu, color: 'text-indigo-600', bg: 'bg-indigo-50 border-indigo-100' },
    { title: 'Frontend & Backend Development', skills: data.skills.languages, icon: Code2, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
    { title: 'Cloud & MLOps', skills: data.skills.deployment, icon: ExternalLink, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' }
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {categories.map((cat, idx) => (
        <div key={idx} className={`p-6 rounded-2xl border ${cat.bg} shadow-sm hover:shadow-md transition-shadow`}>
          <div className="flex items-center gap-3 mb-4">
            <cat.icon className={`w-6 h-6 ${cat.color}`} />
            <h3 className="font-bold text-slate-800">{cat.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {(cat.skills || []).map(skill => (
              <span key={skill} className="px-3 py-1.5 bg-white rounded-lg text-sm font-medium text-slate-700 shadow-sm border border-slate-100 hover:text-indigo-600 hover:border-indigo-200 transition-colors cursor-default">
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
  return (
    <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-8 text-white shadow-xl">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold mb-2">Let's Connect</h3>
        <p className="text-indigo-200">I'm always open to discussing new projects and opportunities.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <a href={`mailto:${data.email}`} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Email</p>
            <p className="font-medium truncate max-w-[160px]">{data.email}</p>
          </div>
        </a>
        <a href={`tel:${data.phone}`} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
          <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Phone</p>
            <p className="font-medium">{data.phone}</p>
          </div>
        </a>
        <a href={data.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
            <Linkedin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">LinkedIn</p>
            <p className="font-medium">Connect with me</p>
          </div>
        </a>
        <a href={data.github} target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
          <div className="w-10 h-10 rounded-full bg-slate-500/20 flex items-center justify-center text-slate-400">
            <Github className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">GitHub</p>
            <p className="font-medium">View my code</p>
          </div>
        </a>
      </div>
    </div>
  );
}

function ResumeCard() {
  return (
    <div className="group relative bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-100 transition-colors"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 transform group-hover:scale-110 transition-transform duration-300">
          <FileText className="w-10 h-10 text-white" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Full Resume</h3>
          <p className="text-slate-600 mb-6">Download my comprehensive resume to view detailed work history, educational background, and complete skill set.</p>
          <a
            href={resumePDF}
            download="Sathvik_Modhi_Resume.pdf"
            className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-xl hover:bg-indigo-600 transition-colors font-medium shadow-lg hover:shadow-indigo-500/25"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}

function WhyHireMeCard({ data }) {
  const highlights = [
    { stat: "78%", label: "Reduced Manual Triage", desc: "Automated ticket classification" },
    { stat: "95%", label: "Model Accuracy", desc: "ML classification systems" },
    { stat: "3+", label: "Years Experience", desc: "Building production AI systems" }
  ];

  const strengths = [
    { emoji: "🧠", title: "AI/ML Expertise", desc: "Deep experience with RAG pipelines, LLMs, and production ML systems" },
    { emoji: "🚀", title: "End-to-End Delivery", desc: "From ideation to deployment - Docker, Kubernetes, CI/CD" },
    { emoji: "💡", title: "Problem Solver", desc: "Architected solutions that reduced operational effort by 70%" },
    { emoji: "🤝", title: "Team Player", desc: "Collaborative approach with cross-functional teams" }
  ];

  return (
    <div className="space-y-6 w-full animate-slideUp">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>

        <div className="relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Why I'm Your Next Great Hire</h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            I don't just write code — I <span className="font-bold text-yellow-300">build intelligent systems</span> that solve real business problems and deliver measurable impact.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {highlights.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 text-center shadow-lg border border-slate-100 hover:shadow-xl transition-shadow">
            <div className="text-4xl font-black text-indigo-600 mb-2">{item.stat}</div>
            <div className="font-bold text-slate-800 text-sm">{item.label}</div>
            <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* Strengths */}
      <div className="grid md:grid-cols-2 gap-4">
        {strengths.map((item, idx) => (
          <div key={idx} className="group bg-white rounded-2xl p-6 shadow-lg border border-slate-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start gap-4">
              <span className="text-3xl group-hover:scale-110 transition-transform">{item.emoji}</span>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-slate-900 rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-bold text-white mb-4">Ready to Build Something Great?</h3>
        <p className="text-slate-400 mb-6 max-w-xl mx-auto">
          Let's discuss how my expertise in AI/ML and full-stack development can contribute to your team's success.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={`mailto:${data.email}`}
            className="px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-purple-500/30"
          >
            📧 Let's Talk
          </a>
          <a
            href={resumePDF}
            download="Sathvik_Modhi_Resume.pdf"
            className="px-8 py-3 bg-white text-slate-900 rounded-xl font-medium hover:bg-slate-100 transition-all shadow-lg"
          >
            📄 Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;