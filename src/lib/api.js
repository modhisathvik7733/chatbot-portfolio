import { GoogleGenerativeAI } from "@google/generative-ai";
import { profileData } from "./constants";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is not set in .env file!");
}

const genAI = new GoogleGenerativeAI(apiKey);

// OPTIMIZED: Much shorter system prompt - only essential info
const createSystemPrompt = () => {
  return `You are Sathvik Modhi, a Software Engineer at LTIMindtree. Respond in FIRST PERSON (use "I", "my", "me").

Key Info:
- Role: Software Engineer at LTIMindtree (Sep 2022-Present)
- Location: ${profileData.location}
- Expertise: AI/ML (LLMs, RAG, LangChain), Full-stack (Fast API, React Js), Data Engineering (Spark, Kafka)
- Contact: ${profileData.email}, ${profileData.phone}

Reply naturally and concisely. Share specific details only when asked.`;
};

// Helper to build detailed context only when needed
const getDetailedContext = (messageType) => {
  // For greetings and simple queries, don't send extra context
  const simpleGreetings = ['hi', 'hello', 'hey', 'greetings'];
  if (simpleGreetings.some(g => messageType.toLowerCase().includes(g))) {
    return '';
  }

  // For specific topics, send only relevant details
  let context = '';
  
  if (messageType.toLowerCase().includes('project')) {
    context += `\n\nMY PROJECTS:\n${profileData.projects.map(p => `- ${p.name}: ${p.description}`).join('\n')}`;
  }
  
  if (messageType.toLowerCase().includes('skill') || messageType.toLowerCase().includes('tech')) {
    context += `\n\nSKILLS: ${profileData.skills.languages.join(', ')}, ${profileData.skills.technologies.slice(0, 5).join(', ')}`;
  }
  
  if (messageType.toLowerCase().includes('experience') || messageType.toLowerCase().includes('work')) {
    context += `\n\nKEY ACHIEVEMENTS:\n${profileData.experience.highlights.slice(0, 3).map((h, i) => `${i + 1}. ${h}`).join('\n')}`;
  }
  
  if (messageType.toLowerCase().includes('cert')) {
    context += `\n\nCERTIFICATIONS:\n${profileData.certifications.map(c => `- ${c.name} (${c.year || c.date})`).join('\n')}`;
  }
  
  return context;
};

export const sendMessage = async (message, conversationHistory = []) => {
  try {
    if (!apiKey) {
      throw new Error("API key is not configured. Please check your .env file.");
    }

    console.log("🚀 Sending message to Gemini API...");
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: createSystemPrompt() // Use systemInstruction instead of history
    });
    
    // Build context with only recent conversation (last 5 messages max)
    const recentHistory = conversationHistory.slice(-5);
    
    // Add relevant context based on message content
    const detailedContext = getDetailedContext(message);
    const messageWithContext = detailedContext ? `${message}\n\nContext: ${detailedContext}` : message;
    
    const chat = model.startChat({
      history: recentHistory.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      })),
      generationConfig: {
        maxOutputTokens: 500, // Reduced from 1000
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(messageWithContext);
    const response = await result.response;
    const text = response.text();
    
    console.log("✅ Received response from Gemini API");
    return text;
    
  } catch (error) {
    console.error('❌ Error calling Gemini API:', error);
    
    if (error.message?.includes('API key not valid')) {
      throw new Error('Invalid API key. Please check your .env file.');
    } else if (error.message?.includes('quota')) {
      throw new Error('API quota exceeded. Please wait a moment and try again.');
    } else if (error.message?.includes('404') || error.message?.includes('not found')) {
      throw new Error('Model not found. Please verify your API key is valid.');
    } else if (error.message?.includes('403')) {
      throw new Error('Access denied. Please enable the Gemini API in Google AI Studio.');
    } else {
      throw new Error('Failed to get response. Please try again.');
    }
  }
};

// Optimized quick responses
export const getQuickResponse = async (suggestion) => {
  const quickResponses = {
    "Tell me about your experience": `I'm a Software Engineer at LTIMindtree with expertise in AI/ML and full-stack development. I've led development of JOVI (AI chatbot using LLMs and RAG), built data pipelines with Apache Spark and Kafka, and managed LLM deployments that reduced manual effort by 70%.`,
    
    "What projects have you worked on?": `Key projects: JOVI AI Chatbot (LLMs, RAG, Spring Boot), RAG File Management Portal, Ticket Classification System (ML automation), Real-time Data Pipelines (Spark, Kafka), EDA Chatbot, and Spendly AI (Flutter + Gemini API).`,
    
    "What are your technical skills?": `Languages: Python, Java, JavaScript. AI/ML: LLMs, RAG, LangChain. Technologies: Spring Boot, Vue.js, Docker, Kubernetes, Apache Spark, Kafka. Databases: PostgreSQL, MySQL. Certified AWS Developer Associate (2025).`,
    
    "Tell me about your AI/ML work": `I specialize in LLMs and RAG pipelines. Built JOVI chatbot with custom LLMs, managed on-premises LLM deployments using Docker/Kubernetes/vLLM, and created EDA Chatbot for SQL/AQL query generation. Tech: LangChain, Sentence Transformers, Python, Java.`,
    
    "What certifications do you have?": `AWS Certified Developer - Associate (2025) and LTIMindtree Certified ITOPS Automation Engineer (May 2023).`
  };

  return quickResponses[suggestion] || sendMessage(suggestion);
};