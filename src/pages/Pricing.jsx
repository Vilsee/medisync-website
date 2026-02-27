import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, Server, Cloud, Laptop, Github, ArrowRight, Heart, Shield, Zap, DollarSign, Lock } from 'lucide-react'

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

const features = [
    'Unlimited API calls', 'All three AI agents', 'SSE streaming', 'Full audit logging', 'FHIR R4 support',
    'RAG-enhanced context', 'Pluggable LLM backends', 'CLI + Python SDK', 'Docker Compose stack', 'Community support',
    'Benchmarking tools', 'Synthea demo data',
]

const deployments = [
    { icon: Laptop, title: 'Local Docker', desc: 'One command: docker compose up medisync. Includes PostgreSQL, API server, and demo data. Perfect for development and testing.', badge: 'Free', highlight: false },
    { icon: Cloud, title: 'Cloud Kubernetes', desc: 'Helm chart for AWS EKS, GCP GKE, and Azure AKS. Horizontal pod autoscaling for API and agent services. Terraform modules included.', badge: 'Free', highlight: false },
    { icon: Server, title: 'Library Mode (Ollama)', desc: 'Import MediSync as a Python library — no network services required. Uses SQLite + local Ollama for fully air-gapped, HIPAA-friendly deployments.', badge: 'Free · Air-Gapped', highlight: true },
]

const llmComparison = [
    { provider: 'Local (Ollama + Llama 3.1)', cost: 'Free', latency: '~8s P50', privacy: 'Air-gapped', setup: 'ollama pull llama3.1' },
    { provider: 'OpenAI (GPT-4o)', cost: 'Pay-per-token', latency: '~3s P50', privacy: 'Cloud API', setup: 'Set OPENAI_API_KEY' },
    { provider: 'Anthropic (Claude 3.5)', cost: 'Pay-per-token', latency: '~3.5s P50', privacy: 'Cloud API', setup: 'Set ANTHROPIC_API_KEY' },
]

export default function Pricing() {
    return (
        <div>
            <section className="section-lg" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-16))' }}>
                <div className="container text-center">
                    <motion.div className="badge badge-success" style={{ marginBottom: 'var(--space-4)' }} initial="hidden" animate="visible" variants={fadeUp}>
                        <Heart size={12} /> Free & Open Source
                    </motion.div>
                    <motion.h1 className="text-display" style={{ maxWidth: 700, margin: '0 auto var(--space-4)' }} initial="hidden" animate="visible" variants={fadeUp} custom={1}>
                        Completely Free.<br /><span className="text-gradient">Forever.</span>
                    </motion.h1>
                    <motion.p className="text-dim" style={{ maxWidth: 550, margin: '0 auto' }} initial="hidden" animate="visible" variants={fadeUp} custom={2}>
                        MediSync is MIT licensed. No tiers, no usage limits, no vendor lock-in.
                        Self-host it, modify it, ship it.
                    </motion.p>
                </div>
            </section>

            {/* Pricing Card */}
            <section className="section-sm">
                <div className="container" style={{ maxWidth: 560 }}>
                    <motion.div className="glass-card" style={{ padding: 'var(--space-10)', border: '1px solid rgba(37,99,235,0.3)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        <div className="flex items-center gap-3" style={{ marginBottom: 'var(--space-2)' }}>
                            <Shield size={24} className="text-electric" />
                            <span className="text-xs text-sky" style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>MIT License</span>
                        </div>
                        <div style={{ marginBottom: 'var(--space-2)' }}>
                            <span style={{ fontSize: 'var(--text-hero)', fontWeight: 800, color: 'white' }}>$0</span>
                            <span className="text-slate" style={{ marginLeft: 'var(--space-2)' }}>/ forever</span>
                        </div>
                        <p className="text-dim text-small" style={{ marginBottom: 'var(--space-6)' }}>
                            Everything included. No credit card. No enterprise upsell.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-2)', marginBottom: 'var(--space-8)' }}>
                            {features.map(f => (
                                <div key={f} className="flex items-center gap-2 text-small text-dim">
                                    <CheckCircle2 size={14} className="text-success" style={{ flexShrink: 0 }} />
                                    {f}
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-3">
                            <Link to="/docs/quickstart" className="btn btn-primary btn-lg w-full" style={{ justifyContent: 'center' }}>
                                Get Started <ArrowRight size={16} />
                            </Link>
                            <a href="https://github.com/medisync-ai/medisync" target="_blank" rel="noopener" className="btn btn-secondary btn-lg">
                                <Github size={16} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Deployment Options */}
            <section className="section">
                <div className="container">
                    <motion.h2 className="text-h1 text-center" style={{ marginBottom: 'var(--space-8)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        Self-Hosting Options
                    </motion.h2>
                    <motion.div className="grid grid-3" initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {deployments.map((d, i) => (
                            <motion.div key={d.title} className="glass-card" style={d.highlight ? { border: '1px solid rgba(37,99,235,0.3)' } : {}} variants={fadeUp} custom={i}>
                                <d.icon size={24} className="text-electric" style={{ marginBottom: 'var(--space-4)' }} />
                                <h3 style={{ marginBottom: 'var(--space-2)' }}>{d.title}</h3>
                                <p className="text-dim text-small" style={{ marginBottom: 'var(--space-4)', lineHeight: 1.6 }}>{d.desc}</p>
                                <span className="badge badge-success">{d.badge}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* LLM Mode Comparison */}
            <section className="section" style={{ background: 'linear-gradient(180deg, transparent, rgba(13,33,65,0.3), transparent)' }}>
                <div className="container">
                    <motion.h2 className="text-h1 text-center" style={{ marginBottom: 'var(--space-3)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                        Local vs. Cloud LLM
                    </motion.h2>
                    <motion.p className="text-dim text-center" style={{ marginBottom: 'var(--space-8)', maxWidth: 500, margin: '0 auto var(--space-8)' }} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
                        Choose your LLM backend. Bring your own API key or run fully offline.
                    </motion.p>
                    <motion.div className="table-wrapper glass-surface" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Provider</th>
                                    <th>Cost</th>
                                    <th>Latency</th>
                                    <th>Privacy</th>
                                    <th>Setup</th>
                                </tr>
                            </thead>
                            <tbody>
                                {llmComparison.map(row => (
                                    <tr key={row.provider}>
                                        <td style={{ color: 'white', fontWeight: 500 }}>{row.provider}</td>
                                        <td><span className={row.cost === 'Free' ? 'text-success' : 'text-dim'} style={{ fontWeight: row.cost === 'Free' ? 600 : 400 }}>{row.cost}</span></td>
                                        <td className="text-dim">{row.latency}</td>
                                        <td>{row.privacy === 'Air-gapped' ? <span className="badge badge-success"><Lock size={10} /> {row.privacy}</span> : <span className="text-dim">{row.privacy}</span>}</td>
                                        <td><code className="code-inline">{row.setup}</code></td>
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
                    <p className="text-dim" style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-6)' }}>
                        Ready to deploy? Start with Docker Compose in 2 minutes.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link to="/docs/deployment" className="btn btn-primary btn-lg">Deployment Guide <ArrowRight size={16} /></Link>
                        <Link to="/playground" className="btn btn-secondary btn-lg">Try Demo First</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
