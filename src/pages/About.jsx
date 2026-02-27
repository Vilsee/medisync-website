import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Github, Heart, Users, Calendar, ArrowRight, Star, Target, Lightbulb, Trophy, Brain } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

const team = [
    { name: 'Vilse Kumar', role: 'Project Lead & Full-Stack Engineer', initials: 'VK' },
    { name: 'MediSync Core', role: 'Multi-Agent Architecture', initials: 'MC' },
    { name: 'Community', role: 'Open Source Contributors', initials: '💜' },
]

const timeline = [
    { phase: 'Sprint 0', title: 'Foundation', desc: 'Repository setup, FHIR R4 adapter, Pydantic models, Docker Compose stack', status: 'complete' },
    { phase: 'Sprint 1', title: 'Agents v1', desc: 'Orchestrator, Clinical Scribe, Drug Interaction Analyst, Medical Coding Advisor', status: 'complete' },
    { phase: 'Sprint 2', title: 'API + SDK', desc: 'FastAPI REST API, SSE streaming, LiteLLM gateway, Python SDK package, CLI', status: 'active' },
    { phase: 'Sprint 3', title: 'RAG + Quality', desc: 'LlamaIndex RAG, benchmarking vs DrugBank & MIMIC-IV, Gradio playground', status: 'planned' },
    { phase: 'Sprint 4', title: 'Launch Prep', desc: 'Helm charts, security audit, load testing, Devpost submission', status: 'planned' },
]

const values = [
    { icon: Target, title: 'Clinical Accuracy', desc: 'Every output is confidence-scored and evidence-backed. We benchmark continuously against medical gold standards.' },
    { icon: Heart, title: 'Open Source First', desc: 'MIT licensed, community-driven, transparent roadmap. No proprietary lock-in, ever.' },
    { icon: Lightbulb, title: 'Developer Experience', desc: 'From pip install to first SOAP note in 60 minutes. Type-safe, well-documented, zero boilerplate.' },
    { icon: Trophy, title: 'Hackathon Spirit', desc: 'Born from Dev Season of Code 2025 — built fast, built right, built to last.' },
]

export default function About() {
    return (
        <div>
            <section className="section-lg" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }}>
                <div className="container text-center">
                    <motion.span className="badge" initial="hidden" animate="visible" variants={fadeUp}>About</motion.span>
                    <motion.h1 className="text-display" style={{ margin: 'var(--space-4) auto', maxWidth: 800 }} initial="hidden" animate="visible" variants={fadeUp} custom={1}>
                        The Story Behind <span className="text-gradient">MediSync</span>
                    </motion.h1>
                    <motion.p className="text-dim" style={{ maxWidth: 650, margin: '0 auto', lineHeight: 1.7 }} initial="hidden" animate="visible" variants={fadeUp} custom={2}>
                        MediSync was born from a simple observation: physicians spend more time documenting than caring for patients. We built the open-source SDK we wished existed — multi-agent, FHIR-native, and free for everyone.
                    </motion.p>
                </div>
            </section>

            {/* Origin Story */}
            <section className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(13,33,65,0.3), transparent)' }}>
                <div className="container" style={{ maxWidth: 800 }}>
                    <motion.div className="glass-card" style={{ padding: 'var(--space-10)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <h2 style={{ marginBottom: 'var(--space-4)' }}>Origin Story</h2>
                        <div className="text-dim" style={{ lineHeight: 1.8 }}>
                            <p style={{ marginBottom: 'var(--space-4)' }}>
                                During <strong style={{ color: 'white' }}>Dev Season of Code 2025</strong>, we noticed a gap in the clinical AI landscape: every solution was either proprietary, expensive, or not developer-friendly. Nuance DAX costs $100+/physician/month. Suki is closed-source. Neither offers an SDK.
                            </p>
                            <p style={{ marginBottom: 'var(--space-4)' }}>
                                We asked: <em style={{ color: 'var(--brand-sky)' }}>what if there was an open-source, pip-installable multi-agent SDK that any developer could embed into any EHR system in under an hour?</em>
                            </p>
                            <p>
                                That's MediSync. Three specialized AI agents — built on LangGraph, powered by any LLM, exposed through a clean REST API and Python SDK. With FHIR R4 native support, confidence scoring, and full audit trails.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values */}
            <section className="section">
                <div className="container">
                    <motion.h2 className="text-h1 text-center" style={{ marginBottom: 'var(--space-8)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        Our Values
                    </motion.h2>
                    <motion.div className="grid grid-4" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {values.map((v, i) => (
                            <motion.div key={v.title} className="glass-card text-center" variants={fadeUp} custom={i}>
                                <v.icon size={28} className="text-electric" style={{ margin: '0 auto var(--space-4)' }} />
                                <h3 style={{ marginBottom: 'var(--space-2)', fontSize: 'var(--text-base)' }}>{v.title}</h3>
                                <p className="text-dim text-small" style={{ lineHeight: 1.6 }}>{v.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Team */}
            <section className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(13,33,65,0.3), transparent)' }}>
                <div className="container text-center">
                    <motion.h2 className="text-h1" style={{ marginBottom: 'var(--space-8)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Core Team</motion.h2>
                    <motion.div className="flex gap-8 justify-center" style={{ flexWrap: 'wrap' }} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {team.map((t, i) => (
                            <motion.div key={t.name} className="glass-card text-center" style={{ minWidth: 200, maxWidth: 250 }} variants={fadeUp} custom={i}>
                                <div className="avatar avatar-lg mx-auto" style={{ marginBottom: 'var(--space-4)' }}>{t.initials}</div>
                                <h4 style={{ marginBottom: 'var(--space-1)' }}>{t.name}</h4>
                                <p className="text-caption">{t.role}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Roadmap Timeline */}
            <section className="section">
                <div className="container" style={{ maxWidth: 700 }}>
                    <motion.h2 className="text-h1 text-center" style={{ marginBottom: 'var(--space-8)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        Roadmap
                    </motion.h2>
                    {timeline.map((t, i) => (
                        <motion.div key={t.phase} className="flex gap-4" style={{ marginBottom: 'var(--space-4)', alignItems: 'flex-start' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}>
                            <div style={{ width: 40, textAlign: 'center', flexShrink: 0 }}>
                                <div className={`step-number ${t.status === 'complete' ? '' : t.status === 'active' ? '' : ''}`} style={t.status === 'complete' ? { background: 'var(--status-success)' } : t.status === 'active' ? {} : { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}>
                                    {t.status === 'complete' ? '✓' : i + 1}
                                </div>
                            </div>
                            <div className="glass-card" style={{ flex: 1, padding: 'var(--space-4) var(--space-6)', border: t.status === 'active' ? '1px solid rgba(37,99,235,0.3)' : undefined }}>
                                <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-1)' }}>
                                    <span className="text-caption">{t.phase}</span>
                                    {t.status === 'active' && <span className="badge badge-success" style={{ fontSize: 10 }}>Active</span>}
                                </div>
                                <h4 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-1)' }}>{t.title}</h4>
                                <p className="text-dim text-small">{t.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Acknowledgements */}
            <section className="section text-center" style={{ background: 'linear-gradient(180deg, transparent, rgba(13,33,65,0.3), transparent)' }}>
                <div className="container">
                    <motion.h2 className="text-h1" style={{ marginBottom: 'var(--space-4)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>Acknowledgements</motion.h2>
                    <motion.p className="text-dim" style={{ maxWidth: 600, margin: '0 auto var(--space-8)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
                        MediSync builds on the shoulders of incredible open-source projects and the Anthropic ecosystem.
                    </motion.p>
                    <motion.div className="flex gap-4 justify-center flex-wrap" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
                        {['LangGraph', 'LangChain', 'FastAPI', 'LlamaIndex', 'Anthropic Claude', 'OpenAI', 'HAPI FHIR', 'Synthea', 'pgvector'].map(t => (
                            <span key={t} className="badge">{t}</span>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Contributor CTA */}
            <section className="section text-center">
                <div className="container">
                    <Brain size={40} className="text-electric mx-auto" style={{ marginBottom: 'var(--space-4)' }} />
                    <h2 className="text-h1" style={{ marginBottom: 'var(--space-4)' }}>Join the Mission</h2>
                    <p className="text-dim" style={{ maxWidth: 500, margin: '0 auto var(--space-8)' }}>
                        Whether you're a clinician, developer, or researcher — there's a place for you in the MediSync community.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/community/contributors" className="btn btn-primary btn-lg">Become a Contributor <ArrowRight size={16} /></Link>
                        <a href="https://github.com/medisync-ai/medisync" target="_blank" rel="noopener" className="btn btn-secondary btn-lg"><Github size={16} /> Star on GitHub</a>
                    </div>
                </div>
            </section>
        </div>
    )
}
