import { motion } from 'framer-motion'
import { CheckCircle2, Circle, ArrowRight, ThumbsUp, MessageSquare } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.4 } }) }

const sprints = [
    { name: 'Sprint 0 — Foundation', status: 'complete', items: ['Repository setup + CI/CD', 'FHIR R4 adapter + schema validation', 'Pydantic data models', 'PostgreSQL + pgvector schema', 'Docker Compose stack', 'Synthea data generator'] },
    { name: 'Sprint 1 — Agents v1', status: 'complete', items: ['LangGraph orchestrator', 'Clinical Scribe Agent', 'Drug Interaction Analyst', 'Medical Coding Advisor', 'Confidence scoring', 'Audit logging'] },
    { name: 'Sprint 2 — API + SDK', status: 'active', items: ['FastAPI REST API', 'SSE streaming', 'LiteLLM multi-provider', 'Python SDK package', 'CLI tool', 'OpenAPI spec'] },
    { name: 'Sprint 3 — RAG + Quality', status: 'planned', items: ['LlamaIndex RAG layer', 'Scribe Agent v2', 'DrugBank benchmarking', 'MIMIC-IV evaluation', 'Gradio playground', 'Physician quality eval'] },
    { name: 'Sprint 4 — Launch', status: 'planned', items: ['Helm chart + Terraform', 'Security audit', 'Load testing', 'Landing page', 'Demo video', 'Devpost submission'] },
]

const featureRequests = [
    { title: 'HL7 v2 adapter', votes: 34, comments: 12 },
    { title: 'Radiology Report Agent', votes: 28, comments: 8 },
    { title: 'GraphQL API endpoint', votes: 19, comments: 5 },
    { title: 'Clinical Trial Eligibility Agent', votes: 15, comments: 7 },
    { title: 'Multi-tenant API key scoping', votes: 11, comments: 3 },
]

export default function Roadmap() {
    return (
        <div>
            <section className="section-lg" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }}>
                <div className="container text-center">
                    <motion.span className="badge" initial="hidden" animate="visible" variants={fadeUp}>Roadmap</motion.span>
                    <motion.h1 className="text-display" style={{ margin: 'var(--space-4) auto' }} initial="hidden" animate="visible" variants={fadeUp} custom={1}>
                        Where We're <span className="text-gradient">Headed</span>
                    </motion.h1>
                </div>
            </section>

            <section className="section">
                <div className="container" style={{ maxWidth: 800 }}>
                    {sprints.map((sprint, si) => (
                        <motion.div key={sprint.name} className="glass-card" style={{ padding: 'var(--space-6)', marginBottom: 'var(--space-6)', borderLeft: `3px solid ${sprint.status === 'complete' ? 'var(--status-success)' : sprint.status === 'active' ? 'var(--brand-electric)' : 'var(--glass-border)'}` }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={si}>
                            <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-4)' }}>
                                <h3>{sprint.name}</h3>
                                <span className={`badge ${sprint.status === 'complete' ? 'badge-success' : sprint.status === 'active' ? '' : ''}`} style={{ fontSize: 10 }}>
                                    {sprint.status === 'complete' ? '✓ Complete' : sprint.status === 'active' ? '⚡ In Progress' : '📋 Planned'}
                                </span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)' }}>
                                {sprint.items.map(item => (
                                    <div key={item} className="flex items-center gap-2 text-small text-dim">
                                        {sprint.status === 'complete' ? <CheckCircle2 size={14} className="text-success" style={{ flexShrink: 0 }} /> : <Circle size={14} className="text-slate" style={{ flexShrink: 0 }} />}
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Feature Requests */}
            <section className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(13,33,65,0.3), transparent)' }}>
                <div className="container" style={{ maxWidth: 700 }}>
                    <motion.h2 className="text-h1 text-center" style={{ marginBottom: 'var(--space-8)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        Community Feature Requests
                    </motion.h2>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {featureRequests.map((fr, i) => (
                            <motion.div key={fr.title} className="glass-card" style={{ padding: 'var(--space-4)', marginBottom: 'var(--space-3)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} variants={fadeUp} custom={i}>
                                <span className="text-white text-small" style={{ fontWeight: 500 }}>{fr.title}</span>
                                <div className="flex items-center gap-4">
                                    <span className="flex items-center gap-1 text-caption"><ThumbsUp size={12} className="text-electric" /> {fr.votes}</span>
                                    <span className="flex items-center gap-1 text-caption"><MessageSquare size={12} /> {fr.comments}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                    <div className="text-center" style={{ marginTop: 'var(--space-6)' }}>
                        <a href="https://github.com/medisync-ai/medisync/discussions" target="_blank" rel="noopener" className="btn btn-secondary">
                            Suggest a Feature <ArrowRight size={14} />
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
}
