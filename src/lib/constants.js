export const profileData = {
  name: "Sathvik Modhi",
  title: "Software Engineer - AI/ML Platform",
  company: "LTIMindtree",
  location: "Hyderabad & Bengaluru, India",
  phone: "+91-8179828018",
  email: "modhisathvik@gmail.com",
  linkedin: "https://linkedin.com/in/sathvik-modhi",
  github: "https://github.com/modhisathvik7733",

  bio: "I'm Sathvik Modhi, a Software Engineer at LTIMindtree based in Bengaluru, India. I specialize in building AI/ML platforms, RAG pipelines, and intelligent chatbots. My passion lies in creating impactful solutions using Generative AI, machine learning, and modern web technologies.",

  longBio: "I am a Software Engineer with expertise in AI/ML Platform development. I have a strong background in developing context-aware chatbots, RAG pipelines, and automated classification systems. My technical stack spans Python, Flask, Vue.js, and a suite of ML/DL frameworks. I've successfully delivered projects like the JOVI AI-Powered Chatbot and a centralized RAG File Management Portal, significantly enhancing operational efficiency.",

  tags: ["Generative AI", "RAG Pipelines", "Machine Learning", "NLP", "Full Stack Development", "MLOps"],

  experience: {
    company: "LTIMindtree",
    role: "Software Engineer - AI/ML Platform",
    duration: "September 2022 – October 2025",
    location: "Bengaluru, India",
    highlights: [
      "Led development of JOVI AI-Powered Chatbot utilizing custom LLMs and Retrieval-Augmented Generation (RAG) pipeline, delivering context-aware IT support responses with microservices architecture. (Python, Flask, Vue.js, Langchain, Sentence Transformers, Docker, Kubernetes)",
      "Implemented centralized RAG File Management Portal with NLP embeddings for semantic search, enabling efficient project-wide document handling and retrieval across microservices. (Python, Flask, Vue.js, OpenSearch, Docker, Kubernetes)",
      "Spearheaded Ticket Classification project automating ITSM categorization using CatBoost classifier and NLP techniques on real-time ticket streams, reducing manual triage by 78% with improved multi-class classification accuracy. (Python, CatBoost, Scikit-learn, TF-IDF, Kafka, Docker, Kubernetes)",
      "Developed EDA Chatbot translating natural language queries to SQL/AQL for automated exploratory data analysis, delivering insights via conversational AI interface. (Python, Langchain, vLLM, ArangoDB, PostgreSQL, Docker)"
    ]
  },

  projects: [
    {
      id: 1,
      name: "Intelligent Task Load Balancer",
      category: "AI/ML",
      tech: ["Python", "XGBoost", "Scikit-learn", "Pandas", "Gradio"],
      description: "Built ML-based system predicting developer overload risk and recommending optimal task assignments using XGBoost classifier with 21 engineered features, achieving 95% accuracy.",
      highlights: [
        "Achieved 95% accuracy across 3 risk categories (Green/Yellow/Red) using XGBoost and 21 engineered features.",
        "Deployed interactive Gradio interface on Hugging Face Spaces with intelligent developer recommendation engine.",
        "System suggests best-fit developers based on current workload, skills, and capacity analysis."
      ],
      links: {
        github: "https://github.com/modhisathvik7733",
        demo: "#"
      },
      gradient: "from-emerald-500 via-teal-500 to-cyan-500"
    },
    {
      id: 2,
      name: "AI-Enabled Traffic Management System",
      category: "Computer Vision",
      tech: ["Python", "YOLOv3", "OpenCV", "TensorFlow", "Twilio API"],
      description: "Developed multi-module computer vision system for helmet detection, triple-rider identification, and license plate recognition using YOLOv3.",
      highlights: [
        "Achieved 88.3% accuracy for helmet detection, triple-rider identification, and license plate recognition.",
        "Implemented end-to-end pipeline with real-time video detection and OCR-based license plate extraction.",
        "Integrated automated SMS alerting via Twilio API and a Tkinter GUI dashboard for real-time monitoring."
      ],
      links: {
        github: "https://github.com/modhisathvik7733"
      },
      gradient: "from-orange-500 via-amber-500 to-yellow-500"
    },
    {
      id: 3,
      name: "JOVI AI-Powered Chatbot",
      category: "Generative AI",
      tech: ["Python", "LangChain", "Vue.js", "Docker", "Kubernetes"],
      description: "Enterprise-grade IT support chatbot utilizing custom LLMs and RAG pipeline to deliver context-aware support responses.",
      highlights: [
        "Led development using custom LLMs and Retrieval-Augmented Generation (RAG) pipeline.",
        "Delivered context-aware IT support responses with microservices architecture.",
        "Integrated Websockets for real-time communication and efficient query handling."
      ],
      links: {
        demo: "#"
      },
      gradient: "from-violet-600 via-purple-600 to-indigo-600"
    },
    {
      id: 4,
      name: "RAG File Management Portal",
      category: "Enterprise AI",
      tech: ["Python", "OpenSearch", "Flask", "Vue.js", "Docker"],
      description: "Centralized document intelligence portal with NLP embeddings for semantic search and efficient project-wide document handling.",
      highlights: [
        "Implemented NLP embeddings for semantic search across diverse document types.",
        "Enabled efficient project-wide document handling and retrieval across microservices.",
        "Architected scalable backend with Spring Boot and efficient frontend with Vue.js."
      ],
      links: {
        demo: "#"
      },
      gradient: "from-blue-600 via-cyan-500 to-teal-400"
    },
    {
      id: 5,
      name: "Intelligent Ticket Classification",
      category: "MLOps / ML",
      tech: ["CatBoost", "Kafka", "Docker", "Kubernetes", "Python"],
      description: "Automated ITSM ticket categorization system using CatBoost classifier and NLP techniques on real-time ticket streams.",
      highlights: [
        "Reduced manual triage by 78% with improved multi-class classification accuracy.",
        "Leveraged historical data to train CatBoost classifier for high-precision categorization.",
        "Implemented real-time processing pipeline using Kafka streams."
      ],
      links: {
        demo: "#"
      },
      gradient: "from-fuchsia-600 via-pink-600 to-rose-500"
    },
    {
      id: 6,
      name: "Automated EDA Chatbot",
      category: "Data Analytics",
      tech: ["LangChain", "vLLM", "ArangoDB", "PostgreSQL", "Docker"],
      description: "Conversational AI interface translating natural language queries to SQL/AQL for automated exploratory data analysis.",
      highlights: [
        "Translates natural language queries to SQL/AQL for automated data analysis.",
        "Delivers insights via a mix of natural language responses and interactive visualizations.",
        "Utilized vLLM for efficient local LLM inference and orchestration."
      ],
      links: {
        demo: "#"
      },
      gradient: "from-indigo-900 via-slate-800 to-gray-900"
    }
  ],

  skills: {
    languages: ["Python", "JavaScript", "SQL"],
    ml_dl: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "CatBoost", "Random Forest", "YOLOv3", "OpenCV"],
    nlp_llm: ["Langchain", "Sentence Transformers", "vLLM", "RAG Pipelines", "Text Classification", "Semantic Search"],
    data_analysis: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Probability & Statistics"],
    frameworks: ["Flask", "FastAPI", "Vue", "Gradio", "Kafka", "Apache Spark"],
    deployment: ["Docker", "Kubernetes", "MLflow", "Git", "CI/CD"],
    databases: ["PostgreSQL", "MySQL", "OpenSearch", "ArangoDB", "Firebase"]
  },

  certifications: [
    {
      name: "AWS Certified Developer - Associate",
      issuer: "Amazon Web Services",
      date: "March 2025"
    },
    {
      name: "LTIMindtree Certified ITOPS Automation Engineer",
      issuer: "LTIMindtree",
      date: "May 2023"
    }
  ],

  education: {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    school: "CMR Technical Campus",
    year: "July 2018 – July 2022",
    location: "Hyderabad, India"
  }
};

export const chatSuggestions = [
  "What is your experience with RAG pipelines?",
  "Tell me about the Intelligent Task Load Balancer.",
  "What technologies did you use for the Traffic Management System?",
  "Show me your skills in NLP and LLMs.",
  "How can I contact you?"
];