import { GoogleGenerativeAI } from "@google/generative-ai";
import { profileData } from "./constants";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const createSystemPrompt = () => {
  return `You are an AI assistant for Sathvik Modhi's professional portfolio website. Your role is to help recruiters and visitors learn about Sathvik's professional experience, skills, and projects.

PROFESSIONAL PROFILE:
Name: ${profileData.name}
Current Role: ${profileData.experience.role} at ${profileData.experience.company}
Location: ${profileData.location}
Duration: ${profileData.experience.duration}

KEY EXPERTISE:
- AI/ML Engineering with LLMs, RAG, and LangChain
- Full-stack development (Spring Boot, Vue.js, Python)
- Data Engineering (Apache Spark, Kafka)
- DevOps & Cloud (Docker, Kubernetes, AWS)

MAJOR ACHIEVEMENTS:
${profileData.experience.highlights.map((h, i) => `${i + 1}. ${h}`).join('\n')}

PROJECTS:
${profileData.projects.map(p => `- ${p.name} (${p.date}): ${p.description}`).join('\n')}

TECHNICAL SKILLS:
- Languages: ${profileData.skills.languages.join(', ')}
- Technologies: ${profileData.skills.technologies.join(', ')}
- Databases: ${profileData.skills.databases.join(', ')}
- AI/ML: ${profileData.skills.aiml.join(', ')}

CERTIFICATIONS:
${profileData.certifications.map(c => `- ${c.name} - ${c.issuer} (${c.year || c.date})`).join('\n')}

GUIDELINES:
1. Be professional, concise, and informative
2. Highlight relevant experience based on the question
3. Use specific examples and metrics when available
4. If asked about contact info, provide: ${profileData.email}, ${profileData.phone}
5. For LinkedIn/GitHub, mention they can find links in the sidebar
6. Keep responses focused and recruiter-friendly
7. If unsure about something not in the profile, politely say you don't have that information
8. Emphasize Sathvik's AI/ML expertise, especially with LLMs, RAG pipelines, and production deployments`;
};

export const sendMessage = async (message, conversationHistory = []) => {
  try {
    if (!apiKey) {
      throw new Error("API key is not configured. Please check your .env file.");
    }

    console.log("🚀 Sending message to Gemini API...");
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview" 
    });
    

    const fullContext = [
      { role: "user", parts: [{ text: createSystemPrompt() }] },
      { role: "model", parts: [{ text: "I understand. I'm here to help recruiters and visitors learn about Sathvik Modhi's professional background, skills, and experience. I'll provide accurate, concise, and relevant information based on his profile." }] },
      ...conversationHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }))
    ];

    const chat = model.startChat({
      history: fullContext,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ Received response from Gemini API");
    return text;
    
  } catch (error) {
    console.error(' Error calling Gemini API:', error);
    
    if (error.message?.includes('API key not valid')) {
      throw new Error('Invalid API key. Please check your .env file.');
    } else if (error.message?.includes('quota')) {
      throw new Error('API quota exceeded. Please wait a moment and try again.');
    } else if (error.message?.includes('404') || error.message?.includes('not found')) {
      throw new Error('Model not found. The API may have been updated. Please check the model name.');
    } else if (error.message?.includes('403')) {
      throw new Error('Access denied. Please enable the Gemini API in Google AI Studio.');
    } else {
      throw new Error('Failed to get response. Please try again.');
    }
  }
};


export const getQuickResponse = async (suggestion) => {
  const quickResponses = {
    "Tell me about your experience": `Sathvik Modhi is a Software Engineer at LTIMindtree (Sep 2022 - Present) with strong expertise in AI/ML and full-stack development. He has led the development of JOVI, an AI-powered chatbot using custom LLMs and RAG pipelines, and has worked extensively with technologies like Spring Boot, Vue.js, Python, LangChain, Docker, and Kubernetes. His key achievements include building production-grade AI chatbots, implementing data pipelines with Apache Spark and Kafka, and managing LLM deployments that reduced manual effort by 70%.`,
    
    "What projects have you worked on?": `Sathvik has worked on several impactful projects:

1. **JOVI - AI-Powered Chatbot**: Built using LLMs, RAG pipeline, Spring Boot, Vue.js, and LangChain for context-aware responses
2. **RAG File Management Portal**: Centralized system for efficient file handling
3. **Ticket Classification System**: ML-based automation improving ITSM efficiency
4. **Real-time Data Pipelines**: Architected using Apache Spark and Kafka
5. **EDA Chatbot**: Generates SQL/AQL queries for automated data analysis
6. **Pipeline Observability Dashboard**: Monitors data pipeline performance
7. **Spendly AI** (Apr 2025): Financial management app with Flutter, Spring Boot, and Gemini API integration`,
    
    "What are your technical skills?": `Sathvik has comprehensive technical expertise:

**Languages**: Python, Java, JavaScript, HTML, CSS, Bash

**Core Technologies**: Spring Boot, Flask, Django, Vue.js, LangChain, Apache Spark, Kafka, Docker, Kubernetes, vLLM

**AI/ML**: LLMs, RAG, Sentence Transformers, Custom Chatbots, NLP

**Databases**: PostgreSQL, MySQL, ArangoDB, OpenSearch

**DevOps**: Docker, Kubernetes, CI/CD, Git, Nginx, SSL/TLS

**Certifications**: AWS Certified Developer - Associate (2025), LTIMindtree Certified ITOPS Automation Engineer (2023)`,
    
    "Tell me about your AI/ML work": `Sathvik has extensive AI/ML experience:

- **JOVI Chatbot**: Developed production-grade AI chatbot using custom LLMs and RAG (Retrieval-Augmented Generation) pipelines with LangChain
- **LLM Deployments**: Managed on-premises LLM deployments using Docker, Kubernetes, and vLLM for scalable orchestration
- **EDA Chatbot**: Built intelligent chatbot that generates SQL/AQL queries and provides interactive data visualizations
- **Spendly AI**: Integrated Gemini API for intelligent financial recommendations
- **Ticket Classification**: Implemented ML-based automation using CatBoost for ITSM ticket categorization

Technologies: LangChain, Sentence Transformers, Custom LLMs, RAG, NLP, Python, Java`,
    
    "What certifications do you have?": `Sathvik holds the following professional certifications:

1. **AWS Certified Developer - Associate** - Amazon Web Services (2025)
2. **LTIMindtree Certified ITOPS Automation Engineer** - LTIMindtree (May 2023)

These certifications demonstrate his expertise in cloud technologies and IT operations automation.`
  };

  return quickResponses[suggestion] || sendMessage(suggestion);
};