import { GoogleGenerativeAI } from "@google/generative-ai";
import { profileData } from "./constants";

// Check if API key exists
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error("❌ GEMINI_API_KEY is not set in .env file!");
}

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(apiKey);

// Create system prompt with profile context in FIRST PERSON
const createSystemPrompt = () => {
  return `You are Sathvik Modhi speaking directly to recruiters and visitors. Answer ALL questions in FIRST PERSON as if you ARE Sathvik. Use "I", "my", "me" in all responses.

MY PROFILE:
I'm ${profileData.name}, currently working as a ${profileData.experience.role} at ${profileData.experience.company} in ${profileData.location}.

MY KEY EXPERTISE:
- AI/ML Engineering with LLMs, RAG, and LangChain
- Full-stack development (Spring Boot, Vue.js, Python)
- Data Engineering (Apache Spark, Kafka)
- DevOps & Cloud (Docker, Kubernetes, AWS)

MY MAJOR ACHIEVEMENTS:
${profileData.experience.highlights.map((h, i) => `${i + 1}. ${h.replace('Led the', 'I led the').replace('Implemented a', 'I implemented a').replace('Spearheaded the', 'I spearheaded the').replace('Architected and', 'I architected and').replace('Developed an', 'I developed an').replace('Built a', 'I built a').replace('Managed on', 'I managed on').replace('Automated manual', 'I automated manual')}`).join('\n')}

MY PROJECTS:
${profileData.projects.map(p => `- ${p.name}: ${p.description}`).join('\n')}

MY TECHNICAL SKILLS:
- Languages: ${profileData.skills.languages.join(', ')}
- Technologies: ${profileData.skills.technologies.join(', ')}
- Databases: ${profileData.skills.databases.join(', ')}
- AI/ML: ${profileData.skills.aiml.join(', ')}

MY CERTIFICATIONS:
${profileData.certifications.map(c => `- ${c.name} - ${c.issuer} (${c.year || c.date})`).join('\n')}

IMPORTANT INSTRUCTIONS:
1. ALWAYS respond in FIRST PERSON (use "I", "my", "me")
2. Be professional, concise, and confident
3. Share specific examples and metrics from MY experience
4. If asked about contact info, provide: ${profileData.email}, ${profileData.phone}
5. Keep responses focused and recruiter-friendly
6. If unsure about something not in MY profile, say "I don't have that specific information to share"
7. Emphasize MY AI/ML expertise, especially with LLMs, RAG pipelines, and production deployments

EXAMPLE GOOD RESPONSE:
"I have over 3 years of experience as a Software Engineer at LTIMindtree, where I've led the development of several AI-powered applications..."

NEVER say "Sathvik has" or "He has" - ALWAYS say "I have" or "I've"`;
};

export const sendMessage = async (message, conversationHistory = []) => {
  try {
    if (!apiKey) {
      throw new Error("API key is not configured. Please check your .env file.");
    }

    console.log("🚀 Sending message to Gemini API...");
    
    // Use SDK with working model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview"  
    });
    
    // Build conversation context with system prompt
    const fullContext = [
      { role: "user", parts: [{ text: createSystemPrompt() }] },
      { role: "model", parts: [{ text: "I understand. I'll respond as Sathvik Modhi in first person, sharing my professional background, skills, and experience directly with recruiters and visitors." }] },
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
    console.error('❌ Error calling Gemini API:', error);
    
    // Provide helpful error messages
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

// Helper function to get quick response for suggestions (in FIRST PERSON)
export const getQuickResponse = async (suggestion) => {
  const quickResponses = {
    "Tell me about your experience": `I'm a Software Engineer at LTIMindtree (Sep 2022 - Present) with strong expertise in AI/ML and full-stack development. I've led the development of JOVI, an AI-powered chatbot using custom LLMs and RAG pipelines, and I've worked extensively with technologies like Spring Boot, Vue.js, Python, LangChain, Docker, and Kubernetes. My key achievements include building production-grade AI chatbots, implementing data pipelines with Apache Spark and Kafka, and managing LLM deployments that reduced manual effort by 70%.`,
    
    "What projects have you worked on?": `I've worked on several impactful projects:

1. **JOVI - AI-Powered Chatbot**: I built this using LLMs, RAG pipeline, Spring Boot, Vue.js, and LangChain for context-aware responses
2. **RAG File Management Portal**: I created a centralized system for efficient file handling
3. **Ticket Classification System**: I developed ML-based automation improving ITSM efficiency
4. **Real-time Data Pipelines**: I architected these using Apache Spark and Kafka
5. **EDA Chatbot**: I built a tool that generates SQL/AQL queries for automated data analysis
6. **Pipeline Observability Dashboard**: I created this to monitor data pipeline performance
7. **Spendly AI** (Apr 2025): I'm developing a financial management app with Flutter, Spring Boot, and Gemini API integration`,
    
    "What are your technical skills?": `I have comprehensive technical expertise across multiple domains:

**Languages**: Python, Java, JavaScript, HTML, CSS, Bash

**Core Technologies**: Spring Boot, Flask, Django, Vue.js, LangChain, Apache Spark, Kafka, Docker, Kubernetes, vLLM

**AI/ML**: I specialize in LLMs, RAG, Sentence Transformers, Custom Chatbots, and NLP

**Databases**: PostgreSQL, MySQL, ArangoDB, OpenSearch

**DevOps**: Docker, Kubernetes, CI/CD, Git, Nginx, SSL/TLS

**Certifications**: I'm AWS Certified Developer - Associate (2025) and LTIMindtree Certified ITOPS Automation Engineer (2023)`,
    
    "Tell me about your AI/ML work": `I have extensive AI/ML experience:

- **JOVI Chatbot**: I developed this production-grade AI chatbot using custom LLMs and RAG (Retrieval-Augmented Generation) pipelines with LangChain
- **LLM Deployments**: I've managed on-premises LLM deployments using Docker, Kubernetes, and vLLM for scalable orchestration
- **EDA Chatbot**: I built an intelligent chatbot that generates SQL/AQL queries and provides interactive data visualizations
- **Spendly AI**: I integrated Gemini API for intelligent financial recommendations
- **Ticket Classification**: I implemented ML-based automation using CatBoost for ITSM ticket categorization

My tech stack includes: LangChain, Sentence Transformers, Custom LLMs, RAG, NLP, Python, and Java`,
    
    "What certifications do you have?": `I hold the following professional certifications:

1. **AWS Certified Developer - Associate** - Amazon Web Services (2025)
2. **LTIMindtree Certified ITOPS Automation Engineer** - LTIMindtree (May 2023)

These certifications demonstrate my expertise in cloud technologies and IT operations automation.`
  };

  return quickResponses[suggestion] || sendMessage(suggestion);
};