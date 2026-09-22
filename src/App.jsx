import React, { useState } from 'react';
import { Terminal, Compass, Layers, Code2, Server, Rocket, Sparkles, CheckCircle } from 'lucide-react';
import MindsetReset from './components/MindsetReset';
import Roadmap from './components/Roadmap';
import CodeSandboxDrills from './components/CodeSandboxDrills';
import FlowSimulator from './components/FlowSimulator';
import ProjectBlueprints from './components/ProjectBlueprints';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('mindset');

  return (
    <div className="app-container">
      {/* App Header */}
      <header className="app-header">
        <div className="brand-section">
          <div className="logo-badge">
            <Terminal size={24} />
          </div>
          <div className="title-group">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <h1>Software Engineering Mastery Studio</h1>
              <span className="badge badge-emerald">
                <Sparkles size={12} /> Backend Systems Track
              </span>
            </div>
            <p className="subtitle">
              Bridging the gap from internship experience to confident, production-grade Software Engineer.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '0.5rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)', textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Workspace Path</span>
            <div style={{ fontSize: '0.8rem', color: '#60a5fa', fontFamily: 'var(--font-mono)' }}>engineering-mastery-app</div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="nav-tabs">
        <button
          onClick={() => setActiveTab('mindset')}
          className={`tab-btn ${activeTab === 'mindset' ? 'active' : ''}`}
        >
          <Compass size={18} />
          1. Mindset Reset & Imposter Traps
        </button>

        <button
          onClick={() => setActiveTab('roadmap')}
          className={`tab-btn ${activeTab === 'roadmap' ? 'active' : ''}`}
        >
          <Layers size={18} />
          2. 4-Phase Engineering Roadmap
        </button>

        <button
          onClick={() => setActiveTab('drills')}
          className={`tab-btn ${activeTab === 'drills' ? 'active' : ''}`}
        >
          <Code2 size={18} />
          3. Interactive Coding Sandbox
        </button>

        <button
          onClick={() => setActiveTab('flow')}
          className={`tab-btn ${activeTab === 'flow' ? 'active' : ''}`}
        >
          <Server size={18} />
          4. Architecture & Flow Simulator
        </button>

        <button
          onClick={() => setActiveTab('blueprints')}
          className={`tab-btn ${activeTab === 'blueprints' ? 'active' : ''}`}
        >
          <Rocket size={18} />
          5. Production Portfolio Blueprints
        </button>
      </nav>

      {/* Tab Contents */}
      <main>
        {activeTab === 'mindset' && <MindsetReset />}
        {activeTab === 'roadmap' && <Roadmap />}
        {activeTab === 'drills' && <CodeSandboxDrills />}
        {activeTab === 'flow' && <FlowSimulator />}
        {activeTab === 'blueprints' && <ProjectBlueprints />}
      </main>
    </div>
  );
}
