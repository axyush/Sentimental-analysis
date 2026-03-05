/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Database, 
  Globe, 
  Layers, 
  Lock, 
  MessageSquare, 
  Monitor, 
  Server, 
  ShieldCheck, 
  Smartphone, 
  Zap, 
  ChevronRight,
  Code2,
  Cpu,
  Cloud,
  Terminal,
  BarChart3,
  Search,
  ArrowRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
type Sentiment = 'Positive' | 'Negative' | 'Neutral' | null;

interface SectionProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

// --- Components ---

const Section = ({ id, title, icon, children }: SectionProps) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="mb-16 scroll-mt-24"
  >
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-600">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
    </div>
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
      {children}
    </div>
  </motion.section>
);

const TechBadge = ({ name }: { name: string }) => (
  <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium border border-slate-200">
    {name}
  </span>
);

export default function App() {
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<{ sentiment: Sentiment; score: number; explanation: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const analyzeSentiment = async () => {
    if (!inputText.trim()) return;
    setIsAnalyzing(true);
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Backend analysis failed');
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const sections = [
    { id: 'overview', title: 'System Overview', icon: <Globe size={24} /> },
    { id: 'diagram', title: 'Architecture Diagram', icon: <Layers size={24} /> },
    { id: 'components', title: 'Component Description', icon: <Cpu size={24} /> },
    { id: 'dataflow', title: 'Data Flow', icon: <Zap size={24} /> },
    { id: 'stack', title: 'Technology Stack', icon: <Code2 size={24} /> },
    { id: 'devops', title: 'DevOps & Deployment', icon: <Terminal size={24} /> },
    { id: 'scalability', title: 'Scalability', icon: <BarChart3 size={24} /> },
    { id: 'security', title: 'Security', icon: <ShieldCheck size={24} /> },
    { id: 'monitoring', title: 'Monitoring & Logging', icon: <Activity size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
            <span className="font-bold text-xl tracking-tight">SentimentAI Architect</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
            {sections.slice(0, 5).map(s => (
              <a key={s.id} href={`#${s.id}`} className="hover:text-indigo-600 transition-colors">{s.title}</a>
            ))}
          </div>
          <button 
            onClick={() => document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
          >
            Live Demo
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            Architecting <span className="text-indigo-600">Intelligence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-600 max-w-2xl mx-auto"
          >
            A blueprint for a production-grade Sentiment Analysis tool powered by Google Cloud Natural Language API.
          </motion.p>
        </div>

        {/* 1. System Overview */}
        <Section id="overview" title="System Overview" icon={<Globe size={24} />}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                The Sentiment Analysis Tool is a cloud-native application designed to process unstructured text data and extract emotional tone. It leverages the power of <strong>Google Cloud Natural Language API</strong> to provide high-accuracy sentiment classification.
              </p>
              <ul className="space-y-4">
                {[
                  'Real-time processing of user reviews and feedback',
                  'Classification into Positive, Negative, or Neutral categories',
                  'Granular sentiment scoring (Magnitude and Score)',
                  'Scalable architecture for high-volume data ingestion'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <CheckCircle2 className="text-emerald-500 mt-1 flex-shrink-0" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-900 rounded-2xl p-6 text-indigo-400 font-mono text-sm overflow-hidden relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/20"></div>
              <pre className="whitespace-pre-wrap">
{`// Example API Request
POST /api/analyze
{
  "text": "The new update is amazing! 
           The UI is so much faster.",
  "language": "en"
}

// Expected Response
{
  "sentiment": "Positive",
  "score": 0.9,
  "magnitude": 1.2
}`}
              </pre>
            </div>
          </div>
        </Section>

        {/* 2. Architecture Diagram */}
        <Section id="diagram" title="Architecture Diagram" icon={<Layers size={24} />}>
          <div className="relative py-12 flex flex-col items-center">
            {/* Simple Visual Representation using CSS/Tailwind */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
              {/* Frontend Layer */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-full p-6 bg-white border-2 border-indigo-100 rounded-xl flex flex-col items-center gap-2 shadow-sm">
                  <Smartphone className="text-indigo-600" size={32} />
                  <span className="font-bold">User Interface</span>
                  <span className="text-xs text-slate-500">React / Mobile App</span>
                </div>
                <div className="h-8 w-0.5 bg-indigo-200"></div>
              </div>

              {/* Backend Layer */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-full p-6 bg-indigo-600 text-white rounded-xl flex flex-col items-center gap-2 shadow-xl shadow-indigo-100">
                  <Server size={32} />
                  <span className="font-bold">API Gateway / Backend</span>
                  <span className="text-xs text-indigo-100 text-center">Node.js Express / Python Flask</span>
                </div>
                <div className="flex gap-12">
                  <div className="h-8 w-0.5 bg-indigo-200"></div>
                  <div className="h-8 w-0.5 bg-indigo-200"></div>
                </div>
              </div>

              {/* Database Layer */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-full p-6 bg-white border-2 border-slate-100 rounded-xl flex flex-col items-center gap-2 shadow-sm">
                  <Database className="text-slate-600" size={32} />
                  <span className="font-bold">Data Storage</span>
                  <span className="text-xs text-slate-500 text-center">PostgreSQL / Firebase</span>
                </div>
                <div className="h-8 w-0.5 bg-slate-200"></div>
              </div>
            </div>

            {/* Integration Layer */}
            <div className="w-full max-w-md mt-4 p-6 bg-emerald-50 border-2 border-emerald-100 rounded-xl flex flex-col items-center gap-2">
              <Cloud className="text-emerald-600" size={32} />
              <span className="font-bold text-emerald-900">Google Cloud Natural Language API</span>
              <span className="text-xs text-emerald-600 text-center">AI Sentiment Analysis Service</span>
            </div>

            {/* Monitoring Sidebar */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                <Activity size={20} className="text-slate-400" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cloud Logging</span>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-3">
                <Monitor size={20} className="text-slate-400" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cloud Monitoring</span>
              </div>
            </div>
          </div>
        </Section>

        {/* 3. Component Description */}
        <Section id="components" title="Component Description" icon={<Cpu size={24} />}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Frontend', desc: 'The entry point for users. Handles text input, displays results with visualizations (charts), and manages user sessions.', icon: <Smartphone /> },
              { title: 'Backend', desc: 'Orchestrates the flow. Validates input, manages authentication, calls the AI service, and handles database transactions.', icon: <Server /> },
              { title: 'API Integration', desc: 'The bridge to Google Cloud. Securely transmits text data and receives structured sentiment analysis results.', icon: <Cloud /> },
              { title: 'Data Storage', desc: 'Persists user inputs, analysis results, and metadata for historical tracking and future model training.', icon: <Database /> },
              { title: 'Security Layer', desc: 'Implements JWT authentication, rate limiting, and encryption of data at rest and in transit.', icon: <Lock /> },
              { title: 'Monitoring', desc: 'Tracks API latency, error rates, and system health to ensure 99.9% availability.', icon: <Activity /> }
            ].map((comp, i) => (
              <div key={i} className="p-6 border border-slate-100 rounded-xl hover:border-indigo-100 hover:bg-indigo-50/30 transition-all">
                <div className="text-indigo-600 mb-4">{comp.icon}</div>
                <h3 className="font-bold text-lg mb-2">{comp.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{comp.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* 4. Data Flow */}
        <Section id="dataflow" title="Data Flow" icon={<Zap size={24} />}>
          <div className="space-y-8">
            {[
              { step: '01', title: 'User Input', desc: 'User submits text feedback via the web or mobile interface.' },
              { step: '02', title: 'Backend Processing', desc: 'Backend receives the request, sanitizes the input, and checks authentication.' },
              { step: '03', title: 'AI Analysis', desc: 'Backend calls the Google Natural Language API with the text payload.' },
              { step: '04', title: 'Result Retrieval', desc: 'API returns sentiment score, magnitude, and entity analysis.' },
              { step: '05', title: 'Persistence', desc: 'Backend stores the input and analysis result in the database.' },
              { step: '06', title: 'User Response', desc: 'The processed sentiment is returned to the frontend for display.' }
            ].map((flow, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="text-3xl font-black text-indigo-100 leading-none">{flow.step}</div>
                <div className="flex-1 pb-8 border-b border-slate-100 last:border-0">
                  <h3 className="font-bold text-lg mb-1">{flow.title}</h3>
                  <p className="text-slate-600">{flow.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 5. Technology Stack */}
        <Section id="stack" title="Technology Stack" icon={<Code2 size={24} />}>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-3">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  <TechBadge name="React.js" />
                  <TechBadge name="Tailwind CSS" />
                  <TechBadge name="Lucide Icons" />
                  <TechBadge name="Framer Motion" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-3">Backend</h3>
                <div className="flex flex-wrap gap-2">
                  <TechBadge name="Node.js" />
                  <TechBadge name="Express" />
                  <TechBadge name="TypeScript" />
                  <TechBadge name="Python Flask (Optional)" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-3">Database</h3>
                <div className="flex flex-wrap gap-2">
                  <TechBadge name="PostgreSQL" />
                  <TechBadge name="Firebase Firestore" />
                  <TechBadge name="Redis (Caching)" />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-3">Cloud Platform</h3>
                <div className="flex flex-wrap gap-2">
                  <TechBadge name="Google Cloud Platform" />
                  <TechBadge name="Cloud Run" />
                  <TechBadge name="Cloud Storage" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-500 text-xs uppercase tracking-widest mb-3">AI & API</h3>
                <div className="flex flex-wrap gap-2">
                  <TechBadge name="Google Cloud Natural Language API" />
                  <TechBadge name="REST / gRPC" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* 6. DevOps & Deployment */}
        <Section id="devops" title="DevOps & Deployment" icon={<Terminal size={24} />}>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-bold text-xl mb-4">Containerization & CI/CD</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                The application is containerized using <strong>Docker</strong> to ensure consistency across environments. The deployment pipeline is automated using <strong>GitHub Actions</strong> or <strong>Google Cloud Build</strong>.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-indigo-600">
                    <Layers size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Docker Multi-stage Builds</div>
                    <div className="text-xs text-slate-500">Optimized production images</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm text-indigo-600">
                    <Zap size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Automated Testing</div>
                    <div className="text-xs text-slate-500">Unit & Integration tests on every push</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="font-bold text-xl mb-4">Hosting Strategy</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <div>
                    <span className="font-bold block">Google Cloud Run</span>
                    <span className="text-sm text-slate-600">Serverless hosting for the backend API. Scales to zero when not in use.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <div>
                    <span className="font-bold block">Firebase Hosting</span>
                    <span className="text-sm text-slate-600">Global CDN for the React frontend assets.</span>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                  <div>
                    <span className="font-bold block">Artifact Registry</span>
                    <span className="text-sm text-slate-600">Secure storage for Docker images.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Section>

        {/* 7. Scalability */}
        <Section id="scalability" title="Scalability & Performance" icon={<BarChart3 size={24} />}>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
              <h3 className="font-bold mb-2">Horizontal Scaling</h3>
              <p className="text-sm text-slate-600">Using Cloud Run's auto-scaling to handle spikes in traffic by spinning up multiple instances of the backend.</p>
            </div>
            <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
              <h3 className="font-bold mb-2">Database Read Replicas</h3>
              <p className="text-sm text-slate-600">For high-read scenarios (dashboards), we use read-replicas to offload the primary database.</p>
            </div>
            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
              <h3 className="font-bold mb-2">Caching Layer</h3>
              <p className="text-sm text-slate-600">Redis is used to cache results for identical text inputs, reducing API costs and latency.</p>
            </div>
          </div>
        </Section>

        {/* 8. Security */}
        <Section id="security" title="Security Considerations" icon={<ShieldCheck size={24} />}>
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 border border-slate-100 rounded-2xl">
              <Lock className="text-indigo-600 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-lg mb-1">API Key Protection</h3>
                <p className="text-slate-600">Google Cloud API keys are never exposed to the frontend. They are stored in <strong>Secret Manager</strong> and accessed only by the backend.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 border border-slate-100 rounded-2xl">
              <ShieldCheck className="text-emerald-600 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-lg mb-1">Authentication & Authorization</h3>
                <p className="text-slate-600">Using <strong>Firebase Auth</strong> or <strong>Auth0</strong> for secure user login. JWT tokens are used to authorize every API request.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 border border-slate-100 rounded-2xl">
              <AlertCircle className="text-amber-600 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-lg mb-1">Data Privacy</h3>
                <p className="text-slate-600">Implementation of PII (Personally Identifiable Information) scrubbing before sending data to the AI service to ensure compliance.</p>
              </div>
            </div>
          </div>
        </Section>

        {/* 9. Monitoring */}
        <Section id="monitoring" title="Monitoring & Logging" icon={<Activity size={24} />}>
          <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity size={120} />
            </div>
            <div className="relative z-10 grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Monitor className="text-indigo-400" />
                  Real-time Observability
                </h3>
                <p className="text-slate-400 mb-6">We use the <strong>Google Cloud Operations Suite</strong> to maintain full visibility into the system's performance.</p>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                    <span className="text-slate-500">Cloud Logging</span>
                    <span className="text-indigo-400 font-mono">Centralized logs</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                    <span className="text-slate-500">Cloud Trace</span>
                    <span className="text-indigo-400 font-mono">Latency analysis</span>
                  </div>
                  <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                    <span className="text-slate-500">Error Reporting</span>
                    <span className="text-indigo-400 font-mono">Crash tracking</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center gap-4">
                <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">API Success Rate</div>
                  <div className="text-3xl font-bold text-emerald-400">99.98%</div>
                </div>
                <div className="p-4 bg-slate-800 rounded-xl border border-slate-700">
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Avg. Latency</div>
                  <div className="text-3xl font-bold text-indigo-400">142ms</div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Live Demo Section */}
        <motion.section 
          id="demo"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 pt-24 border-t border-slate-200"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Live Architecture Demo</h2>
            <p className="text-slate-600">Experience the data flow in real-time. This demo uses Gemini 2.0 to simulate the AI Sentiment Service.</p>
          </div>

          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl shadow-indigo-100 border border-slate-100 overflow-hidden">
            <div className="p-8">
              <div className="mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">Enter Text for Analysis</label>
                <textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="e.g., 'I absolutely love the new design, but the loading speed could be improved.'"
                  className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none resize-none"
                />
              </div>
              <button 
                onClick={analyzeSentiment}
                disabled={isAnalyzing || !inputText.trim()}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Activity className="animate-spin" size={20} />
                    Analyzing Data Flow...
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    Run Sentiment Analysis
                  </>
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {analysisResult && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-slate-50 border-t border-slate-100 p-8"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-shrink-0">
                      <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg ${
                        analysisResult.sentiment === 'Positive' ? 'bg-emerald-500 shadow-emerald-200' :
                        analysisResult.sentiment === 'Negative' ? 'bg-rose-500 shadow-rose-200' :
                        'bg-slate-500 shadow-slate-200'
                      }`}>
                        {analysisResult.sentiment === 'Positive' ? '😊' : 
                         analysisResult.sentiment === 'Negative' ? '😞' : '😐'}
                      </div>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <h3 className="text-2xl font-bold">{analysisResult.sentiment}</h3>
                        <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-xs font-mono text-slate-500">
                          Score: {analysisResult.score.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-slate-600 italic leading-relaxed">
                        "{analysisResult.explanation}"
                      </p>
                    </div>
                  </div>

                  {/* Visualizing the "Database" part of the flow */}
                  <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Database size={14} />
                      <span>Result persisted to PostgreSQL</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity size={14} />
                      <span>Latency: 420ms</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 px-6 mt-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-white text-[10px] font-bold">S</div>
            <span className="font-bold text-slate-900">SentimentAI Architect</span>
          </div>
          <p className="text-sm text-slate-500">© 2024 System Architecture Design. Built for educational purposes.</p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Globe size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Terminal size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><Server size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
