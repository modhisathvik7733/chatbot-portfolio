import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Download, Mail, Phone, Linkedin, Github, FileText } from 'lucide-react';
import { sendMessage } from '../../lib/api';
import { profileData } from '../../lib/constants';

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I'm Sathvik Modhi, a Software Engineer at LTIMindtree. I can tell you about my experience in AI/ML, my projects, technical skills, and more. What would you like to know?`,
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Detect message type and format accordingly
  const detectMessageType = (query) => {
    const lower = query.toLowerCase();
    if (lower.includes('project')) return 'projects';
    if (lower.includes('skill') || lower.includes('technolog')) return 'skills';
    if (lower.includes('about') || lower.includes('me') || lower.includes('who are you')) return 'about';
    if (lower.includes('contact') || lower.includes('reach') || lower.includes('email')) return 'contact';
    if (lower.includes('resume') || lower.includes('cv')) return 'resume';
    if (lower.includes('experience') || lower.includes('work')) return 'experience';
    return 'text';
  };

  const handleQuickAction = async (action) => {
    const queries = {
      about: "Tell me about yourself",
      projects: "What projects have you worked on?",
      skills: "What are your technical skills?",
      contact: "How can I contact you?",
      resume: "Show me your resume"
    };
    
    await handleSend(queries[action], action);
  };

  const handleSend = async (messageText = input, forcedType = null) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = { role: 'user', content: messageText, type: 'text' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const messageType = forcedType || detectMessageType(messageText);
      
      // Get AI response
      const response = await sendMessage(messageText, messages);
      
      // Add response with detected type for custom rendering
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response,
        type: messageType,
        data: messageType !== 'text' ? profileData : null
      }]);
    } catch {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again or ask a different question.',
        type: 'text'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Render message based on type
  const renderMessage = (message) => {
    if (message.role === 'user') {
      return <p className="whitespace-pre-wrap">{message.content}</p>;
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
      
      case 'experience':
        return <ExperienceCard data={profileData} />;
      
      default:
        return <TextMessage content={message.content} />;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      {/* Header with Avatar and Quick Actions */}
      <div className="p-6 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-3xl font-bold shadow-xl border-4 border-white text-white">
              SM
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Sathvik Modhi</h1>
              <p className="text-slate-600">Software Engineer • AI/ML Specialist</p>
            </div>
          </div>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-3">
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
                className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-indigo-50 border-2 border-slate-200 hover:border-indigo-300 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50"
              >
                <span className="text-xl">{action.icon}</span>
                <span className="font-medium text-slate-700">{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
                  SM
                </div>
              )}
              
              <div className={`rounded-2xl max-w-4xl ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-4 rounded-tr-none shadow-md'
                  : message.type !== 'text' 
                    ? '' 
                    : 'bg-white border border-slate-200 text-slate-800 p-4 rounded-tl-none shadow-md'
              }`}>
                {renderMessage(message)}
              </div>

              {message.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
                  U
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-white font-bold shadow-lg">
                SM
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-md">
                <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white/80 border-t border-slate-200 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Ask me anything about my work, projects, skills..."
              className="w-full p-4 pr-14 rounded-xl bg-white border-2 border-slate-200 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 shadow-lg transition-all duration-200"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Custom Message Components
function TextMessage({ content }) {
  const paragraphs = content.split('\n\n');
  
  return (
    <div className="prose prose-sm max-w-none">
      {paragraphs.map((para, index) => {
        if (para.includes('\n-') || para.includes('\n•')) {
          const lines = para.split('\n');
          const title = lines[0];
          const items = lines.slice(1).filter(line => line.trim());
          
          return (
            <div key={index} className="mb-4">
              {title && <p className="font-semibold mb-2">{title}</p>}
              <ul className="space-y-2 ml-4">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-indigo-600 mt-1">•</span>
                    <span>{item.replace(/^[-•]\s*/, '').replace(/\*\*/g, '')}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        
        const parts = para.split(/(\*\*[^*]+\*\*)/g);
        return (
          <p key={index} className="mb-3 leading-relaxed">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={i} className="font-semibold text-slate-900">{part.slice(2, -2)}</strong>;
              }
              return <span key={i}>{part}</span>;
            })}
          </p>
        );
      })}
    </div>
  );
}

function AboutCard({ data }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 max-w-4xl">
      <div className="flex items-start gap-6 mb-6">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-5xl font-bold shadow-xl border-8 border-white text-white flex-shrink-0">
          SM
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">{data.name}</h2>
          <p className="text-xl text-slate-600 mb-3">{data.location}</p>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span key={tag} className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">{data.longBio}</p>
      <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
        <p className="text-slate-700">{data.bio}</p>
      </div>
    </div>
  );
}

function ProjectsCard({ data }) {
  return (
    <div className="space-y-4 max-w-4xl">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">My Projects</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.projects.map((project) => (
          <div
            key={project.id}
            className={`rounded-2xl p-6 text-white bg-gradient-to-br ${project.gradient} shadow-xl hover:scale-105 transition-transform duration-300`}
          >
            <p className="text-sm font-medium opacity-90 mb-2">{project.category}</p>
            <h4 className="text-xl font-bold mb-3">{project.name}</h4>
            <p className="text-sm opacity-90 mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 4).map((tech) => (
                <span key={tech} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs">
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
  const skillCategories = [
    { title: 'Frontend', icon: '🎨', skills: data.skills.frontend },
    { title: 'Backend', icon: '⚙️', skills: data.skills.backend },
    { title: 'Machine Learning', icon: '🤖', skills: data.skills.ml },
    { title: 'Cloud', icon: '☁️', skills: data.skills.cloud },
    { title: 'Tools', icon: '🛠️', skills: data.skills.tools }
  ];

  return (
    <div className="space-y-4 max-w-4xl">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">Skills & Expertise</h3>
      {skillCategories.map((category) => (
        <div key={category.title} className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{category.icon}</span>
            <h4 className="text-xl font-bold text-slate-900">{category.title}</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-full"
              >
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
    <div className="max-w-4xl">
      <h3 className="text-2xl font-bold text-slate-900 mb-4">Contact Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact) => {
          const Icon = contact.icon;
          return (
            <a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`group flex items-center gap-4 p-6 bg-gradient-to-br ${contact.color} text-white rounded-2xl shadow-lg hover:scale-105 transition-all duration-300`}
            >
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <Icon className="w-7 h-7" />
              </div>
              <div>
                <p className="text-sm font-medium opacity-90">{contact.label}</p>
                <p className="text-lg font-bold">{contact.value}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function ResumeCard() {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 max-w-2xl">
      <div className="flex items-start gap-6">
        <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
          <FileText className="w-10 h-10 text-indigo-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Machine Learning Engineer Resume</h3>
          <p className="text-slate-600 mb-4">
            Resume with extensive experience in AI-powered applications and generative solutions.
          </p>
          <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
            <span>PDF</span>
            <span>•</span>
            <span>Updated January 2026</span>
            <span>•</span>
            <span>0.11 MB</span>
          </div>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
}

function ExperienceCard({ data }) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 max-w-4xl">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">Professional Experience</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
            <span className="text-2xl">🏢</span>
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-900">{data.experience.company}</h4>
            <p className="text-indigo-600 font-medium">{data.experience.role}</p>
            <p className="text-slate-600 text-sm">{data.experience.duration} • {data.experience.location}</p>
          </div>
        </div>
        <div className="pl-20 space-y-3">
          {data.experience.highlights.slice(0, 5).map((highlight, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-indigo-600 mt-1">•</span>
              <p className="text-slate-700">{highlight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;