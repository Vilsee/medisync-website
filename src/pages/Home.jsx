import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Terminal, Star, Users, GitPullRequest, Shield, Zap, Brain, PenTool, FlaskConical, Code2, CheckCircle2, Clock, DollarSign, Activity, ChevronRight, Copy, ExternalLink } from 'lucide-react'
import './Home.css'

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } })
}

const stats = [
    { value: '16 hrs/wk', label: 'Physician time lost to documentation', icon: Clock },
    { value: '$125B/yr', label: 'Cost of clinical documentation burden', icon: DollarSign },
    { value: '<6s', label: 'End-to-end pipeline latency P95', icon: Zap },
    { value: '94%+', label: 'Drug interaction detection recall', icon: Shield },
]

const agents = [
    {
        icon: PenTool,
        title: 'Clinical Scribe',
        desc: 'Auto-drafts structured SOAP notes from encounter transcripts and FHIR observations with real-time streaming.',
        badge: 'Scribe Agent',
        color: 'blue',
        features: ['SOAP note generation', 'SSE streaming output', 'RAG-enhanced context', 'Confidence scoring'],
    },
    {
        icon: FlaskConical,
        title: 'Drug Interaction Analyst',
        desc: 'Cross-references all active medications against RxNorm and surfaces severity-classified interaction warnings with evidence.',
        badge: 'Drug Agent',
        color: 'amber',
        features: ['RxNorm lookup', 'Severity classification', 'Evidence citations', 'BioBERT NER'],
    },
    {
        icon: Code2,
        title: 'Medical Coding Advisor',
        desc: 'Suggests ICD-10-CM diagnosis codes and CPT procedure codes ranked by confidence with payer-specific notes.',
        badge: 'Coding Agent',
        color: 'violet',
        features: ['ICD-10 top-5 codes', 'CPT suggestions', 'Confidence ranking', 'MIMIC-IV trained'],
    },
]

const testimonials = [
    {
        quote: "MediSync cut our SOAP note drafting time by 60%. The confidence scores give us the clinical trust we need.",
        name: "Dr. Sarah Chen",
        role: "CMIO, Regional Health System",
        initials: "SC",
    },
    {
        quote: "I integrated MediSync into our EHR module in under 4 hours. The SDK docs are developer-friendly and the typing is excellent.",
        name: "Aditya Sharma",
        role: "Software Engineer, Health-Tech Startup",
        initials: "AS",
    },
    {
        quote: "Finally an open-source baseline for clinical agent evaluation. We've already swapped in our fine-tuned model and it just works.",
        name: "Marcus Webb",
        role: "ML Engineer, Academic Research Lab",
        initials: "MW",
    },
]

const pipelineSteps = [
    { label: 'FHIR Bundle In', desc: 'Patient, Encounter, Observations, Medications', icon: '📋' },
    { label: 'Orchestrator', desc: 'Parses context, routes to agents, manages tokens', icon: '🎙' },
    { label: 'Parallel Agents', desc: 'Scribe + Drug Analyst run simultaneously', icon: '⚡' },
    { label: 'Unified Response', desc: 'Merged, ranked, confidence-scored output', icon: '✅' },
]

export default function Home() {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-glow-1 glow-bg glow-blue" />
                <div className="hero-glow-2 glow-bg glow-violet" />

                <div className="container text-center relative">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                        <div className="hero-badge">
                            <Star size={12} />
                            <span>Open Source · MIT Licensed · Dev Season of Code 2025</span>
                        </div>
                    </motion.div>

                    <motion.h1 className="hero-title text-hero" initial="hidden" animate="visible" variants={fadeUp} custom={1}>
                        Multi-Agent <span className="text-gradient">EHR Copilot</span>
                        <br />for Clinical Documentation
                    </motion.h1>

                    <motion.p className="hero-subtitle" initial="hidden" animate="visible" variants={fadeUp} custom={2}>
                        Three AI agents — Clinical Scribe, Drug Interaction Analyst, and Medical Coding Advisor —
                        collaborate in real time. Open-source SDK. pip install. Ship in one hour.
                    </motion.p>

                    <motion.div className="hero-actions" initial="hidden" animate="visible" variants={fadeUp} custom={3}>
                        <Link to="/docs/quickstart" className="btn btn-primary btn-lg">
                            <Terminal size={18} /> View Documentation
                        </Link>
                        <a href="https://github.com/medisync-ai/medisync" target="_blank" rel="noopener" className="btn btn-secondary btn-lg">
                            <Github size={18} /> GitHub
                        </a>
                    </motion.div>

                    <motion.div className="hero-code-block" initial="hidden" animate="visible" variants={fadeUp} custom={4}>
                        <div className="code-block-header">
                            <span>terminal</span>
                            <button className="btn btn-ghost btn-sm" onClick={() => navigator.clipboard?.writeText('pip install medisync-agents')}>
                                <Copy size={12} /> Copy
                            </button>
                        </div>
                        <div className="code-block-body">
                            <span className="code-prompt">$</span> pip install medisync-agents
                        </div>
                    </motion.div>

                    {/* Social Proof */}
                    <motion.div className="hero-social-proof" initial="hidden" animate="visible" variants={fadeUp} custom={5}>
                        <div className="proof-item">
                            <Star size={14} className="text-warning" />
                            <span className="proof-value">1,247</span>
                            <span className="proof-label">GitHub Stars</span>
                        </div>
                        <div className="proof-divider" />
                        <div className="proof-item">
                            <Users size={14} className="text-sky" />
                            <span className="proof-value">89</span>
                            <span className="proof-label">Contributors</span>
                        </div>
                        <div className="proof-divider" />
                        <div className="proof-item">
                            <GitPullRequest size={14} className="text-success" />
                            <span className="proof-value">342</span>
                            <span className="proof-label">PRs Merged</span>
                        </div>
                        <div className="proof-divider" />
                        <div className="proof-item">
                            <Activity size={14} className="text-electric" />
                            <span className="proof-value">99.5%</span>
                            <span className="proof-label">Uptime SLA</span>
                        </div>
                    </motion.div>
                </div>

                {/* Animated Globe Placeholder */}
                <div className="hero-globe">
                    <div className="globe-inner">
                        <div className="globe-ring globe-ring-1" />
                        <div className="globe-ring globe-ring-2" />
                        <div className="globe-ring globe-ring-3" />
                        <div className="globe-node globe-node-1"><PenTool size={16} /></div>
                        <div className="globe-node globe-node-2"><FlaskConical size={16} /></div>
                        <div className="globe-node globe-node-3"><Code2 size={16} /></div>
                        <div className="globe-center"><Brain size={24} /></div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="section-sm">
                <div className="container">
                    <motion.div className="stats-grid" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
                        {stats.map((stat, i) => (
                            <motion.div key={stat.label} className="stat-card glass-card" variants={fadeUp} custom={i}>
                                <stat.icon size={24} className="stat-icon" />
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Agent Pipeline Diagram */}
            <section className="section">
                <div className="container">
                    <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <motion.span className="badge badge-violet" variants={fadeUp} custom={0}>Architecture</motion.span>
                        <motion.h2 className="text-display" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }} variants={fadeUp} custom={1}>
                            Three Agents. <span className="text-gradient">One Pipeline.</span>
                        </motion.h2>
                        <motion.p className="text-dim" style={{ maxWidth: 600, margin: '0 auto var(--space-12)' }} variants={fadeUp} custom={2}>
                            Submit a FHIR R4 Bundle and get structured clinical intelligence back — SOAP notes, drug interaction alerts, and billing codes — in under 6 seconds.
                        </motion.p>
                    </motion.div>

                    <motion.div className="pipeline-flow" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {pipelineSteps.map((step, i) => (
                            <motion.div key={step.label} className="pipeline-step" variants={fadeUp} custom={i}>
                                <div className="pipeline-icon">{step.icon}</div>
                                <h4 className="pipeline-label">{step.label}</h4>
                                <p className="pipeline-desc">{step.desc}</p>
                                {i < pipelineSteps.length - 1 && <div className="pipeline-arrow"><ChevronRight size={20} /></div>}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Agent Cards */}
            <section className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(13,33,65,0.3), transparent)' }}>
                <div className="container">
                    <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <motion.span className="badge" variants={fadeUp}>AI Agents</motion.span>
                        <motion.h2 className="text-display" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }} variants={fadeUp} custom={1}>
                            Purpose-Built <span className="text-gradient">Clinical Intelligence</span>
                        </motion.h2>
                    </motion.div>

                    <motion.div className="grid grid-3" style={{ marginTop: 'var(--space-12)' }} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {agents.map((agent, i) => (
                            <motion.div key={agent.title} className="agent-card glass-card" variants={fadeUp} custom={i}>
                                <div className={`agent-icon agent-icon-${agent.color === 'blue' ? 'scribe' : agent.color === 'amber' ? 'drug' : 'coding'}`}>
                                    <agent.icon size={24} />
                                </div>
                                <h3 style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-3)' }}>{agent.title}</h3>
                                <p className="text-dim text-small" style={{ marginBottom: 'var(--space-4)' }}>{agent.desc}</p>
                                <ul className="agent-features">
                                    {agent.features.map(f => (
                                        <li key={f} className="agent-feature">
                                            <CheckCircle2 size={14} className="text-success" />
                                            <span>{f}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="agent-card-footer">
                                    <span className={`badge badge-${agent.color === 'blue' ? '' : agent.color === 'amber' ? 'warning' : 'violet'}`.trim()}>{agent.badge}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Dashboard Preview */}
            <section className="section">
                <div className="container">
                    <div className="dashboard-preview">
                        <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <motion.span className="badge badge-success" variants={fadeUp}>Live Demo</motion.span>
                            <motion.h2 className="text-display" style={{ marginTop: 'var(--space-4)', marginBottom: 'var(--space-4)' }} variants={fadeUp} custom={1}>
                                Clinical Rigour, <span className="text-gradient">Developer Speed</span>
                            </motion.h2>
                        </motion.div>

                        <motion.div className="dashboard-frame glass-surface" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
                            <div className="dashboard-titlebar">
                                <div className="titlebar-dots">
                                    <span className="dot dot-red" />
                                    <span className="dot dot-yellow" />
                                    <span className="dot dot-green" />
                                </div>
                                <span className="titlebar-url">localhost:8080/v1/run</span>
                            </div>
                            <div className="dashboard-content">
                                <div className="dashboard-sidebar-mock">
                                    <div className="mock-sidebar-item active">
                                        <PenTool size={14} /> Clinical Scribe
                                    </div>
                                    <div className="mock-sidebar-item">
                                        <FlaskConical size={14} /> Drug Analyst
                                    </div>
                                    <div className="mock-sidebar-item">
                                        <Code2 size={14} /> Coding Advisor
                                    </div>
                                </div>
                                <div className="dashboard-main-mock">
                                    <div className="mock-soap">
                                        <h4 className="mock-soap-title">SOAP Note Draft</h4>
                                        <div className="mock-soap-section">
                                            <span className="mock-label">Subjective</span>
                                            <p>Patient presents with complaints of persistent fatigue, polyuria, and polydipsia for the past 3 weeks. Reports unintentional weight loss of 5 lbs. No previous history of diabetes.</p>
                                        </div>
                                        <div className="mock-soap-section">
                                            <span className="mock-label">Objective</span>
                                            <p>Vitals: BP 128/82, HR 76, Temp 98.4°F. Fasting glucose: 186 mg/dL. HbA1c: 7.8%. BMI: 28.4.</p>
                                        </div>
                                        <div className="mock-soap-section">
                                            <span className="mock-label">Assessment</span>
                                            <p>New-onset Type 2 Diabetes Mellitus (E11.9) with suboptimal glycemic control.</p>
                                        </div>
                                        <div className="mock-soap-section">
                                            <span className="mock-label">Plan</span>
                                            <p>Start metformin 500mg BID. Diabetes education referral. Follow-up HbA1c in 3 months. Dietary consultation.</p>
                                        </div>
                                    </div>
                                    <div className="mock-confidence">
                                        <div className="conf-header">
                                            <span>Confidence</span>
                                            <span className="conf-score">0.89</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-fill progress-fill-success" style={{ width: '89%' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(13,33,65,0.3), transparent)' }}>
                <div className="container">
                    <motion.div className="text-center" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <motion.h2 className="text-display" variants={fadeUp}>
                            Trusted by <span className="text-gradient">Builders & Clinicians</span>
                        </motion.h2>
                    </motion.div>

                    <motion.div className="grid grid-3" style={{ marginTop: 'var(--space-12)' }} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {testimonials.map((t, i) => (
                            <motion.div key={t.name} className="testimonial-card glass-card" variants={fadeUp} custom={i}>
                                <p className="testimonial-quote">"{t.quote}"</p>
                                <div className="testimonial-author">
                                    <div className="avatar">{t.initials}</div>
                                    <div>
                                        <div className="text-white text-small" style={{ fontWeight: 600 }}>{t.name}</div>
                                        <div className="text-slate text-caption">{t.role}</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section cta-section">
                <div className="cta-glow glow-bg glow-blue" />
                <div className="container text-center relative">
                    <motion.h2 className="text-display" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        Ready to Build?
                    </motion.h2>
                    <motion.p className="text-dim" style={{ maxWidth: 500, margin: 'var(--space-4) auto var(--space-8)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
                        From pip install to your first SOAP note in under 60 minutes. Free, open source, forever.
                    </motion.p>
                    <motion.div className="flex gap-4 justify-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
                        <Link to="/docs/quickstart" className="btn btn-primary btn-lg">
                            Get Started <ArrowRight size={16} />
                        </Link>
                        <Link to="/playground" className="btn btn-secondary btn-lg">
                            Try Playground <ExternalLink size={16} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
