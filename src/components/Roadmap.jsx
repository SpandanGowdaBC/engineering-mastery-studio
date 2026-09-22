import React, { useState } from 'react';
import { Layers, CheckCircle2, Circle, ChevronRight, BookOpen, Code2, Server, Network } from 'lucide-react';

export default function Roadmap() {
  const [completedItems, setCompletedItems] = useState({});

  const toggleCheck = (id) => {
    setCompletedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const phases = [
    {
      id: 'phase-1',
      number: '01',
      title: 'First-Principles Coding & Logic Mastery',
      subtitle: 'Building the fundamental muscle to translate thoughts into bug-free executable functions from scratch.',
      icon: Code2,
      badge: 'Phase 1 • Weeks 1-3',
      color: '#3b82f6',
      items: [
        { id: 'p1-1', title: 'Data Types, References & Scope', desc: 'Understanding stack vs heap memory, pass-by-value vs pass-by-reference, and lexical variable scope.' },
        { id: 'p1-2', title: 'Problem Decomposition Technique', desc: 'Breaking complex requirements down into 3-line input -> transform -> output pseudo-code specifications.' },
        { id: 'p1-3', title: 'Pure Function & Mutability Discipline', desc: 'Writing predictable functions that produce zero unexpected side effects on global or external state.' },
        { id: 'p1-4', title: 'Error Reading & Systematic Debugging', desc: 'Locating exact lines in call stack traces, printing input states, and using interactive debuggers.' }
      ]
    },
    {
      id: 'phase-2',
      number: '02',
      title: 'Backend Core: HTTP, APIs & Data Persistence',
      subtitle: 'Understanding client-server protocols, data modeling, databases, and RESTful web services.',
      icon: Server,
      badge: 'Phase 2 • Weeks 4-7',
      color: '#10b981',
      items: [
        { id: 'p2-1', title: 'Raw HTTP & Request Lifecycle', desc: 'Header structures, HTTP verbs (GET, POST, PUT, DELETE), status codes (2xx, 4xx, 5xx), and body parsing.' },
        { id: 'p2-2', title: 'Relational SQL & Schema Design', desc: 'Writing raw SQL queries (SELECT, JOIN, GROUP BY), primary/foreign keys, normalization, and indexes.' },
        { id: 'p2-3', title: 'Middleware Architecture & Authentication', desc: 'Building pipeline middleware for request logging, JWT token verification, and centralized error handling.' },
        { id: 'p2-4', title: 'CRUD API Server Construction', desc: 'Building a complete REST API service without heavy magic ORMs using clean controller-service architecture.' }
      ]
    },
    {
      id: 'phase-3',
      number: '03',
      title: 'Software Craftsmanship & Production Engineering',
      subtitle: 'Applying industry standards: Testing, Clean Architecture, CI/CD, and Observability.',
      icon: Layers,
      badge: 'Phase 3 • Weeks 8-10',
      color: '#8b5cf6',
      items: [
        { id: 'p3-1', title: 'Automated Testing (Unit & Integration)', desc: 'Writing TDD unit tests with Jest/PyTest and integration tests for API endpoints with mock DBs.' },
        { id: 'p3-2', title: 'Clean Architecture & Modular Design', desc: 'Separating concerns: Controllers -> Services -> Repositories -> Models to keep code maintainable.' },
        { id: 'p3-3', title: 'Git Workflow & Code Reviews', desc: 'Interactive rebase, clean atomic commits, semantic PR descriptions, and conflict resolution.' },
        { id: 'p3-4', title: 'Structured Logging & Metrics', desc: 'Emitting JSON structured logs, tracing request IDs across handlers, and catching silent failures.' }
      ]
    },
    {
      id: 'phase-4',
      number: '04',
      title: 'Distributed Systems & High-Scale Architecture',
      subtitle: 'Handling concurrency, caching, rate limiting, and system scaling.',
      icon: Network,
      badge: 'Phase 4 • Weeks 11-14',
      color: '#06b6d4',
      items: [
        { id: 'p4-1', title: 'Caching Strategies & Redis', desc: 'Cache-Aside, Write-Through patterns, cache invalidation, and TTL management.' },
        { id: 'p4-2', title: 'Rate Limiting & Resiliency', desc: 'Implementing Sliding Window & Token Bucket algorithms to defend APIs against overload.' },
        { id: 'p4-3', title: 'Asynchronous Queues & Background Workers', desc: 'Offloading long tasks (emails, data processing) to message queues like BullMQ or RabbitMQ.' },
        { id: 'p4-4', title: 'System Design Blueprinting', desc: 'Designing end-to-end architectures (URL shortener, payment gateway, live notification system).' }
      ]
    }
  ];

  const totalItems = phases.reduce((acc, p) => acc + p.items.length, 0);
  const checkedCount = Object.values(completedItems).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / totalItems) * 100);

  return (
    <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Progress Dashboard Header */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <span className="badge badge-purple" style={{ marginBottom: '0.4rem' }}>Curriculum Progress</span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Software & Backend Mastery Track</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>
            Track your journey from basic syntax to confident backend system architect.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>
              {checkedCount} / {totalItems}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Milestones Completed
            </div>
          </div>
          <div style={{ width: '120px', height: '10px', background: 'var(--bg-secondary)', borderRadius: '999px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #06b6d4)', transition: 'all 0.4s ease' }} />
          </div>
        </div>
      </div>

      {/* Phases Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {phases.map((phase) => {
          const IconComp = phase.icon;
          return (
            <div key={phase.id} className="glass-card" style={{ position: 'relative', borderLeft: `4px solid ${phase.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ background: `${phase.color}20`, border: `1px solid ${phase.color}40`, padding: '0.65rem', borderRadius: '12px', color: phase.color }}>
                    <IconComp size={24} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', fontWeight: 700, color: phase.color }}>
                        PHASE {phase.number}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-secondary)', padding: '0.15rem 0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                        {phase.badge}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc', marginTop: '0.2rem' }}>
                      {phase.title}
                    </h3>
                  </div>
                </div>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                {phase.subtitle}
              </p>

              {/* Items List */}
              <div className="grid-2">
                {phase.items.map((item) => {
                  const isChecked = !!completedItems[item.id];
                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      style={{
                        padding: '1rem',
                        borderRadius: '10px',
                        background: isChecked ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-secondary)',
                        border: isChecked ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border-color)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        gap: '0.85rem',
                        alignItems: 'flex-start'
                      }}
                    >
                      <div style={{ marginTop: '0.15rem', color: isChecked ? '#10b981' : 'var(--text-dim)' }}>
                        {isChecked ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: isChecked ? '#34d399' : '#f8fafc', textDecoration: isChecked ? 'line-through' : 'none' }}>
                          {item.title}
                        </h4>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
