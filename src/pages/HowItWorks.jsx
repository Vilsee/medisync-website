import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Layers, Zap, Shield, Brain, Database, Server, Code2, Globe, Clock } from 'lucide-react'
import { useState } from 'react'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

const steps = [
    { number: '01', title: 'FHIR Bundle Ingestion', desc: 'Submit a FHIR R4 Bundle containing Patient, Encounter, Observation, MedicationRequest, and Condition resources. The adapter validates schema, normalises to internal models, and triggers de-identification for demo mode.', icon: Database, tech: 'fhirclient, HAPI FHIR, Pydantic v2' },
    { number: '02', title: 'Orchestrator Routes Work', desc: 'The LangGraph-managed Orchestrator Agent parses the clinical context, extracts relevant data, and fans out work to three specialist sub-agents. It manages token budgets and enforces confidence thresholds.', icon: Brain, tech: 'LangGraph 0.2+, LangChain 0.3+' },
    { number: '03', title: 'Parallel Agent Execution', desc: 'Clinical Scribe and Drug Interaction Analyst run in parallel via asyncio.gather(). The Medical Coding Advisor receives Scribe output as context before executing — a sequential dependency.', icon: Zap, tech: 'asyncio, Pydantic AI, GPT-4o' },
    { number: '04', title: 'Response Merging & Scoring', desc: 'Sub-agent outputs are merged, ranked by confidence, and validated against structured output schemas. Outputs below 0.6 confidence trigger a low_confidence flag and human-review prompt.', icon: Shield, tech: 'Pydantic v2, structured validation' },
    { number: '05', title: 'Unified API Response', desc: 'The merged AgentResponse is returned as structured JSON via REST API or streamed via SSE. Every action is logged to an append-only audit table with SHA-256 input/output hashes.', icon: Server, tech: 'FastAPI, uvicorn, SSE streaming' },
]

const benchmarks = [
    { label: 'Full Pipeline P50', value: '3.2s', bar: 53 },
    { label: 'Full Pipeline P95', value: '5.8s', bar: 97 },
    { label: 'Time-to-First-Token', value: '180ms', bar: 30 },
    { label: 'Concurrent Capacity', value: '200 runs', bar: 80 },
]

const hoodItems = [
    { q: 'How does the token budget work?', a: 'The Orchestrator enforces a maximum 8,000-token context window per sub-agent call. Token budgets are managed dynamically based on encounter complexity — shorter encounters get fewer tokens, complex multi-problem encounters get the full budget.' },
    { q: 'What happens if an LLM call fails?', a: 'If the primary LLM (GPT-4o) latency exceeds 4,000ms, the Orchestrator falls back to Claude 3.5 Haiku for speed. If all LLM providers fail, the circuit breaker trips and returns a graceful error with the audit trail.' },
    { q: 'How is data privacy handled?', a: 'MediSync never stores real PHI in demo mode — all demos use Synthea-generated synthetic records. In production, all FHIR bundles are processed in-memory and only audit hashes are persisted. API keys are hashed with bcrypt at rest.' },
    { q: 'What LLM providers are supported?', a: 'Via LiteLLM gateway: GPT-4o, Claude 3.5 Sonnet, Claude 3.5 Haiku, Llama 3.1 70B (Ollama for local), and any OpenAI-compatible endpoint. Hot-swap providers via PATCH /v1/config/llm without restart.' },
]

function Accordion({ items }) {
    const [openIdx, setOpenIdx] = useState(null)
    return (
        <div>
            {items.map((item, i) => (
                <div key={i} className="accordion-item">
                    <button className="accordion-trigger" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                        {item.q}
                        <ChevronDown size={16} style={{ transform: openIdx === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>
                    {openIdx === i && <div className="accordion-content">{item.a}</div>}
                </div>
            ))}
        </div>
    )
}

export default function HowItWorks() {
    return (
        <div>
            <section className="section-lg" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }}>
                <div className="container text-center">
                    <motion.span className="badge" initial="hidden" animate="visible" variants={fadeUp}>Architecture</motion.span>
                    <motion.h1 className="text-display" style={{ margin: 'var(--space-4) auto', maxWidth: 800 }} initial="hidden" animate="visible" variants={fadeUp} custom={1}>
                        From FHIR Bundle to <span className="text-gradient">Clinical Intelligence</span>
                    </motion.h1>
                    <motion.p className="text-dim" style={{ maxWidth: 600, margin: '0 auto' }} initial="hidden" animate="visible" variants={fadeUp} custom={2}>
                        A step-by-step walkthrough of how MediSync processes clinical data through its multi-agent pipeline.
                    </motion.p>
                </div>
            </section>

            {/* Steps */}
            <section className="section">
                <div className="container" style={{ maxWidth: 800 }}>
                    {steps.map((step, i) => (
                        <motion.div key={step.number} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5} style={{ marginBottom: 'var(--space-8)' }}>
                            <div className="flex gap-6" style={{ alignItems: 'flex-start' }}>
                                <div>
                                    <div className="step-number">{step.number}</div>
                                    {i < steps.length - 1 && <div className="step-line" />}
                                </div>
                                <div className="glass-card" style={{ flex: 1 }}>
                                    <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-3)' }}>
                                        <step.icon size={20} className="text-electric" />
                                        <h3>{step.title}</h3>
                                    </div>
                                    <p className="text-dim text-small" style={{ lineHeight: 1.7, marginBottom: 'var(--space-3)' }}>{step.desc}</p>
                                    <span className="badge"><Code2 size={10} /> {step.tech}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Sequence Diagram */}
            <section className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(13,33,65,0.3), transparent)' }}>
                <div className="container text-center">
                    <motion.h2 className="text-h1" style={{ marginBottom: 'var(--space-8)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        Sequence Diagram
                    </motion.h2>
                    <motion.div className="glass-surface" style={{ padding: 'var(--space-8)', maxWidth: 900, margin: '0 auto', textAlign: 'left' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
                        <pre className="code-block" style={{ fontSize: 'var(--text-xs)', lineHeight: 1.8 }}>
                            {`Client          Orchestrator       Scribe          DrugAnalyst      CodingAdvisor
  │                  │                │                  │                │
  │── POST /v1/run ──▶                │                  │                │
  │                  │                │                  │                │
  │                  │── parse FHIR ──▶                  │                │
  │                  │                │                  │                │
  │                  │── fan-out ─────▶── generate() ──▶ │                │
  │                  │                │                  │── analyze() ──▶│
  │                  │                │                  │                │
  │                  │◀── SOAP note ──│                  │                │
  │                  │                │◀── interactions ─│                │
  │                  │                │                  │                │
  │                  │── sequential ──▶───────────────────▶── suggest() ─▶│
  │                  │                │                  │                │
  │                  │◀── codes ──────│──────────────────│────────────────│
  │                  │                │                  │                │
  │◀── AgentResponse │                │                  │                │
  │                  │                │                  │                │`}
                        </pre>
                    </motion.div>
                </div>
            </section>

            {/* Latency Benchmarks */}
            <section className="section">
                <div className="container">
                    <motion.h2 className="text-h1 text-center" style={{ marginBottom: 'var(--space-8)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        Latency Benchmarks
                    </motion.h2>
                    <motion.div className="grid grid-2" style={{ maxWidth: 700, margin: '0 auto' }} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {benchmarks.map((b, i) => (
                            <motion.div key={b.label} className="glass-card" variants={fadeUp} custom={i}>
                                <div className="flex justify-between items-center" style={{ marginBottom: 'var(--space-2)' }}>
                                    <span className="text-small text-dim">{b.label}</span>
                                    <span className="text-white" style={{ fontWeight: 700 }}>{b.value}</span>
                                </div>
                                <div className="progress-bar">
                                    <div className="progress-fill" style={{ width: `${b.bar}%` }} />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Under the Hood */}
            <section className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(13,33,65,0.3), transparent)' }}>
                <div className="container" style={{ maxWidth: 700 }}>
                    <motion.h2 className="text-h1 text-center" style={{ marginBottom: 'var(--space-8)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        What Happens Under the Hood
                    </motion.h2>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
                        <Accordion items={hoodItems} />
                    </motion.div>
                </div>
            </section>

            <section className="section text-center">
                <div className="container">
                    <h2 className="text-h1" style={{ marginBottom: 'var(--space-4)' }}>See it in action</h2>
                    <p className="text-dim" style={{ marginBottom: 'var(--space-8)' }}>Try the live playground or read the API docs.</p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/playground" className="btn btn-primary btn-lg">Try Playground <ArrowRight size={16} /></Link>
                        <Link to="/docs/api" className="btn btn-secondary btn-lg">API Reference</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
