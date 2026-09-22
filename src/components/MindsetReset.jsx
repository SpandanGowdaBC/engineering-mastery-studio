import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, ArrowRight, Lightbulb, Compass, AlertTriangle, Cpu, Terminal } from 'lucide-react';

export default function MindsetReset() {
  const [activeTrap, setActiveTrap] = useState(0);

  const traps = [
    {
      id: 'copy-paste',
      title: 'The Copy-Paste / Boilerplate Trap',
      symptom: 'You glued together existing code during your internship, but felt lost when starting from scratch.',
      rootCause: 'In internships, codebase scaffolds are already built. You edited existing patterns without building the mental model of how components connect from line 1.',
      antidote: 'Build tiny things without frameworks. Write pure functions with 0 external libraries first, then layer frameworks on top.',
      icon: Terminal,
      color: 'border-amber-500/30 bg-amber-500/10 text-amber-400'
    },
    {
      id: 'blank-screen',
      title: 'The "Blank Screen" Paralysis',
      symptom: 'Staring at an empty main.js file and not knowing what line 1 should be.',
      rootCause: 'Trying to solve the whole problem in your head at once instead of breaking it into input -> transformation -> output.',
      antidote: 'The 3-Step Pseudocode Rule: Write input parameters on line 1, desired return value on line 10, and fill the 8 lines in between with simple comments.',
      icon: AlertTriangle,
      color: 'border-rose-500/30 bg-rose-500/10 text-rose-400'
    },
    {
      id: 'debug-blindness',
      title: 'Blind Debugging & Guesswork',
      symptom: 'When code errors out, tweaking random variables or copy-pasting into Google without reading stack traces.',
      rootCause: 'Viewing errors as a personal failure rather than exact diagnostic instrumentation provided by the computer.',
      antidote: 'Scientific Debugging: Read top line of error -> find filename + line number -> print input state right before error -> isolate root cause.',
      icon: Cpu,
      color: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-400'
    },
    {
      id: 'framework-overwhelm',
      title: 'Framework & Tooling Inflation',
      symptom: 'Thinking you need Docker, Kubernetes, Next.js, Redis, Kafka, and GraphQL before writing a simple API.',
      rootCause: 'Confusing production infrastructure with core engineering logic.',
      antidote: 'Master Fundamentals: Standard Library HTTP Server + SQL Database + Data Structures. Infrastructure only comes after logic is proven.',
      icon: Compass,
      color: 'border-purple-500/30 bg-purple-500/10 text-purple-400'
    }
  ];

  return (
    <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Banner */}
      <div className="glass-card" style={{ background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.9))', borderLeft: '4px solid #3b82f6' }}>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
          <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '0.8rem', borderRadius: '12px', color: '#60a5fa' }}>
            <Lightbulb size={28} />
          </div>
          <div>
            <span className="badge badge-blue" style={{ marginBottom: '0.5rem' }}>Mental Framework Shift</span>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '0.4rem' }}>
              Why "Doing an Internship" Doesn't Automatically Teach You How to Code
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '900px' }}>
              Feeling like you "can't code" after an internship is normal. Internships often assign task tickets (editing an existing file, fixing a bug, adding a prop). That teaches company process, not <strong style={{ color: '#f8fafc' }}>First-Principles Software Construction</strong>. Here is how we break that barrier today.
            </p>
          </div>
        </div>
      </div>

      {/* Traps vs Antidotes Interactive Inspector */}
      <div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ShieldAlert size={20} color="#3b82f6" /> The 4 Coding Mental Traps & Their Direct Antidotes
        </h3>
        
        <div className="grid-2">
          {/* Left selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {traps.map((trap, index) => {
              const IconComp = trap.icon;
              const isSelected = activeTrap === index;
              return (
                <div
                  key={trap.id}
                  onClick={() => setActiveTrap(index)}
                  style={{
                    padding: '1.1rem 1.25rem',
                    borderRadius: '12px',
                    background: isSelected ? 'rgba(30, 41, 59, 0.95)' : 'var(--bg-card)',
                    border: isSelected ? '1px solid #3b82f6' : '1px solid var(--border-color)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 20px rgba(59, 130, 246, 0.2)' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(255, 255, 255, 0.05)' }}>
                      <IconComp size={20} className={trap.color.split(' ')[2]} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: isSelected ? '#f8fafc' : 'var(--text-muted)' }}>
                        {trap.title}
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '0.1rem' }}>
                        Trap #{index + 1}
                      </p>
                    </div>
                  </div>
                  <ArrowRight size={18} style={{ color: isSelected ? '#3b82f6' : 'var(--text-dim)', transform: isSelected ? 'translateX(4px)' : 'none', transition: 'all 0.2s' }} />
                </div>
              );
            })}
          </div>

          {/* Right Detail Card */}
          <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                <span className="badge badge-amber">Trap Breakdown</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>0{activeTrap + 1} / 04</span>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.75rem', color: '#f8fafc' }}>
                {traps[activeTrap].title}
              </h3>

              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f43f5e', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                  The Symptom
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', background: 'rgba(244, 63, 94, 0.08)', padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '3px solid #f43f5e' }}>
                  "{traps[activeTrap].symptom}"
                </p>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                  Why This Happened In Your Internship
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  {traps[activeTrap].rootCause}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                  The Engineering Antidote
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#34d399', background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem 1rem', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                  {traps[activeTrap].antidote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The 5 Rules of Real Engineers */}
      <div className="glass-card" style={{ marginTop: '0.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={20} color="#10b981" /> The 5 Operating Principles of a Production Backend Engineer
        </h3>

        <div className="grid-3">
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#3b82f6', fontWeight: 700, fontSize: '0.85rem' }}>RULE 01</span>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0.4rem 0' }}>Write Pseudocode First</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Never write executable syntax before stating the step-by-step logic in plain English comments.</p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>RULE 02</span>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0.4rem 0' }}>Embrace Console & Debuggers</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Print object state at every step (`console.log` or breakpoints). Great engineers inspect, never assume.</p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#8b5cf6', fontWeight: 700, fontSize: '0.85rem' }}>RULE 03</span>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 600, margin: '0.4rem 0' }}>Master Data Types & Memory</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Know the exact data types passing through your functions: Primitive strings/numbers vs Reference arrays/objects.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
