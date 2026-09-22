import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Database, Server, Cpu, Play, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function FlowSimulator() {
  const [activeTab, setActiveTab] = useState('request-flow');
  const [requestStep, setRequestStep] = useState(0);

  const requestSteps = [
    { title: '1. Client HTTP Request', desc: 'Client sends HTTP POST /api/v1/orders with JSON payload and JWT Bearer Header', target: 'Client Browser / Mobile' },
    { title: '2. API Gateway & SSL Termination', desc: 'Gateway verifies SSL certificate, parses CORS, and routes to Backend Service', target: 'Nginx / Gateway' },
    { title: '3. Middleware Auth Pipeline', desc: 'Auth middleware extracts JWT, checks signature against secret, attaches decoded user to req.user', target: 'Auth Middleware' },
    { title: '4. Controller & Input Validation', desc: 'Controller validates input schema (item_id, quantity > 0). Rejects invalid payloads with 400 Bad Request', target: 'Order Controller' },
    { title: '5. Business Logic Service', desc: 'Service calculates total cost, applies discount codes, and opens Database Transaction', target: 'Order Service' },
    { title: '6. Database Persistence & SQL', desc: 'Executes `INSERT INTO orders ...` and `UPDATE inventory SET stock = stock - 1`. Commits transaction', target: 'PostgreSQL DB' },
    { title: '7. HTTP 201 Response Return', desc: 'Service returns created order object. Controller responds to client with HTTP 201 Created', target: 'HTTP Response' }
  ];

  const handleNextStep = () => {
    setRequestStep(prev => (prev + 1) % requestSteps.length);
  };

  return (
    <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Header */}
      <div className="glass-card">
        <span className="badge badge-purple" style={{ marginBottom: '0.4rem' }}>Interactive System Flow</span>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Backend Request Lifecycle & Architecture Simulator</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Visualize how code, data, and HTTP requests flow through a production backend step-by-step.
        </p>
      </div>

      {/* Simulator Control */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Server size={20} color="#3b82f6" /> Production HTTP Request Lifecycle Walkthrough
          </h3>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => setRequestStep(0)} className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
              <RefreshCw size={14} /> Reset Flow
            </button>
            <button onClick={handleNextStep} className="btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }}>
              <Play size={14} /> Step {requestStep + 1} / {requestSteps.length}
            </button>
          </div>
        </div>

        {/* Visual Pipeline Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', padding: '0.5rem 0' }}>
          {requestSteps.map((s, idx) => {
            const isActive = idx === requestStep;
            const isPast = idx < requestStep;
            return (
              <div
                key={idx}
                onClick={() => setRequestStep(idx)}
                style={{
                  flex: 1,
                  minWidth: '130px',
                  padding: '0.75rem',
                  borderRadius: '10px',
                  background: isActive ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : isPast ? 'rgba(16, 185, 129, 0.15)' : 'var(--bg-secondary)',
                  border: isActive ? '1px solid #60a5fa' : isPast ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: isActive ? '#ffffff' : isPast ? '#34d399' : 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  STEP 0{idx + 1}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: isActive ? '#ffffff' : '#f8fafc', marginTop: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {s.title.split('.')[1]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Active Step Inspector */}
        <div style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '1rem', borderRadius: '12px', color: '#60a5fa' }}>
            <Cpu size={32} />
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc' }}>
                {requestSteps[requestStep].title}
              </h4>
              <span className="badge badge-blue">{requestSteps[requestStep].target}</span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {requestSteps[requestStep].desc}
            </p>
          </div>
        </div>
      </div>

      {/* Memory Call Stack vs Heap Visualizer Card */}
      <div className="glass-card">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Database size={20} color="#10b981" /> Call Stack vs Heap Memory Mental Model
        </h3>

        <div className="grid-2">
          {/* Stack */}
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '0.5rem' }}>Call Stack (Execution)</span>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>Primitive Values & Function Frames</h4>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '1.2rem' }}>
              <li>Stores primitive variables (`number`, `boolean`, `pointers`).</li>
              <li>LIFO (Last In, First Out) execution structure.</li>
              <li>Pushed when function is called, popped immediately upon `return`.</li>
            </ul>
          </div>

          {/* Heap */}
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <span className="badge badge-amber" style={{ marginBottom: '0.5rem' }}>Heap Memory (Objects & Dynamic)</span>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.5rem' }}>Reference Types & Persistent Data</h4>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem', paddingLeft: '1.2rem' }}>
              <li>Stores large dynamic structures (`Objects`, `Arrays`, `Classes`).</li>
              <li>Unstructured memory allocated dynamically.</li>
              <li>Stack holds variable pointers referencing memory addresses in Heap.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
