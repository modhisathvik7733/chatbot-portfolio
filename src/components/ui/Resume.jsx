import React from 'react';
import { Download, FileText } from 'lucide-react';

function Resume() {
  return (
    <div className="min-h-screen p-8 pt-24 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-slate-900 mb-12 text-center">Resume</h1>

        {/* Resume Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 mb-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-10 h-10 text-indigo-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Machine Learning Engineer Resume
              </h2>
              <p className="text-slate-600 mb-4">
                Resume of a Machine Learning Engineer with extensive experience in AI-powered
                applications and generative solutions.
              </p>
              <div className="flex items-center gap-6 text-sm text-slate-500">
                <span>PDF</span>
                <span>•</span>
                <span>Updated January 2026</span>
                <span>•</span>
                <span>0.11 MB</span>
              </div>
            </div>
            
            <a
              href="/resume.pdf"
              download
              className="w-14 h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-lg"
            >
              <Download className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Download Info */}
        <div className="text-center space-y-4">
          <p className="text-lg text-slate-700">
            Click to download the resume
          </p>
          <p className="text-slate-600">
            You can download my resume by clicking on the link above. It provides a detailed overview of my
            professional background and experiences.
          </p>
          <p className="text-slate-600">
            If you have any questions about my experience or qualifications, feel free to ask!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Resume;