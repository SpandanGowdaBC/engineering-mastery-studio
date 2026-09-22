import React, { useState } from 'react';
import { Play, CheckCircle2, XCircle, Terminal, RotateCcw, Lightbulb, Code2 } from 'lucide-react';

export default function CodeSandboxDrills() {
  const [selectedDrill, setSelectedDrill] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [testResult, setTestResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const drills = [
    {
      id: 'drill-1',
      title: 'Drill 01: Pure Array Transformation (No Libraries)',
      level: 'Foundation',
      goal: 'Write a function `groupLogsByStatus(logs)` that takes an array of raw log strings and returns an object counting each HTTP status code.',
      initialCode: `// Exercise: Process raw HTTP logs
// Input example: ["GET 200", "POST 500", "GET 200", "DELETE 404", "GET 200"]
// Target Output: { "200": 3, "500": 1, "404": 1 }

function groupLogsByStatus(logs) {
  const counts = {};
  
  for (let i = 0; i < logs.length; i++) {
    // 1. Split log entry by space to get status code
    const parts = logs[i].split(" ");
    const statusCode = parts[1];
    
    // 2. Increment count in object
    if (counts[statusCode]) {
      counts[statusCode] += 1;
    } else {
      counts[statusCode] = 1;
    }
  }
  
  return counts;
}`,
      testInput: '["GET 200", "POST 500", "GET 200", "DELETE 404", "GET 200", "POST 500"]',
      expectedOutput: '{"200":3,"500":2,"404":1}',
      explanation: 'Notice how we broke this down: 1) Initialize output container -> 2) Loop array -> 3) Extract substring -> 4) Mutate container state -> 5) Return container.'
    },
    {
      id: 'drill-2',
      title: 'Drill 02: In-Memory REST Router Logic',
      level: 'Intermediate',
      goal: 'Build a basic path router `matchRoute(routes, method, path)` that matches an incoming HTTP method + path to its handler function.',
      initialCode: `// Exercise: In-Memory Path Matching
const routes = [
  { method: "GET", path: "/api/users", handler: "getUsersHandler" },
  { method: "POST", path: "/api/users", handler: "createUserHandler" },
  { method: "GET", path: "/api/health", handler: "healthCheckHandler" }
];

function matchRoute(routes, method, path) {
  for (const route of routes) {
    if (route.method === method && route.path === path) {
      return route.handler;
    }
  }
  return "404NotFoundHandler";
}`,
      testInput: 'method: "POST", path: "/api/users"',
      expectedOutput: '"createUserHandler"',
      explanation: 'This is the exact logic behind Web Frameworks (Express, FastAPI, Spring). They store route mappings in memory and loop/hash match on incoming HTTP requests.'
    },
    {
      id: 'drill-3',
      title: 'Drill 03: Token Bucket Rate Limiter Logic',
      level: 'Advanced',
      goal: 'Simulate a rate limiter `allowRequest(bucket, cost)` that checks if a client has enough tokens left to consume.',
      initialCode: `// Exercise: Token Bucket Rate Limiting
// bucket = { tokens: 5, max: 10 }

function allowRequest(bucket, cost = 1) {
  if (bucket.tokens >= cost) {
    bucket.tokens -= cost;
    return { allowed: true, tokensLeft: bucket.tokens };
  } else {
    return { allowed: false, tokensLeft: bucket.tokens, error: "429 Too Many Requests" };
  }
}`,
      testInput: 'bucket: { tokens: 1, max: 5 }, cost: 2',
      expectedOutput: '{"allowed":false,"tokensLeft":1,"error":"429 Too Many Requests"}',
      explanation: 'This is how modern APIs (Stripe, GitHub, OpenAI) enforce rate limits to protect backend databases from traffic bursts.'
    }
  ];

  // Initialize code when drill changes
  React.useEffect(() => {
    setUserCode(drills[selectedDrill].initialCode);
    setTestResult(null);
  }, [selectedDrill]);

  const handleRunCode = () => {
    setIsRunning(true);
    setTestResult(null);

    setTimeout(() => {
      try {
        const currDrill = drills[selectedDrill];
        let resultOutput = '';

        if (selectedDrill === 0) {
          // Eval function safely
          const fn = new Function(`
            ${userCode}
            return groupLogsByStatus(["GET 200", "POST 500", "GET 200", "DELETE 404", "GET 200", "POST 500"]);
          `);
          const res = fn();
          resultOutput = JSON.stringify(res);
        } else if (selectedDrill === 1) {
          const fn = new Function(`
            ${userCode}
            return matchRoute(routes, "POST", "/api/users");
          `);
          const res = fn();
          resultOutput = JSON.stringify(res);
        } else if (selectedDrill === 2) {
          const fn = new Function(`
            ${userCode}
            return allowRequest({ tokens: 1, max: 5 }, 2);
          `);
          const res = fn();
          resultOutput = JSON.stringify(res);
        }

        const isSuccess = resultOutput === currDrill.expectedOutput;

        setTestResult({
          success: isSuccess,
          output: resultOutput,
          expected: currDrill.expectedOutput,
          message: isSuccess ? 'All test assertions passed! Clean logic execution.' : 'Output mismatch. Inspect your return value.'
        });
      } catch (err) {
        setTestResult({
          success: false,
          error: err.toString(),
          message: 'Runtime Error encountered during execution.'
        });
      } finally {
        setIsRunning(false);
      }
    }, 400);
  };

  return (
    <div className="tab-content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header Banner */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span className="badge badge-emerald" style={{ marginBottom: '0.4rem' }}>Interactive Sandbox</span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Backend Logic & Execution Drills</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Build your coding confidence by executing raw backend logic step-by-step without framework magic.
          </p>
        </div>
      </div>

      {/* Drill Selector Bar */}
      <div style={{ display: 'flex', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {drills.map((drill, idx) => (
          <button
            key={drill.id}
            onClick={() => setSelectedDrill(idx)}
            className={`tab-btn ${selectedDrill === idx ? 'active' : ''}`}
            style={{ fontSize: '0.85rem' }}
          >
            <Code2 size={16} />
            {drill.title.split(':')[0]}
          </button>
        ))}
      </div>

      {/* Main Sandbox Layout */}
      <div className="grid-2" style={{ gridTemplateColumns: '1.2fr 0.8fr', alignItems: 'stretch' }}>
        {/* Left: Code Editor Container */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Terminal size={18} color="#3b82f6" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
                backend_drill_0{selectedDrill + 1}.js
              </span>
            </div>
            <button
              onClick={() => setUserCode(drills[selectedDrill].initialCode)}
              className="btn-secondary"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          {/* Textarea Editor */}
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            style={{
              flex: 1,
              minHeight: '260px',
              width: '100%',
              background: '#0a0f1d',
              color: '#f8fafc',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #1e293b',
              outline: 'none',
              resize: 'vertical',
              lineHeight: 1.6
            }}
          />

          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={handleRunCode} disabled={isRunning} className="btn-primary">
              <Play size={16} /> {isRunning ? 'Executing Logic...' : 'Run Drill & Validate'}
            </button>
          </div>
        </div>

        {/* Right: Test Inspector & Explanation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Goal Description */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#60a5fa' }}>
              {drills[selectedDrill].title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
              {drills[selectedDrill].goal}
            </p>

            <div style={{ background: 'var(--bg-secondary)', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Test Case Input:</span>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#fbbf24', marginTop: '0.2rem' }}>
                {drills[selectedDrill].testInput}
              </p>
            </div>
          </div>

          {/* Execution Result Box */}
          <div className="glass-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={16} /> Execution Output Log
              </h4>

              {testResult ? (
                <div style={{
                  padding: '0.85rem',
                  borderRadius: '8px',
                  background: testResult.success ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
                  border: testResult.success ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(244, 63, 94, 0.3)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem', color: testResult.success ? '#34d399' : '#f43f5e', fontWeight: 700, fontSize: '0.85rem' }}>
                    {testResult.success ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                    {testResult.message}
                  </div>

                  {testResult.output && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#e2e8f0', marginTop: '0.4rem' }}>
                      <strong>Output: </strong> {testResult.output}
                    </div>
                  )}

                  {testResult.error && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#f43f5e', marginTop: '0.4rem' }}>
                      {testResult.error}
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ color: 'var(--text-dim)', fontSize: '0.85rem', fontStyle: 'italic', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', textAlign: 'center' }}>
                  Click "Run Drill & Validate" to execute code.
                </div>
              )}
            </div>

            {/* Explanation Note */}
            <div style={{ marginTop: '1rem', background: 'rgba(59, 130, 246, 0.08)', padding: '0.75rem', borderRadius: '8px', borderLeft: '3px solid #3b82f6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#60a5fa', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                <Lightbulb size={14} /> Key Engineering Insight
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {drills[selectedDrill].explanation}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
