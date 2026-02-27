import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PenTool, FlaskConical, Code2, CheckCircle2, XCircle, ArrowRight, BarChart3, Layers, Shield, Zap, Brain, Eye } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

const agentDetails = [
    {
        icon: PenTool, color: 'scribe', title: 'Clinical Scribe Agent',
        desc: 'Generates structured SOAP (Subjective, Objective, Assessment, Plan) note drafts from encounter transcripts and FHIR Observation resources. Supports real-time SSE streaming.',
        capabilities: ['SOAP note drafting from encounter context', 'Server-Sent Events (SSE) streaming', 'RAG-enhanced historical context', 'Physician quality score ≥ 4.2/5.0', 'Customisable prompt templates', 'Multi-language support (v1.1)'],
        tech: 'LLM fine-tuned on MIMIC-III + LlamaIndex RAG',
    },
    {
        icon: FlaskConical, color: 'drug', title: 'Drug Interaction Analyst',
        desc: 'Cross-references all active medications (MedicationRequest FHIR) against the RxNorm interaction graph. Returns severity-classified interaction pairs with evidence citations.',
        capabilities: ['RxNorm + DrugBank cross-reference', 'Moderate / Severe / Contraindicated severity', 'Evidence citations with source links', 'BioBERT Named Entity Recognition', '94%+ recall on DrugBank validation', 'Local cache for offline mode'],
        tech: 'RxNorm API + BioBERT NER + pgvector',
    },
    {
        icon: Code2, color: 'coding', title: 'Medical Coding Advisor',
        desc: 'Suggests ICD-10-CM diagnosis codes and CPT procedure codes from encounter note context. Provides confidence scores, primary vs. secondary ranking, and payer-specific notes.',
        capabilities: ['ICD-10-CM top-5 code suggestions', 'CPT procedure code recommendations', 'Confidence scoring (0.0–1.0)', 'Primary vs. secondary code ranking', '88%+ top-3 accuracy on MIMIC-IV', 'Payer-specific billing notes'],
        tech: 'GPT-4o with ICD-10 function tools',
    },
]

const comparison = [
    { feature: 'Open Source', medisync: true, nuance: false, suki: false },
    { feature: 'Multi-Agent Architecture', medisync: true, nuance: false, suki: false },
    { feature: 'FHIR R4 Native', medisync: true, nuance: false, suki: false },
    { feature: 'SDK / pip install', medisync: true, nuance: false, suki: false },
    { feature: 'Drug Interaction Analysis', medisync: true, nuance: false, suki: false },
    { feature: 'ICD-10 Coding Suggestions', medisync: true, nuance: true, suki: false },
    { feature: 'Confidence Scoring', medisync: true, nuance: false, suki: false },
    { feature: 'Self-Hosted / Air-Gapped', medisync: true, nuance: false, suki: false },
    { feature: 'Streaming Output (SSE)', medisync: true, nuance: true, suki: true },
    { feature: 'Cost', medisync: 'Free', nuance: '$100+/mo', suki: '$50+/mo' },
]

export default function Features() {
    return (
        <div>
            <section className="section-lg" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }}>
                <div className="container text-center">
                    <motion.span className="badge badge-violet" initial="hidden" animate="visible" variants={fadeUp}>Features</motion.span>
                    <motion.h1 className="text-display" style={{ margin: 'var(--space-4) auto', maxWidth: 800 }} initial="hidden" animate="visible" variants={fadeUp} custom={1}>
                        Three Specialized Agents.<br /><span className="text-gradient">One Unified Pipeline.</span>
                    </motion.h1>
                    <motion.p className="text-dim" style={{ maxWidth: 600, margin: '0 auto' }} initial="hidden" animate="visible" variants={fadeUp} custom={2}>
                        Each agent is purpose-built for a specific clinical task, trained on medical datasets, and exposed through a unified SDK interface.
                    </motion.p>
                </div>
            </section>

            {/* Agent Deep Dives */}
            {agentDetails.map((agent, idx) => (
                <section key={agent.title} className="section" style={idx % 2 === 1 ? { background: 'linear-gradient(180deg, transparent, rgba(13,33,65,0.3), transparent)' } : {}}>
                    <div className="container">
                        <motion.div className="glass-card" style={{ padding: 'var(--space-10)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                            <div className="flex gap-10" style={{ flexWrap: 'wrap' }}>
                                <div style={{ flex: '1 1 400px' }}>
                                    <div className={`agent-icon agent-icon-${agent.color}`} style={{ marginBottom: 'var(--space-4)' }}>
                                        <agent.icon size={24} />
                                    </div>
                                    <h2 style={{ marginBottom: 'var(--space-3)' }}>{agent.title}</h2>
                                    <p className="text-dim" style={{ marginBottom: 'var(--space-6)', lineHeight: 1.7 }}>{agent.desc}</p>
                                    <div className="badge" style={{ marginBottom: 'var(--space-4)' }}><Layers size={12} /> {agent.tech}</div>
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                                        {agent.capabilities.map(c => (
                                            <li key={c} className="flex items-center gap-2 text-small text-dim">
                                                <CheckCircle2 size={14} className="text-success" style={{ flexShrink: 0 }} />
                                                {c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div style={{ flex: '1 1 300px' }}>
                                    <div className="glass-surface" style={{ padding: 'var(--space-6)', height: '100%' }}>
                                        <div style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--text-xs)', color: 'var(--neutral-slate)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sample Output</div>
                                        {agent.color === 'scribe' && (
                                            <div className="code-block" style={{ fontSize: 'var(--text-xs)' }}>
                                                <span style={{ color: 'var(--neutral-slate)' }}>{'{'}</span>{'\n'}
                                                <span style={{ color: 'var(--accent-violet-light)' }}>  "soap_note"</span>: {'{'}{'\n'}
                                                <span style={{ color: 'var(--brand-sky)' }}>    "subjective"</span>: <span style={{ color: 'var(--status-success)' }}>"Patient reports..."</span>,{'\n'}
                                                <span style={{ color: 'var(--brand-sky)' }}>    "objective"</span>: <span style={{ color: 'var(--status-success)' }}>"BP 128/82, HR 76..."</span>,{'\n'}
                                                <span style={{ color: 'var(--brand-sky)' }}>    "assessment"</span>: <span style={{ color: 'var(--status-success)' }}>"Type 2 DM, E11.9"</span>,{'\n'}
                                                <span style={{ color: 'var(--brand-sky)' }}>    "plan"</span>: <span style={{ color: 'var(--status-success)' }}>"Start metformin..."</span>{'\n'}
                                                {'  }'},{'\n'}
                                                <span style={{ color: 'var(--accent-violet-light)' }}>  "confidence"</span>: <span style={{ color: 'var(--status-warning)' }}>0.89</span>{'\n'}
                                                <span style={{ color: 'var(--neutral-slate)' }}>{'}'}</span>
                                            </div>
                                        )}
                                        {agent.color === 'drug' && (
                                            <div className="code-block" style={{ fontSize: 'var(--text-xs)' }}>
                                                <span style={{ color: 'var(--neutral-slate)' }}>{'{'}</span>{'\n'}
                                                <span style={{ color: 'var(--accent-violet-light)' }}>  "interactions"</span>: [{'\n'}
                                                {'    {'}{'\n'}
                                                <span style={{ color: 'var(--brand-sky)' }}>      "pair"</span>: [<span style={{ color: 'var(--status-success)' }}>"metformin"</span>, <span style={{ color: 'var(--status-success)' }}>"lisinopril"</span>],{'\n'}
                                                <span style={{ color: 'var(--brand-sky)' }}>      "severity"</span>: <span style={{ color: 'var(--status-warning)' }}>"moderate"</span>,{'\n'}
                                                <span style={{ color: 'var(--brand-sky)' }}>      "evidence"</span>: <span style={{ color: 'var(--status-success)' }}>"DrugBank DB00331"</span>{'\n'}
                                                {'    }'}{'\n'}
                                                {'  ]'}{'\n'}
                                                <span style={{ color: 'var(--neutral-slate)' }}>{'}'}</span>
                                            </div>
                                        )}
                                        {agent.color === 'coding' && (
                                            <div className="code-block" style={{ fontSize: 'var(--text-xs)' }}>
                                                <span style={{ color: 'var(--neutral-slate)' }}>{'{'}</span>{'\n'}
                                                <span style={{ color: 'var(--accent-violet-light)' }}>  "icd10"</span>: [{'\n'}
                                                {'    {'}{'\n'}
                                                <span style={{ color: 'var(--brand-sky)' }}>      "code"</span>: <span style={{ color: 'var(--status-success)' }}>"E11.9"</span>,{'\n'}
                                                <span style={{ color: 'var(--brand-sky)' }}>      "desc"</span>: <span style={{ color: 'var(--status-success)' }}>"Type 2 Diabetes"</span>,{'\n'}
                                                <span style={{ color: 'var(--brand-sky)' }}>      "confidence"</span>: <span style={{ color: 'var(--status-warning)' }}>0.94</span>{'\n'}
                                                {'    }'}{'\n'}
                                                {'  ]'}{'\n'}
                                                <span style={{ color: 'var(--neutral-slate)' }}>{'}'}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            ))}

            {/* Comparison Table */}
            <section className="section">
                <div className="container">
                    <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <motion.h2 className="text-display" variants={fadeUp}>
                            MediSync vs. <span className="text-gradient">Commercial Alternatives</span>
                        </motion.h2>
                        <motion.p className="text-dim" style={{ maxWidth: 500, margin: 'var(--space-4) auto var(--space-10)' }} variants={fadeUp} custom={1}>
                            See how MediSync compares to proprietary solutions.
                        </motion.p>
                    </motion.div>

                    <motion.div className="table-wrapper glass-surface" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th>MediSync</th>
                                    <th>Nuance DAX</th>
                                    <th>Suki</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison.map(row => (
                                    <tr key={row.feature}>
                                        <td style={{ color: 'white', fontWeight: 500 }}>{row.feature}</td>
                                        <td>
                                            {typeof row.medisync === 'boolean' ? (
                                                row.medisync ? <CheckCircle2 size={16} className="text-success" /> : <XCircle size={16} className="text-critical" />
                                            ) : <span className="text-success" style={{ fontWeight: 600 }}>{row.medisync}</span>}
                                        </td>
                                        <td>
                                            {typeof row.nuance === 'boolean' ? (
                                                row.nuance ? <CheckCircle2 size={16} className="text-success" /> : <XCircle size={16} className="text-critical" />
                                            ) : <span className="text-critical" style={{ fontWeight: 600 }}>{row.nuance}</span>}
                                        </td>
                                        <td>
                                            {typeof row.suki === 'boolean' ? (
                                                row.suki ? <CheckCircle2 size={16} className="text-success" /> : <XCircle size={16} className="text-critical" />
                                            ) : <span className="text-critical" style={{ fontWeight: 600 }}>{row.suki}</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>
                </div>
            </section>

            {/* CTA */}
            <section className="section text-center">
                <div className="container">
                    <h2 className="text-h1" style={{ marginBottom: 'var(--space-4)' }}>Ready to explore?</h2>
                    <p className="text-dim" style={{ marginBottom: 'var(--space-8)' }}>Jump into the documentation or try it in the playground.</p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/docs/quickstart" className="btn btn-primary btn-lg">Quick Start <ArrowRight size={16} /></Link>
                        <Link to="/playground" className="btn btn-secondary btn-lg">Playground</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
