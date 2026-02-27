import DocsSidebar from '../../components/DocsSidebar'
import { motion } from 'framer-motion'
import { useState } from 'react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

const endpoints = [
    { method: 'POST', path: '/v1/run', desc: 'Submit a FHIR bundle and run the full 3-agent pipeline.', auth: 'Bearer', request: '{\n  "fhir_bundle": { "resourceType": "Bundle", ... },\n  "config": {\n    "agents": ["scribe", "drug_interactions", "coding"],\n    "llm": "gpt-4o",\n    "confidence_threshold": 0.70\n  }\n}', response: '{\n  "trace_id": "ms_01J2X...",\n  "status": "completed",\n  "latency_ms": 3842,\n  "scribe": { ... },\n  "drug_interactions": [ ... ],\n  "coding": { ... }\n}', status: [{ code: 200, desc: 'Success' }, { code: 400, desc: 'Invalid FHIR bundle' }, { code: 401, desc: 'Unauthorized' }, { code: 429, desc: 'Rate limited' }] },
    { method: 'POST', path: '/v1/run/stream', desc: 'Same as /run but streams Scribe output via SSE.', auth: 'Bearer', request: '{\n  "fhir_bundle": { ... },\n  "config": { "stream_scribe": true }\n}', response: 'data: {"type": "scribe_token", "token": "Patient"}\ndata: {"type": "scribe_token", "token": " presents"}\n...\ndata: {"type": "complete", "response": { ... }}', status: [{ code: 200, desc: 'SSE stream' }, { code: 400, desc: 'Invalid bundle' }] },
    { method: 'POST', path: '/v1/agents/scribe', desc: 'Run only the Clinical Scribe agent.', auth: 'Bearer', request: '{ "fhir_bundle": { ... } }', response: '{\n  "soap_note": { ... },\n  "confidence": 0.89,\n  "evidence": [ ... ]\n}', status: [{ code: 200, desc: 'Success' }] },
    { method: 'POST', path: '/v1/agents/drug-interactions', desc: 'Run only the Drug Interaction Analyst.', auth: 'Bearer', request: '{ "fhir_bundle": { ... } }', response: '{\n  "interactions": [\n    { "pair": ["metformin","lisinopril"], "severity": "moderate" }\n  ]\n}', status: [{ code: 200, desc: 'Success' }] },
    { method: 'POST', path: '/v1/agents/coding', desc: 'Run only the Medical Coding Advisor.', auth: 'Bearer', request: '{ "fhir_bundle": { ... } }', response: '{\n  "icd10": [{"code":"E11.9","desc":"Type 2 Diabetes","conf":0.94}],\n  "cpt": [{"code":"99213","desc":"Office Visit","conf":0.87}]\n}', status: [{ code: 200, desc: 'Success' }] },
    { method: 'GET', path: '/v1/audit/logs', desc: 'Retrieve audit log entries.', auth: 'Bearer Admin', request: null, response: '{\n  "logs": [\n    { "trace_id": "ms_01J2X...", "timestamp": "...", "agent": "scribe" }\n  ]\n}', status: [{ code: 200, desc: 'Success' }, { code: 403, desc: 'Admin required' }] },
    { method: 'GET', path: '/v1/health', desc: 'Service health check.', auth: 'Public', request: null, response: '{\n  "status": "healthy",\n  "agents": { "scribe": "idle", "drug": "idle", "coding": "idle" },\n  "llm": "connected"\n}', status: [{ code: 200, desc: 'Healthy' }] },
    { method: 'GET', path: '/v1/models', desc: 'List configured LLM backends.', auth: 'Bearer', request: null, response: '{\n  "models": [\n    { "provider": "openai", "model": "gpt-4o", "status": "available" }\n  ]\n}', status: [{ code: 200, desc: 'Success' }] },
    { method: 'PATCH', path: '/v1/config/llm', desc: 'Hot-swap LLM provider without restart.', auth: 'Bearer Admin', request: '{ "provider": "anthropic", "model": "claude-3.5-sonnet" }', response: '{ "status": "updated", "active_model": "claude-3.5-sonnet" }', status: [{ code: 200, desc: 'Updated' }] },
]

const methodColors = { POST: 'var(--status-success)', GET: 'var(--brand-electric)', PATCH: 'var(--status-warning)', DELETE: 'var(--status-critical)' }

export default function APIReference() {
    const [expanded, setExpanded] = useState(null)

    return (
        <div style={{ paddingTop: 'var(--nav-height)' }}>
            <div className="docs-layout">
                <DocsSidebar />
                <div>
                    <motion.div initial="hidden" animate="visible">
                        <motion.div variants={fadeUp}>
                            <h1 className="text-h1" style={{ marginBottom: 'var(--space-3)' }}>REST API Reference</h1>
                            <p className="text-dim" style={{ marginBottom: 'var(--space-3)' }}>
                                OpenAPI 3.1 specification. Base URL: <code className="code-inline">http://localhost:8080/v1</code>
                            </p>
                            <p className="text-dim text-small" style={{ marginBottom: 'var(--space-8)' }}>
                                Auth: <code className="code-inline">Authorization: Bearer {'<API_KEY>'}</code> — HMAC-SHA256 signed, scoped to read / write / admin.
                            </p>
                        </motion.div>

                        {endpoints.map((ep, i) => (
                            <motion.div key={ep.path + ep.method} className="glass-card" style={{ marginBottom: 'var(--space-4)', padding: 'var(--space-5)' }} variants={fadeUp} custom={i}>
                                <button onClick={() => setExpanded(expanded === i ? null : i)} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 'var(--space-3)', color: 'white' }}>
                                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-sm)', background: `${methodColors[ep.method]}20`, color: methodColors[ep.method] }}>
                                        {ep.method}
                                    </span>
                                    <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', flex: 1 }}>{ep.path}</code>
                                    <span className="text-dim text-small" style={{ textAlign: 'right' }}>{ep.auth}</span>
                                </button>

                                {expanded === i && (
                                    <div style={{ marginTop: 'var(--space-4)', borderTop: '1px solid var(--glass-border)', paddingTop: 'var(--space-4)' }}>
                                        <p className="text-dim text-small" style={{ marginBottom: 'var(--space-4)' }}>{ep.desc}</p>

                                        {ep.request && (
                                            <div style={{ marginBottom: 'var(--space-4)' }}>
                                                <span className="text-xs text-slate" style={{ fontWeight: 600, display: 'block', marginBottom: 'var(--space-2)' }}>REQUEST BODY</span>
                                                <pre className="code-block" style={{ fontSize: 'var(--text-xs)' }}>{ep.request}</pre>
                                            </div>
                                        )}

                                        <div style={{ marginBottom: 'var(--space-4)' }}>
                                            <span className="text-xs text-slate" style={{ fontWeight: 600, display: 'block', marginBottom: 'var(--space-2)' }}>RESPONSE</span>
                                            <pre className="code-block" style={{ fontSize: 'var(--text-xs)' }}>{ep.response}</pre>
                                        </div>

                                        <div>
                                            <span className="text-xs text-slate" style={{ fontWeight: 600, display: 'block', marginBottom: 'var(--space-2)' }}>STATUS CODES</span>
                                            <div className="flex gap-2 flex-wrap">
                                                {ep.status.map(s => (
                                                    <span key={s.code} className={`badge ${s.code < 300 ? 'badge-success' : s.code < 500 ? 'badge-warning' : 'badge-critical'}`}>
                                                        {s.code} {s.desc}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
