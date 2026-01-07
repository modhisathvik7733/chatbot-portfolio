import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { sendMessage, getQuickResponse } from '../../lib/api';
import { chatSuggestions } from '../../lib/constants';

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hello! I'm Sathvik's AI Assistant. I can help you learn about his experience as a Software Engineer at LTIMindtree, his AI/ML projects, technical skills, and more. What would you like to know?`
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

  const handleSend = async (messageText = input) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      let response;
      // Use quick response for suggestions
      if (chatSuggestions.includes(messageText)) {
        response = await getQuickResponse(messageText);
      } else {
        response = await sendMessage(messageText, messages);
      }
      
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again or ask a different question.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSend(suggestion);
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-slate-50 to-indigo-50/30">
      {/* Header */}
      <div className="p-6 border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-slate-900">Chat with Sathvik's AI Assistant</h1>
        <p className="text-slate-600 mt-1">Ask me about experience, projects, skills, or anything else!</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
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
              
              <div
                className={`rounded-2xl p-4 max-w-2xl shadow-md ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-tr-none'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none'
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
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
        <div className="max-w-4xl mx-auto">
          {/* Suggestion Chips */}
          {messages.length <= 1 && (
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300">
              {chatSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2.5 text-sm bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-full whitespace-nowrap transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0"
                  disabled={isLoading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Ask about experience, projects, skills..."
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
          
          <p className="text-center text-xs text-slate-500 mt-3">
            Powered by Google Gemini AI • Responses may take a few seconds
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;