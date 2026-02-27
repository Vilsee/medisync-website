import DocsSidebar from '../../components/DocsSidebar'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useState } from 'react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

const classes = [
    {
        name: 'MediSyncClient', desc: 'Main entry point for the MediSync SDK. Manages configuration, LLM connections, and pipeline execution.',
        methods: [
            { sig: 'async run(fhir_bundle: dict, config: RunConfig = None) → AgentResponse', desc: 'Run the full 3-agent pipeline on a FHIR R4 Bundle.' },
            { sig: 'async run_stream(fhir_bundle: dict, config: RunConfig = None) → AsyncIterator[StreamEvent]', desc: 'Run pipeline with SSE streaming for the Scribe agent.' },
            { sig: 'async run_agent(agent: str, fhir_bundle: dict) → AgentOutput', desc: 'Run a single agent (scribe, drug_interactions, or coding).' },
            { sig: 'configure(provider: str, model: str, **kwargs) → None', desc: 'Hot-swap LLM provider and model at runtime.' },
            { sig: 'health() → HealthStatus', desc: 'Check service health, agent status, LLM connectivity.' },
        ]
    },
    {
        name: 'AgentContext', desc: 'Structured context passed to each agent, extracted from the FHIR bundle.',
        methods: [
            { sig: 'patient: Patient', desc: 'Parsed FHIR Patient resource.' },
            { sig: 'encounter: Encounter', desc: 'Current encounter data.' },
            { sig: 'observations: list[Observation]', desc: 'Clinical observations (vitals, labs).' },
            { sig: 'medications: list[MedicationRequest]', desc: 'Active medication orders.' },
            { sig: 'conditions: list[Condition]', desc: 'Active diagnoses.' },
        ]
    },
    {
        name: 'AgentResponse', desc: 'Unified response from the full MediSync pipeline. Contains typed sub-objects for each agent.',
        methods: [
            { sig: 'trace_id: str', desc: 'Unique trace identifier for audit logging.' },
            { sig: 'status: Literal["completed", "partial", "failed"]', desc: 'Pipeline completion status.' },
            { sig: 'latency_ms: int', desc: 'Total pipeline execution time in milliseconds.' },
            { sig: 'scribe: ScribeOutput', desc: 'Clinical Scribe agent output (SOAP note, confidence).' },
            { sig: 'drug_interactions: list[DrugInteraction]', desc: 'Drug Interaction Analyst results.' },
            { sig: 'coding: CodingOutput', desc: 'Medical Coding Advisor results (ICD-10, CPT).' },
            { sig: 'audit_hash: str', desc: 'SHA-256 hash of input/output for compliance.' },
            { sig: 'warnings: list[str]', desc: 'Pipeline warnings (low confidence, fallback used, etc.).' },
        ]
    },
    {
        name: 'RunConfig', desc: 'Configuration for a single pipeline run.',
        methods: [
            { sig: 'agents: list[str] = ["scribe", "drug_interactions", "coding"]', desc: 'Which agents to run.' },
            { sig: 'llm: str = "gpt-4o"', desc: 'LLM model to use.' },
            { sig: 'confidence_threshold: float = 0.7', desc: 'Minimum confidence score.' },
            { sig: 'stream_scribe: bool = False', desc: 'Enable SSE streaming for Scribe output.' },
            { sig: 'max_tokens: int = 8000', desc: 'Maximum token budget per agent.' },
        ]
    },
]

export default function SDKReference() {
    const [search, setSearch] = useState('')
    const filtered = search ? classes.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.methods.some(m => m.sig.toLowerCase().includes(search.toLowerCase()))) : classes

    return (
        <div style={{ paddingTop: 'var(--nav-height)' }}>
            <div className="docs-layout">
                <DocsSidebar />
                <div>
                    <motion.div initial="hidden" animate="visible">
                        <motion.div variants={fadeUp}>
                            <h1 className="text-h1" style={{ marginBottom: 'var(--space-3)' }}>SDK Reference</h1>
                            <p className="text-dim" style={{ marginBottom: 'var(--space-6)' }}>Full Python SDK API reference — all classes, methods, and Pydantic models.</p>
                        </motion.div>

                        <motion.div className="search-box" style={{ marginBottom: 'var(--space-8)' }} variants={fadeUp} custom={1}>
                            <Search size={16} className="search-icon" />
                            <input className="input" placeholder="Search SDK reference..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 'var(--space-10)' }} />
                        </motion.div>

                        {filtered.map((cls, i) => (
                            <motion.div key={cls.name} className="glass-card" style={{ marginBottom: 'var(--space-6)', padding: 'var(--space-6)' }} variants={fadeUp} custom={i + 2}>
                                <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xl)', color: 'var(--brand-sky)', marginBottom: 'var(--space-2)' }}>{cls.name}</h2>
                                <p className="text-dim text-small" style={{ marginBottom: 'var(--space-4)' }}>{cls.desc}</p>
                                <div className="table-wrapper">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Signature</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cls.methods.map(m => (
                                                <tr key={m.sig}>
                                                    <td><code className="code-inline" style={{ fontSize: 'var(--text-xs)' }}>{m.sig}</code></td>
                                                    <td className="text-dim text-small">{m.desc}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
