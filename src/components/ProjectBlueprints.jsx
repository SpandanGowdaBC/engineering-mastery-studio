import React from 'react';
import { Rocket, GitBranch, Database, Shield, Server, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ProjectBlueprints() {
  const projects = [
    {
      id: 'proj-1',
      title: 'Project 01: Production-Grade RESTful Microservice with Authentication',
      difficulty: 'Level: Fundamental Backend',
      desc: 'Build a full user authentication & profile management REST API from scratch without heavy frameworks.',
      tech: ['Node.js/Express or Python/FastAPI', 'PostgreSQL', 'JWT', 'Bcrypt', 'Docker'],
      features: [
        'User registration with salted password hashing (Bcrypt).',
        'JWT token generation & authorization middleware pipeline.',
        'PostgreSQL database migrations & parameterized SQL (SQL injection safe).',
        'Centralized error handling middleware with JSON response schemas.'
      ]
    },
    {
      id: 'proj-2',
      title: 'Project 02: Redis-Backed Distributed Rate Limiter & Caching Service',
      difficulty: 'Level: Systems & Performance',
      desc: 'Build an API gateway rate limiting middleware that enforces sliding-window rate limits per IP/API key.',
      tech: ['Go or Node.js', 'Redis', 'Lua Scripts', 'Jest / PyTest'],
      features: [
        'Sliding window rate-limiting algorithm using Redis atomic pipelines.',
        'Cache-Aside pattern for high-frequency database read requests.',
        'HTTP 429 Too Many Requests response with retry-after header calculation.',
        'Comprehensive unit tests mocking Redis failures gracefully.'
      ]
    },
    {
      id: 'proj-3',
      title: 'Project 03: Asynchronous Task Queue & Job Worker Engine',
      difficulty: 'Level: Advanced Architecture',
      desc: 'Build an asynchronous background processing engine for heavy workloads (e.g. video processing or email dispatch).',
      tech: ['TypeScript / Python', 'RabbitMQ or Redis Streams', 'Worker Threads', 'Docker Compose'],
      features: [
        'Job Producer endpoint putting tasks into durable message queues.',
        'Worker processes consuming jobs concurrently with retry exponential backoff.',
        'Dead-Letter-Queue (DLQ) for handling unprocessable failing jobs.',
        'Observability dashboard tracking queue depth, latency, and success rates.'
      ]
    }
  ];

  return (
    <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div className="glass-card">
        <span className="badge badge-amber" style={{ marginBottom: '0.4rem' }}>Portfolio & Mastery Blueprints</span>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Real-World Backend Engineering Projects</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Stop building generic TODO apps. Build these 3 production systems to prove your engineering capability to any senior tech lead.
        </p>
      </div>

      {/* Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {projects.map((proj, idx) => (
          <div key={proj.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '4px solid #3b82f6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: '#60a5fa' }}>
                  {proj.difficulty}
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.2rem' }}>
                  {proj.title}
                </h3>
              </div>
              <span className="badge badge-blue">Blueprint #{idx + 1}</span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {proj.desc}
            </p>

            {/* Tech Stack Chips */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {proj.tech.map((t, i) => (
                <span key={i} style={{ background: 'var(--bg-secondary)', padding: '0.25rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#cbd5e1', border: '1px solid var(--border-color)' }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Features Checklist */}
            <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)', marginTop: '0.25rem' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
                Key Engineering Requirements To Implement
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {proj.features.map((feat, fIdx) => (
                  <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <CheckCircle2 size={16} color="#10b981" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
