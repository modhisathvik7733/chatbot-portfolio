import React from 'react';
import { profileData } from '../../lib/constants';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

function Contact() {
  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: profileData.email,
      href: `mailto:${profileData.email}`,
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profileData.phone,
      href: `tel:${profileData.phone}`,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'sathvik-modhi',
      href: profileData.linkedin,
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'modhisathvik7733',
      href: profileData.github,
      color: 'from-slate-700 to-slate-900'
    }
  ];

  return (
    <div className="min-h-screen p-8 pt-24 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        <h1 className="text-5xl font-bold text-slate-900 mb-4 text-center">Get In Touch</h1>
        <p className="text-xl text-slate-600 mb-12 text-center">
          Feel free to reach out for collaborations, opportunities, or just to say hi!
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group flex items-center gap-6 p-8 bg-gradient-to-br ${contact.color} text-white rounded-3xl shadow-xl hover:scale-105 transition-all duration-300`}
              >
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Icon className="w-8 h-8" />
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
    </div>
  );
}

export default Contact;